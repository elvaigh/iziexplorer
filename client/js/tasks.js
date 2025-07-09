let editorInstance;
let editorInstance2, editorInstance3;
let editorIntroshort, editorIntro, editorHint;
let editorInstance4;
ClassicEditor
  .create(document.querySelector('#task-description'))
  .then(editor => {
    editorInstance = editor;
  })
  .catch(error => console.error(error));

  ClassicEditor
  .create(document.querySelector('#pre-validation-comment'))
  .then(editor => {
    editorInstance2 = editor;
  })
  .catch(error => console.error(error));

  ClassicEditor
  .create(document.querySelector('#post-validation-comment'))
  .then(editor => {
    editorInstance3 = editor;
  })
  .catch(error => console.error(error));
  
  /*  remove */
  ClassicEditor
  .create(document.querySelector('#intro'))
  .then(editor => {
    editorIntro = editor;
  })
  .catch(error => console.error(error));

  ClassicEditor
  .create(document.querySelector('#short-intro'))
  .then(editor => {
    editorIntroshort = editor;
  })
  .catch(error => console.error(error));
 /*  remove */
  ClassicEditor
  .create(document.querySelector('#hints'))
  .then(editor => {
    editorHint = editor;
  })
  .catch(error => console.error(error));

  ClassicEditor
  .create(document.querySelector('#instructions'))
  .then(editor => {
    editorInstance4 = editor;
  })
  .catch(error => console.error(error));



function tagsToString(selected) {
    if (!selected) {
      console.error('Element #selected-tags not found!');
    } else {

      const tagDivs = selectedTags.querySelectorAll('.selected-tags-i');
      const htmlList = Array.from(tagDivs).map(div => div.innerHTML.split("\n")[1].trim()).filter(text => text.length > 0);
      return htmlList.join(',');
    }

    
}

// Gestion du type de réponse
document.getElementById('response-type').addEventListener('change', function () {
  const responseType = this.value;
  const responseOptions = document.getElementById('response-options');
  responseOptions.innerHTML = '';

  switch (responseType) {
    case 'multiple-choice':
      responseOptions.innerHTML = `
        <div class="mb-3">
          <label for="option1" class="form-label">Option 1</label>
          <input type="text" class="form-control" id="option1" required>
        </div>
        <div class="mb-3">
          <label for="option2" class="form-label">Option 2</label>
          <input type="text" class="form-control" id="option2" required>
        </div>
        <div class="mb-3">
          <label for="option3" class="form-label">Option 3</label>
          <input type="text" class="form-control" id="option3">
        </div>
        <div class="mb-3">
          <label for="option4" class="form-label">Option 4</label>
          <input type="text" class="form-control" id="option4">
        </div>
      `;
      break;

    case 'multiple-answer':
      responseOptions.innerHTML = `
        <div class="mb-3">
          <label for="answer1" class="form-label">Réponse 1</label>
          <input type="text" class="form-control" id="answer1" required>
        </div>
        <div class="mb-3">
          <label for="answer2" class="form-label">Réponse 2</label>
          <input type="text" class="form-control" id="answer2" required>
        </div>
      `;
      break;

    case 'number':
      responseOptions.innerHTML = `
        <div class="mb-3">
          <label for="number-answer" class="form-label">Réponse attendue</label>
          <input type="number" class="form-control" id="number-answer" required>
        </div>
      `;
      break;

    case 'text':
      responseOptions.innerHTML = `
        <div class="mb-3">
          <label for="text-answer" class="form-label">Réponse attendue</label>
          <input type="text" class="form-control" id="text-answer" required>
        </div>
      `;
      break;

    
    case 'object-finder':
        responseOptions.innerHTML = `
          <div class="mb-3" id="object-finder-options">
            <label for="object-list" class="form-label">Choisir un objet</label>
              <select class="form-select" id="object-list">
                <option value="train">Train</option>
                <option value="person">Personne</option>
                <option value="bus">Bus</option>
                <option value="car">Voiture</option>
                <option value="bicycle">Vélo</option>
              </select>
          </div>`;
      break;
      case 'puzzle':
        responseOptions.innerHTML = `
          <div class="mb-3" id="puzzle-options">
            <label for="object-list" class="form-label">Choisir un Puzzle</label>
              <select class="form-select" id="puzzle-list" onchange="window.open(this.value, '_blank')">
                <option value="/puzzles/puzzle1.html">Puzzle 1 </option>
                <option value="/puzzles/puzzle2.html">Puzzle 2 </option>
                <option value="/puzzles/puzzle3.html">Puzzle 3 </option>
                <option value="/puzzles/puzzle4.html">Puzzle 4 </option>
                <option value="/puzzles/puzzle5.html">Puzzle 5 </option>
              </select>
          </div>`;
      break;
    // case 'image':
    //   responseOptions.innerHTML = `
    //     <div class="mb-3">
    //       <label for="image-upload" class="form-label">Téléverser une image</label>
    //       <input type="file" class="form-control" id="image-upload" accept="image/*">
    //     </div>
    //   `;
    //   break;
    default:
      responseOptions.innerHTML = `<p>Aucune réponse n'est requise pour cette tâche.</p>`;
      break;
  }
});


