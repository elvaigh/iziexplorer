// Ajouter un membre
document.getElementById('add-team-member-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('member-name').value;
  const role = document.getElementById('member-role').value;

  const response = await fetch('/api/team-members', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, role }),
  });

  if (response.ok) {
    alert('Membre ajouté avec succès !');
    window.location.reload();
  }else{
    console.log(response);
  }
});

// Charger la liste des membres
async function loadTeam() {
  const response = await fetch('/api/team-members');
  const teamMembers = await response.json();
  const teamList = document.getElementById('team-list-items');
  teamList.innerHTML = teamMembers.map(member => `<li>${member.name} (${member.role})</li>`).join('');
}

document.addEventListener('DOMContentLoaded', loadTeam);