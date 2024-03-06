function createMeet(event) {
  event.preventDefault();

  // Retrieve form values
  const name = document.getElementById('name').value;
  const location = document.getElementById('location').value;
  const date = document.getElementById('date').value;
  const notes = document.getElementById('notes').value;
  const fxScore = document.getElementById('fx-score').value;
  const phScore = document.getElementById('ph-score').value;
  const srScore = document.getElementById('sr-score').value;
  const vtScore = document.getElementById('vt-score').value;
  const pbScore = document.getElementById('pb-score').value;
  const hbScore = document.getElementById('hb-score').value;

  // Convert date to UTC time in seconds
  const utcSeconds = Date.parse(date) / 1000;

  // Create map of scores
  const scores = {
    "fx": fxScore,
    "ph": phScore,
    "sr": srScore,
    "vt": vtScore,
    "pb": pbScore,
    "hb": hbScore
  };

  // Create JSON payload
  const formData = {
    name,
    location,
    date: utcSeconds,
    notes,
    scores
  };

  console.log('form data', formData);

  // Send JSON data as POST request
  fetch('/meets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  // Gets response from server and converts to JSON
  .then(response => response.json())
  .then(data => { // Meet as JSON object
    console.log('Meet data:', data);
    window.location.href = `/meets/${data._id}`; // Redirect to meet view page
  })
  .catch(error => {
    // TODO: redirect to error page
    console.error('Error submitting meet data:', error);
  });
}

function deleteMeet(meetId, event) {
  event.preventDefault();

  console.log('Deleting meet', meetId);

  // Send JSON data as POST request
  fetch(`/meets/${meetId}`, {
    method: 'DELETE',
  })
  .then(response => window.location.href = '/meets') // Redirect to all meets
  .catch(error => {
    console.error('Error deleting meet:', error);
  });
}