// Fonction pour récupérer les options de réponse

function getResponseOptions() {
  const responseType = document.getElementById('response-type').value;
  switch (responseType) {
    case 'multiple-choice':
      return {
        option1: document.getElementById('option1').value,
        option2: document.getElementById('option2').value,
        option3: document.getElementById('option3').value,
        option4: document.getElementById('option4').value,
      };
    case 'multiple-answer':
      return {
        answer1: document.getElementById('answer1').value,
        answer2: document.getElementById('answer2').value,
      };
    case 'number':
      return {
        numberAnswer: document.getElementById('number-answer').value,
      };
    case 'text':
      return {
        textAnswer: document.getElementById('text-answer').value,
      };
    case 'object-finder':
      return {
        object: document.getElementById('object-list').value,
      };
    case 'puzzle':
      return {
        puzzle: document.getElementById('puzzle-list').value,
      };
    case 'image':
      // Attention : pour les fichiers, on récupère le fichier sélectionné
      return {
        imageUpload: document.getElementById('image-upload').files[0],
      };
    default:
      return {};
  }
}

function setResponseOptions(responseType, options) {
  const responseOptions = document.getElementById('response-options');
  options = JSON.parse(options);
  responseOptions.innerHTML = '';

  switch (responseType) {
    case 'multiple-choice':
      responseOptions.innerHTML = `
        <div class="mb-3">
          <label for="option1" class="form-label">Option 1</label>
          <input type="text" class="form-control" id="option1" value="${options.option1 || ''}" required>
        </div>
        <div class="mb-3">
          <label for="option2" class="form-label">Option 2</label>
          <input type="text" class="form-control" id="option2" value="${options.option2 || ''}" required>
        </div>
        <div class="mb-3">
          <label for="option3" class="form-label">Option 3</label>
          <input type="text" class="form-control" id="option3" value="${options.option3 || ''}">
        </div>
        <div class="mb-3">
          <label for="option4" class="form-label">Option 4</label>
          <input type="text" class="form-control" id="option4" value="${options.option4 || ''}">
        </div>
      `;
      break;

    case 'multiple-answer':
      responseOptions.innerHTML = `
        <div class="mb-3">
          <label for="answer1" class="form-label">Réponse 1</label>
          <input type="text" class="form-control" id="answer1" value="${options.answer1 || ''}" required>
        </div>
        <div class="mb-3">
          <label for="answer2" class="form-label">Réponse 2</label>
          <input type="text" class="form-control" id="answer2" value="${options.answer2 || ''}" required>
        </div>
      `;
      break;

    case 'number':
     
      responseOptions.innerHTML = `
        <div class="mb-3">
          <label for="number-answer" class="form-label">Réponse attendue</label>
          <input type="number" class="form-control" id="number-answer" value="${parseInt(options.numberAnswer, 10)}" required>
        </div>
      `;
      break;

    case 'text':
      responseOptions.innerHTML = `
        <div class="mb-3">
          <label for="text-answer" class="form-label">Réponse attendue</label>
          <input type="text" class="form-control" id="text-answer" value="${options.textAnswer || ''}" required>
        </div>
      `;
      break;

    case 'object-finder':
      responseOptions.innerHTML = `
        <div class="mb-3" id="object-finder-options">
          <label for="object-list" class="form-label">Choisir un objet</label>
          <select class="form-select" id="object-list">
            <option value="train">Train</option>
            <option value="person">Personne</option>
            <option value="bus">Bus</option>
            <option value="car">Voiture</option>
            <option value="bicycle">Vélo</option>
          </select>
        </div>`;
      // Set selected option if provided
      setTimeout(() => {
        if (options.object) document.getElementById('object-list').value = options.object;
      }, 0);
      break;

    case 'puzzle':
      responseOptions.innerHTML = `
        <div class="mb-3" id="puzzle-options">
          <label for="puzzle-list" class="form-label">Choisir un Puzzle</label>
          <select class="form-select" id="puzzle-list" onchange="window.open(this.value, '_blank')">
            <option value="/puzzles/puzzle1.html">Puzzle 1 </option>
            <option value="/puzzles/puzzle2.html">Puzzle 2 </option>
            <option value="/puzzles/puzzle3.html">Puzzle 3 </option>
            <option value="/puzzles/puzzle4.html">Puzzle 4 </option>
            <option value="/puzzles/puzzle5.html">Puzzle 5 </option>
          </select>
        </div>`;
      // Set selected option if provided
      setTimeout(() => {
        if (options.puzzle) document.getElementById('puzzle-list').value = options.puzzle;
      }, 0);
      break;

    case 'image':
      responseOptions.innerHTML = `
        <div class="mb-3">
          <label for="image-upload" class="form-label">Téléverser une image</label>
          <input type="file" class="form-control" id="image-upload" accept="image/*">
        </div>
        <div id="image-upload-label" style="margin-top:5px;color:#888;"></div>
      `;
      // Display file name if provided (cannot set file input value for security reasons)
      setTimeout(() => {
        if (options.imageUpload && options.imageUpload.name) {
          document.getElementById('image-upload-label').innerText = options.imageUpload.name;
        }
      }, 0);
      break;

    default:
      responseOptions.innerHTML = `<p>Aucune réponse n'est requise pour cette tâche.</p>`;
      break;
  }
}


