const axios = require('axios');

// Function to make the server call
function callServer() {
    axios.get('https://chatandplay.onrender.com/')
        .then(response => {
            console.log('Server response:', response.data);
        })
        .catch(error => {
            console.error('Error calling server:', error);
        });

    // Schedule the next call
    scheduleNextCall();
}

// Function to schedule the next call at a random interval between 5 and 20 minutes
function scheduleNextCall() {
    const minMinutes = 5;
    const maxMinutes = 20;
    const randomInterval = 5000;

    console.log(`Next call in ${randomInterval / 60000} minutes`);
    setTimeout(callServer, randomInterval);
}

// Start the first call
callServer();
