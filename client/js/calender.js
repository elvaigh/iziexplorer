document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le calendrier
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'fr', // Utiliser la langue française
      selectable: true, // Permettre de sélectionner des dates
      dateClick: (info) => {
        // Afficher le modal pour ajouter un événement
        const eventModal = new bootstrap.Modal(document.getElementById('eventModal'));
        document.getElementById('eventDate').value = info.dateStr;
        eventModal.show();
      },
      events: async (fetchInfo, successCallback, failureCallback) => {
        try {
          // Récupérer les événements depuis l'API
          const response = await fetch('/api/calendar');
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des événements');
          }
          const events = await response.json();
          // Formater les événements pour FullCalendar
          const formattedEvents = events.map(event => ({
            title: event.title,
            date: event.date,
            description: event.description,
          }));
          successCallback(formattedEvents);
        } catch (error) {
          console.error('Erreur:', error);
          failureCallback(error);
        }
      },
    });
  
    calendar.render();
  
    // Gérer l'enregistrement d'un événement
    document.getElementById('saveEvent').addEventListener('click', async () => {
      const title = document.getElementById('eventTitle').value;
      const date = document.getElementById('eventDate').value;
      const description = document.getElementById('eventDescription').value;
  
      if (title && date) {
        try {
          // Envoyer l'événement à l'API
          const response = await fetch('/api/calendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, date, description }),
          });
  
          if (response.ok) {
            alert('Événement ajouté avec succès !');
            // Recharger les événements du calendrier
            calendar.refetchEvents();
            // Fermer le modal
            bootstrap.Modal.getInstance(document.getElementById('eventModal')).hide();
          } else {
            alert('Erreur lors de l\'ajout de l\'événement.');
          }
        } catch (error) {
          console.error('Erreur:', error);
        }
      } else {
        alert('Veuillez remplir tous les champs obligatoires.');
      }
    });
  });