async function deleteTask(taskId) {
  try {
    if (confirm('Vous voulez vraiment supprimer cette tâche?')) {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert(`Tâche ${taskId} supprimée avec succès !`);
        window.location.reload();
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error fetching task:', error);
    return false;
  }
}

async function fetchTaskForEditing(taskId) {
  try {
    // console.log(taskId);
    const response = await fetch(`/api/tasks/${taskId}`);
    const task = await response.json();
    // console.log(task);
    openTaskModal(task);
  } catch (error) {
    console.error('Error fetching task:', error);
  }
}


// Ajouter une tache
document.getElementById('saveTask').addEventListener('click', async (e) => {
  // e.preventDefault();
  const modalTitle = document.getElementById('taskModalLabel'); 

  
  if (modalTitle.textContent === "Créer une tâche") {
    const maxtime = document.getElementById('time-limit').value;  
  
    const icon = document.getElementById('selected-icon-preview'); 
    const icon_url = icon.src 
    const selected = document.getElementById('selected-tags');
    const modalTitle = document.getElementById('taskModalLabel'); 
    const tags = tagsToString(selected);

    const name = document.getElementById('task-title').value;
    const description = editorInstance.getData();
    const hint = editorHint.getData();
    const ccorrect = editorInstance2.getData();
    const cincorrect = editorInstance3.getData();
    const responseType = document.getElementById('response-type').value;
    const responseOptions = getResponseOptions();
    const score = document.getElementById('number-point').value;

    const imageUrl = document.getElementById('image-url').value;
    const videoUrl = document.getElementById('video-url').value;
    const audioUrl = document.getElementById('audio-url').value;
    // const backgroundAudioUrl = document.getElementById('background-audio-url').value;
    const activationType = document.getElementById('activation-type').value;
    const language = document.getElementById('language').value;
    const instruction = editorInstance4.getData();
    const keepAfterCompletion = document.getElementById('keep-after-completion').checked;
    const closeTask = document.getElementById('close-task').checked;

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, tags, score, responseType, responseOptions, icon_url, hint, ccorrect, cincorrect, maxtime, imageUrl, videoUrl, audioUrl, activationType, instruction, keepAfterCompletion }),
    });

    if (response.ok) {
      alert('Tâche ajoutée avec succès !');
      // Fermer la modale
      const taskModal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
      taskModal.hide();
      window.location.reload();
    }
  }
});

