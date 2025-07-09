const express = require('express');
const cors = require('cors');
const db = require('./db');
const gamesRoutes = require('./routes/gamesRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const tagsRoutes = require('./routes/tagsRoutes');
const teamRoutes = require('./routes/teamRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const errorHandler = require('./utils/errorHandler');
const path = require('path'); // Ajout de path pour gérer les chemins de fichiers
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure media folders exist
const mediaFolders = ['media/image', 'media/video', 'media/audio'];
for (const folder of mediaFolders) {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
}


// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = 'media/';
    // Use req.params.type to determine subfolder
    if (req.params.type === 'image') folder += 'image';
    else if (req.params.type === 'video') folder += 'video';
    else if (req.params.type === 'audio') folder += 'audio';
    else folder += 'other';

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    // Use timestamp + original extension for uniqueness
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB limit

app.post('/upload/media/:type', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

  // Return the URL for use in the frontend (assuming server is at root)
  const url = `/media/${req.params.type}/${req.file.filename}`;
  res.json({ url });
});

// Serve static media files
app.use('/media', express.static(path.join(__dirname, 'media')));


// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques depuis le dossier 'client'
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, 'public')));
// Routes API
app.use('/api/games', gamesRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/team-members', teamRoutes);
app.use('/api/calendar', calendarRoutes);

// Helper function to generate tags based on filename
function generateTags(filename) {
  const commonTags = {
    home: ['house', 'domicile'],
    pin: ['location', 'marker', 'map'],
    user: ['profile', 'person', 'account'],
    search: ['find', 'magnifier', 'lookup'],
    // Add more common mappings as needed
  };

  const tags = [];
  
  // Add filename itself as a tag
  tags.push(filename.toLowerCase());
  
  // Add words from filename (split by '-', '_' or camelCase)
  const words = filename.split(/[-_]/)
    .flatMap(part => part.split(/(?=[A-Z])/))
    .map(w => w.toLowerCase());
  
  tags.push(...words);
  
  // Add common tags if filename matches
  Object.keys(commonTags).forEach(key => {
    if (filename.toLowerCase().includes(key)) {
      tags.push(...commonTags[key]);
    }
  });

  // Remove duplicates
  return [...new Set(tags)];
}

app.get('/api/icons', (req, res) => {
  const iconsDir = path.join(__dirname, 'public/icons');
  
  fs.readdir(iconsDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read icons directory' });
    }

    // Filter only image files (add more extensions if needed)
    const imageFiles = files.filter(file => 
      ['.png', '.jpg', '.jpeg', '.svg', '.gif'].includes(path.extname(file).toLowerCase())
    );

    // Map files to JSON objects with additional metadata
    const icons = imageFiles.map(file => {
      const fileName = path.parse(file).name;
      
      return {
        name: fileName,
        path: `/icons/${file}`,
        tags: generateTags(fileName) // Helper function to generate tags
      };
    });

    res.json(icons);
  });
});

// Routes pour servir les pages HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/views/index.html'));
});

app.get('/games', (req, res) => {
  console.log(path.join(__dirname, '../client/views/games.html'));
  res.sendFile(path.join(__dirname, '../client/views/games.html'));
});

app.get('/team', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '../client/views/teams.html'));
});

app.get('/calendar', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '../client/views/calendar.html'));
});

app.get('/tasks', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, '../client/views/tasks.html'));
});


// Gestion des erreurs
app.use(errorHandler);

// Démarrer le serveur


app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
