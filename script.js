document.addEventListener('DOMContentLoaded', () => {
    const blackBox = document.getElementById('hidden-box');
    let inputSequence = '';
    const targetSequence = '123'; // Key sequence: 1, 2, 3
    const redirectURL = 'https://youtu.be/dIEuBLkYqYA?si=rDb7eYbIzbYANajE'; // Redirect URL

    // Handle clicks on the black box
    blackBox.addEventListener('click', () => {
        // Play the sound
        const audio = new Audio('BLUE_LOBSTER.mp3');
        audio.play();

        // Show the image in full screen
        const photoURL = 'yali-grey-black-background.png'; // Path to the photo
        const imgElement = document.createElement('img');
        imgElement.src = photoURL;
        imgElement.alt = 'Full screen photo of Yali\'s grey background';
        imgElement.style.position = 'fixed';
        imgElement.style.top = '0';
        imgElement.style.left = '0';
        imgElement.style.width = '100vw';
        imgElement.style.height = '100vh';
        imgElement.style.objectFit = 'contain';
        imgElement.style.background = 'rgba(0, 0, 0, 0.8)';
        imgElement.style.zIndex = '1000';

        // Add close functionality
        imgElement.addEventListener('click', () => {
            document.body.removeChild(imgElement);
        });

        document.body.appendChild(imgElement);
    });

    // Handle the key sequence for redirecting
    document.addEventListener('keydown', (event) => {
        inputSequence += event.key;

        if (inputSequence.includes(targetSequence)) {
            const newWindow = window.open('about:blank', '_blank');
            if (newWindow) {
                newWindow.blur(); // Blur the new window
                window.focus();   // Focus the current window
                newWindow.location.href = redirectURL;
            }
            inputSequence = ''; // Reset the sequence
        }

        if (inputSequence.length > targetSequence.length) {
            inputSequence = inputSequence.slice(-targetSequence.length);
        }

        // Open photo in full screen on 'י' key press
        if (event.key === 'י') {
            const photoURL = 'yali-grey-black-background.png'; // Path to the photo
            const imgElement = document.createElement('img');
            imgElement.src = photoURL;
            imgElement.alt = 'Full screen photo of Yali\'s grey background';
            imgElement.style.position = 'fixed';
            imgElement.style.top = '0';
            imgElement.style.left = '0';
            imgElement.style.width = '100vw';
            imgElement.style.height = '100vh';
            imgElement.style.objectFit = 'contain';
            imgElement.style.background = 'rgba(0, 0, 0, 0.8)';
            imgElement.style.zIndex = '1000';

            // Add close functionality
            imgElement.addEventListener('click', () => {
                document.body.removeChild(imgElement);
            });

            document.body.appendChild(imgElement);
        }
    });
});