// Helper to upload a file and update the corresponding URL input
async function handleMediaFileUpload(fileInputId, urlInputId, mediaType) {
  const fileInput = document.getElementById(fileInputId);
  const urlInput = document.getElementById(urlInputId);

  fileInput.addEventListener('change', async function () {
    const file = fileInput.files[0];
    console.log(file);
    if (file !== undefined && file !== null) {
        
        if (!file) file = {};
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch(`/upload/media/${mediaType}`, {
            method: 'POST',
            body: formData
          });
          if (!response.ok) throw new Error('Upload failed');

          const data = await response.json();
          urlInput.value = data.url; // Set the URL input to the uploaded file's URL
        } catch (err) {
          alert('Erreur lors de l\'upload du fichier : ' + err.message);
        }
    }
  });
}



// Function to load icons and initialize icon search functionality
function loadIcons() {
  const iconSearch = document.getElementById('icon-search');
  const iconResults = document.getElementById('icon-results');
  const selectedIconPreview = document.getElementById('selected-icon-preview');
  const selectedIconContainer = document.getElementById('selected-icon-container');
  const pinIconInput = document.getElementById('pin-icon');
  let allIcons = [];

  fetch('/api/icons')
    .then(response => response.json())
    .then(icons => {
      allIcons = icons;
      setupIconSearch(allIcons, iconSearch, iconResults, selectedIconPreview, selectedIconContainer, pinIconInput);
    })
    .catch(error => {
      console.error('Erreur lors du chargement des icônes:', error);
      iconResults.innerHTML = '<div class="list-group-item text-danger">Erreur de chargement des icônes</div>';
    });
}

function setupIconSearch(allIcons, iconSearch, iconResults, selectedIconPreview, selectedIconContainer, pinIconInput) {
  iconSearch.addEventListener('focus', () => showIconList(allIcons, iconResults, '', selectedIconPreview, selectedIconContainer, pinIconInput, iconSearch));
  iconSearch.addEventListener('blur', function() {
    setTimeout(() => iconResults.style.display = 'none', 200);
  });
  iconSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    showIconList(allIcons, iconResults, searchTerm, selectedIconPreview, selectedIconContainer, pinIconInput, iconSearch);
  });
}

function showIconList(allIcons, iconResults, searchTerm, selectedIconPreview, selectedIconContainer, pinIconInput, iconSearch) {
  filterAndDisplayIcons(allIcons, iconResults, searchTerm, selectedIconPreview, selectedIconContainer, pinIconInput, iconSearch);
  iconResults.style.display = 'block';
}

// Function to filter icons and update the results container
function filterAndDisplayIcons(allIcons, iconResults, searchTerm, selectedIconPreview, selectedIconContainer, pinIconInput, iconSearch) {
  iconResults.innerHTML = '';

  const filteredIcons = allIcons.filter(icon =>
    icon.name.toLowerCase().includes(searchTerm) ||
    (icon.tags && icon.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  ).slice(0, 50);

  if (filteredIcons.length === 0) {
    iconResults.innerHTML = '<div class="list-group-item">Aucun résultat</div>';
    return;
  }

  filteredIcons.forEach(icon => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'list-group-item list-group-item-action d-flex align-items-center';
    item.innerHTML = `
      <img src="${icon.path}" alt="${icon.name}" style="width: 20px; height: 20px; margin-right: 10px;">
      <span>${icon.name}</span>
    `;

    item.addEventListener('click', function() {
      selectIcon(icon, selectedIconPreview, selectedIconContainer, pinIconInput, iconResults, iconSearch);
    });

    item.addEventListener('mousedown', function(e) {
      e.preventDefault(); // Prevent blur on search field
    });

    iconResults.appendChild(item);
  });
}

// Function to handle icon selection
function selectIcon(icon, selectedIconPreview, selectedIconContainer, pinIconInput, iconResults, iconSearch) {
  selectedIconPreview.src = icon.path;
  selectedIconPreview.style.display = 'inline-block';
  selectedIconContainer.querySelector('.no-icon')?.remove();
  pinIconInput.value = icon.path;
  iconResults.style.display = 'none';
  iconSearch.value = icon.name;
}


