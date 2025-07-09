// Ajouter un jeu
document.getElementById('saveGame').addEventListener('click', async (e) => {
  e.preventDefault();
  const name = document.getElementById('game-name').value;
  const description = document.getElementById('game-description').value;

  const response = await fetch('/api/games', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });

  if (response.ok) {
    alert('Jeu ajouté avec succès !');
    window.location.reload();
  }
});

// supprimer un jeu
async function deleteGame(gameId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce jeu ?')) {
    try {
      const response = await fetch(`/api/games/${gameId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert('Jeu supprimé avec succès !');
        window.location.reload(); // Recharger la page pour mettre à jour la liste
      } else {
        alert(`Erreur lors de la suppression du jeu numéro ${gameId}.`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur s\'est produite lors de la suppression du jeu.');
    }
  }
}

// Charger la liste des jeux
async function loadGames() {
  const response = await fetch('/api/games');
  const games = await response.json();
  const gamesList = document.getElementById('games-list');
  gamesList.innerHTML = games.map(game => `<tr><td id="game-id"> ${game.id}</td> <td> ${game.name}</td> <td> ${game.description}</td> 
          <td>
            <button class="btn btn-sm btn-warning"><i class="fas fa-edit"></i> Modifier</button>
            <button class="btn btn-sm btn-danger" id="deleteGame" onclick="deleteGame(${game.id})"><i class="fas fa-trash"></i> Supprimer</button>
          </td>
    </tr>`).join('');
}

document.addEventListener('DOMContentLoaded', loadGames);