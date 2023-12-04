// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyBBZOUs_9vD6xdBTpkgiNRJ1wRQkjEHrKU',
    authDomain: 'aggholiday-bafb9.firebaseapp.com',
    projectId: 'aggholiday-bafb9',
    storageBucket: 'aggholiday-bafb9.appspot.com',
    messagingSenderId: '518104895758',
    appId: '1:518104895758:web:c650caee27513bbaeb075f'
};

firebase.initializeApp(firebaseConfig);

// Reference to the Firestore database
const db = firebase.firestore();

let presentCount;

function checkCode() {
    const documentId = document.getElementById('code-input').value;
    console.log(documentId);

    const docRef = db.collection('People').doc(documentId);

    docRef.get().then((doc) => {
        if (doc.exists) {
            presentCount = doc.data().presentCount;
            alert(`Present Count: ${presentCount}`);

            // Show the presents container when unlocking is successful
            document.getElementById('presents-container').style.display = 'block';
            document.getElementById('main-container').style.display = 'none';

            // Populate the presents list with the number of presents specified by presentCount
            const presentsList = document.getElementById('presents-list');
            presentsList.innerHTML = '';

            for (let i = 1; i <= presentCount; i++) {

                const presentData = doc.data()[`present${i-1}`];

                if (presentData && Array.isArray(presentData)) {
                    console.log(`Present ${i-1} Array:`, presentData);
                }

                // Create a new present element
                const presentElement = document.createElement('div');
                presentElement.className = 'christmas-gift';

                // Create an image element
                const presentImage = document.createElement('img');
                presentImage.src = "images/present.png";
                presentImage.alt = `Present ${i}`;
                presentImage.height = 200;

                // Append the image element to the present element
                presentElement.appendChild(presentImage);

                // Attach a click event listener to each present element
                presentElement.addEventListener('click', () => {
                    // Handle the click event to make the present image fade away
                    presentElement.style.opacity = '0';
                    setTimeout(() => {
                    }, 500); // Adjust the duration of the fade-out animation (in milliseconds)
                });

                // Append the present element to the presents list
                presentsList.appendChild(presentElement);
            }

            // Initially show the first present
            showPresent(0);
        } else {
            alert("Invalid Code");
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
}

let currentPresentIndex = 0;

function showPresent(index) {
    const presents = document.querySelectorAll('.christmas-gift');
    presents.forEach((present, i) => {
        present.style.display = i === index ? 'block' : 'none';
    });
}

function showPreviousPresent() {
    currentPresentIndex = (currentPresentIndex - 1 + presentCount) % presentCount;
    showPresent(currentPresentIndex);
}

function showNextPresent() {
    currentPresentIndex = (currentPresentIndex + 1) % presentCount;
    showPresent(currentPresentIndex);
}