function openTaskModal(task = null) {
  
  const modal = new bootstrap.Modal(document.getElementById('taskModal'));
  const modalTitle = document.getElementById('taskModalLabel');

  if (task) {
    // Editing an existing task
    modalTitle.textContent = 'Modifier la tâche';
    
    // Fill basic task info
   // document.getElementById('task-id').value = task.id || '';
    document.getElementById('task-title').value = task.name || '';
    const task_desc = task.description || '';
    editorInstance.setData(task_desc);
    
    document.getElementById('time-limit').value = task.maxtime || 3600;
    const hint = task.hint || '';
    editorHint.setData(hint);
    const ccorrect = task.ccorrect || '';
    editorInstance2.setData(ccorrect);
    const cincorrect = task.cincorrect || '';
    editorInstance3.setData(cincorrect);
    const selectedIcon = document.getElementById('selected-icon-container'); 
    selectedIcon.innerHTML = `<img  id="selected-icon-preview" src="${task.icon}" alt="No icon" style="width: 20px; height: 20px; margin-right: 10px;">`;
    loadIcons();

    document.getElementById('response-type').value = task.answertype || 'no-response';
   
    setResponseOptions(task.answertype, task.answer);

    
    document.getElementById('number-point').value = task.score || 0;

    document.getElementById('image-url').value = task.image ||  '';
    document.getElementById('video-url').value = task.video ||  '';
    document.getElementById('audio-url').value = task.audio ||  '';
    // const backgroundAudioUrl = document.getElementById('background-audio-url').value;
    document.getElementById('activation-type').value = task.activate ||  '';
    document.getElementById('language').value = task.language ||  '';
    const instruct = task.instruct ||  '';
    editorInstance4.setData(instruct);
    document.getElementById('keep-after-completion').checked = task.keept ||  false;
    // document.getElementById('close-task').checked;

    
    // Fill tags
    // const selectedTagsContainer = document.getElementById('selected-tags');
    if (task.tags){
      currentTags = task.tags.split(",");
      renderSelectedTags();
    }
    
    // Fill other tabs...
    // (Keep your existing code for other fields)
    
  } else {
    // Creating a new task
    modalTitle.textContent = 'Créer une tâche';
    // Reset all form fields
    document.getElementById('task-form').reset();
    document.getElementById('selected-tags').innerHTML = '';
    document.getElementById('task-id').value = '';
  }
  
  modal.show();


  // Ajouter une tache
  document.getElementById('saveTask').addEventListener('click', async (e) => {
    // e.preventDefault();
    const maxtime = document.getElementById('time-limit').value;  

    const selected = document.getElementById('selected-tags');
    const modalTitle = document.getElementById('taskModalLabel'); 
    
    const tags = tagsToString(selected);
      
    const icon = document.getElementById('selected-icon-preview'); 
    const icon_url = icon.src ;
    // console.log(icon_url);
    renderSelectedTags();
    const name = document.getElementById('task-title').value;
    const description = editorInstance.getData();
    const hint = editorHint.getData();
    const ccorrect = editorInstance2.getData();
    const cincorrect = editorInstance3.getData();
    const responseType = document.getElementById('response-type').value;
    const responseOptions = getResponseOptions();
    const score = document.getElementById('number-point').value;
    
    const imageUrl = document.getElementById('image-url').value;
    const videoUrl = document.getElementById('video-url').value;
    const audioUrl = document.getElementById('audio-url').value;
    // const backgroundAudioUrl = document.getElementById('background-audio-url').value;
    const activationType = document.getElementById('activation-type').value;
    const language = document.getElementById('language').value;
    const instruction = editorInstance4.getData();
    const keepAfterCompletion = document.getElementById('keep-after-completion').checked;
    const closeTask = document.getElementById('close-task').checked;
    
    // console.log(modalTitle);
    if (modalTitle.textContent === "Modifier la tâche") {
        const TaskId = task.id;

        console.log(TaskId);
        // const response = fetch(`/api/tags/objects/${TaskI}/tags/${tag}`, { 
        const response = await fetch(`/api/tasks/${TaskId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, tags, score, responseType, responseOptions, icon_url, hint, ccorrect, cincorrect, maxtime, imageUrl, videoUrl, audioUrl, activationType, instruction, keepAfterCompletion  }),
        });

        
        if (response.ok) {
          alert('Tâche modifiée avec succès !');
          // Fermer la modale
          const taskModal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
          taskModal.hide();
          window.location.reload();
        }
    }
  });
}



async function loadTags() {
  try {
    // Fetch available tags from server
    const response = await fetch('/api/tags');
    // console.log(response);
    if (!response.ok) throw new Error('Failed to fetch tags');
    
    const tags = await response.json();
    availableTags = tags.map(tag => tag.name);

    const tagFilter = document.getElementById('tag-filter');
    // Clear existing options
    tagFilter.innerHTML = '<option value="">-- Tous les tags --</option>';

    availableTags.forEach(tagObj => {
      // If your tag is an object with a 'name' property
      const option = document.createElement('option');
      option.value = tagObj;
      option.textContent = tagObj;
      tagFilter.appendChild(option);
    });

    // console.log(availableTags);
  } catch (error) {
    console.error('Error loading tags:', error);
    tagSuggestions.innerHTML = `
      <div class="tag-error">
        <i class="fas fa-exclamation-triangle"></i> Erreur de chargement des tags
      </div>
    `;
  }
}
// Gestion des tags
// Liste des tags disponibles
// const availableTags = ['Urgent', 'Facile', 'Difficile', 'En équipe', 'Solo'];

// Éléments du DOM
const tagInput = document.getElementById('tag-input');
const tagSuggestions = document.getElementById('tag-suggestions');
const selectedTags = document.getElementById('selected-tags');

// Tags sélectionnés
let currentTags = [];

// Afficher les suggestions de tags
tagInput.addEventListener('input', function () {
  const inputValue = tagInput.value.trim().toLowerCase();
  tagSuggestions.innerHTML = '';

  if (inputValue) {
    console.log(availableTags);
    // Filtrer les tags disponibles
    const filteredTags = availableTags.filter(tag => tag.toLowerCase().includes(inputValue));

    if (filteredTags.length > 0) {
      // Afficher les suggestions
      filteredTags.forEach(tag => {
        const suggestion = document.createElement('div');
        suggestion.className = 'tag-suggestion';
        suggestion.textContent = tag;
        suggestion.addEventListener('click', () => selectTag(tag));
        tagSuggestions.appendChild(suggestion);
      });
    } else {
      // Afficher l'option pour créer un nouveau tag
      const createTag = document.createElement('div');
      createTag.className = 'tag-suggestion';
      createTag.textContent = `Créer "${tagInput.value}"`;
      createTag.addEventListener('click', () => createNewTag(tagInput.value));
      tagSuggestions.appendChild(createTag);
    }
  }
});

// Sélectionner un tag
function selectTag(tag) {
  if (!currentTags.includes(tag)) {
    currentTags.push(tag);    
    renderSelectedTags();
  }
  tagInput.value = '';
  tagSuggestions.innerHTML = '';
}

// Function to create a new tag and add it to selection
async function createNewTag(tag) {
  if (!availableTags.includes(tag)) {
      try {


        const response = await fetch('/api/tags', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: tag })
        });

        if (response.ok) {
          // Add the new tag to available tags and current selection
          selectTag(tag);
          // Refresh the tag list
          loadTags();
        } else {
          throw new Error('Failed to create tag');
        }
      
      } catch (error) {
        console.error('Error creating tag:', error);
        tagSuggestions.innerHTML = `
          <div class="tag-error">
            <i class="fas fa-exclamation-triangle"></i> Erreur de création du tag
          </div>
        `;
      }
  }else{
    selectTag(tag);
  }
}

// Afficher les tags sélectionnés
function renderSelectedTags() {
  selectedTags.innerHTML = '';
  currentTags.forEach(tag => {
    const tagElement = document.createElement('div');
    tagElement.className = 'selected-tags-i';
    tagElement.innerHTML = `
      ${tag}
      <span class="remove-tag" onclick="removeTag('${tag}')">×</span>
    `;
    selectedTags.appendChild(tagElement);
  });
}

// Supprimer un tag
window.removeTag = function (tag) {
  currentTags = currentTags.filter(t => t !== tag);
  renderSelectedTags();
};


// Charger la liste des taches
async function loadTasks() {
  try {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    const tasksList = document.querySelector("#task-table tbody");
   

    tasksList.innerHTML = tasks.map(task => `
      <tr>
        <td class="align-middle">${task.name}</td>
        <td class="align-middle">${task.description || '-'}</td> 
        <td class="align-middle text-center">
          ${task.icon ? `<img src="${task.icon}" alt="Task icon" class="img-thumbnail" style="max-width: 50px; max-height: 50px;">` : '<i class="fas fa-image text-muted"></i>'}
        </td>
        <td class="align-middle">
          <div class="d-flex flex-wrap gap-1">
            ${task.tags ? task.tags.split(',').map(tag => `
              <span class="badge bg-primary">${tag.trim()}</span>
            `).join('') : '<span class="text-muted">No tags</span>'}
          </div>
        </td>
        <td class="align-middle text-center">
          <span class="badge bg-success rounded-pill">${task.score || 0}</span>
        </td>
        <td class="align-middle text-center">
          <div class="btn-group btn-group-sm" role="group">
            <button class="btn btn-warning edit-task" data-task-id="${task.id}" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-danger delete-task" data-task-id="${task.id}" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <!-- Hidden element with task.id 
            <span for ="taskid" class="d-none task-id-hidden">${task.id}</span>
            -->
        </td>
      </tr>
    `).join('');
    
    // Add event listeners to the new buttons
    // document.querySelectorAll('.edit-task').forEach(button => {
    //   button.addEventListener('click', (e) => editTask(e.target.closest('button').dataset.taskId));
    // });
    
    // document.querySelectorAll('.delete-task').forEach(button => {
    //   button.addEventListener('click', (e) => deleteTask(e.target.closest('button').dataset.taskId));
    // });

    document.addEventListener('click', async function(e) {
      // e.preventDefault();
      if (e.target.closest('.edit-task')) {
        const taskId = e.target.closest('.edit-task').getAttribute('data-task-id');
        const row = e.target.closest('tr'); // Now 'row' is defined
        // Fetch the full task data from your API
        fetchTaskForEditing(taskId);
      }
      if (e.target.closest('.delete-task')) {
        const taskId = e.target.closest('.delete-task').getAttribute('data-task-id');
        
        const deleted = await deleteTask(taskId);
        if (deleted) {
          loadTasks();
        }
      }
    });
    
  } catch (error) {
    console.error('Error loading tasks:', error);
    // Show error message to user
    const tasksList = document.querySelector("#task-table tbody");
    tasksList.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-danger">
          <i class="fas fa-exclamation-triangle"></i> Failed to load tasks. Please try again.
        </td>
      </tr>
    `;
  }
}

const searchInput = document.getElementById("search");
const tagFilter = document.getElementById("tag-filter");
const resetButton = document.getElementById("reset");
const taskTableBody = document.querySelector("#task-table tbody");

function filterTasks() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedTag = tagFilter.value;

  Array.from(taskTableBody.querySelectorAll("tr")).forEach(row => {
    const [taskTile, taskDesc, flagsCell, tagsCell, point, actions] = row.children;
    const taskText = taskTile ? taskTile.textContent.toLowerCase() : '';
    const tagsText = tagsCell ? tagsCell.textContent : '';

    const matchesSearch = searchText && taskText.includes(searchText);
    const matchesTag = selectedTag && tagsText.includes(selectedTag);

    // Logic according to your requirements:
    if (!searchText && !selectedTag) {
      // No filters: show all
      row.style.display = '';
    } else if (!searchText && selectedTag) {
      // Only tag filter: show all
      row.style.display = matchesTag ? '' : 'none';
    } else if (searchText && !selectedTag) {
      // Only search filter: show if search matches
      row.style.display = matchesSearch ? '' : 'none';
    } else {
      // Both filters: show if either matches
      row.style.display = (matchesSearch || matchesTag) ? '' : 'none';
    }
  });
}

searchInput.addEventListener("input", filterTasks);
tagFilter.addEventListener("change", filterTasks);
resetButton.addEventListener("click", () => {
  searchInput.value = "";
  tagFilter.value = "";
  filterTasks();
});



document.addEventListener('DOMContentLoaded',() => {


    loadTasks();
    loadTags();
    loadIcons();
    handleMediaFileUpload('image-file', 'image-url', 'image');
    handleMediaFileUpload('video-file', 'video-url', 'video');
    handleMediaFileUpload('audio-file', 'audio-url', 'audio');
});
