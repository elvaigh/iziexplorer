// Charger les jeux, les membres de l'équipe et les événements du calendrier
async function loadGames() {
  const response = await fetch('/api/games');
  const games = await response.json();
  const gamesList = document.getElementById('games-list');
  gamesList.innerHTML = games.map(game => `<li>${game.name}: ${game.description}</li>`).join('');
}

async function loadTeam() {
  const response = await fetch('/api/team-members');
  const teamMembers = await response.json();
  const teamList = document.getElementById('team-list');
  teamList.innerHTML = teamMembers.map(member => `<li>${member.name} (${member.role})</li>`).join('');
}

async function loadCalendar() {
  const response = await fetch('/api/calendar');
  const events = await response.json();
  const calendarList = document.getElementById('calendar-list');
  calendarList.innerHTML = events.map(event => `<li>${event.title} - ${event.date}: ${event.description}</li>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sidebar-menu a').forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const path = this.getAttribute('href');
        console.log(path);
        // Load content for `path` dynamically here
        // For example, update the main content area
        // fetchContentForPath(path);
      });
    });
  loadGames();
  loadTeam();
  loadCalendar();
});