const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default behavior to defer the prompt
    event.preventDefault();
  
    // Stash the event so it can be triggered later
    deferredPrompt = event;
  
    // Update UI or show a button to notify the user they can install the PWA
    butInstall.style.display = 'block';
  });


butInstall.addEventListener('click', async () => {
    // Hide the install button
    butInstall.style.display = 'none';
  
    // Show the installation prompt
    deferredPrompt.prompt();
  
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
  
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User dismissed the PWA installation');
    }
  
    // Reset the deferredPrompt variable
    deferredPrompt = null;
  });


window.addEventListener('appinstalled', (event) => {
    console.log('PWA installed successfully');
  });
