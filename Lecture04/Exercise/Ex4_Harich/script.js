// Set BPM at the very top to make it easily configurable
const BPM = 80;  // Change this value to adjust the tempo

// Define the white keys and their corresponding notes
const noteMapping = {
    'y': 'C',
    's': 'D',
    'd': 'E',
    'f': 'F',
    'g': 'G',
    'h': 'A',
    'j': 'B',
    'k': 'C'
};

// Function to generate the piano keys dynamically (only white keys for now)
function createPiano() {
    const pianoContainer = document.getElementById('piano');
    const keys = Object.keys(noteMapping); // Get the keys (e.g. 'y', 's', etc.)
    
    keys.forEach(key => {
        const note = noteMapping[key];
        const keyElement = document.createElement('div');
        keyElement.classList.add('key');
        keyElement.id = `key-${note}`;
        keyElement.textContent = note;

        // Add event listener for mouse click to play the note
        keyElement.addEventListener('click', () => playNote(note));

        pianoContainer.appendChild(keyElement);
    });
}

// Function to play the sound of a note
function playNote(note) {
    const audio = new Audio(`sounds/${note}.mp3`); // Assuming the sound files are in a 'sounds' folder
    audio.play();

    document.getElementById(`key-${note}`).classList.add('active'); // Add active class for visual feedback
    document.getElementById("current-note").textContent = `Current Note: ${note}`;

    // Remove active class after a short delay
    setTimeout(() => {
        document.getElementById(`key-${note}`).classList.remove('active');
    }, 400);
}

// Handle key press events
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (noteMapping[key]) {
        playNote(noteMapping[key]);
    }
});

// Clear the displayed note when the clear button is clicked
document.getElementById('clear').addEventListener('click', () => {
    document.getElementById("current-note").textContent = 'Current Note: None';
});

// Call the function to create the piano keys dynamically (only white keys)
createPiano();

// Global variable to hold the sequences from the JSON file
let sequences = [];

// Fetch the note sequences from the external JSON file
function fetchNoteSequences() {
    fetch('notes.json')
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            sequences = data.sequences;  // Store the sequences in the global variable
            populateSequences();  // Populate the dropdown with available sequences
        })
        .catch(error => console.error("Error fetching the note sequences:", error));
}

// Function to populate the available sequences in a dropdown
function populateSequences() {
    const sequenceSelect = document.getElementById('sequence-select');
    sequences.forEach(sequence => {
        const option = document.createElement('option');
        option.value = sequence.name;
        option.textContent = sequence.name;
        sequenceSelect.appendChild(option);
    });
}

// Function to play the selected note sequence with duration
function playSequence(sequenceName) {
    const sequence = sequences.find(seq => seq.name === sequenceName);
    if (sequence) {
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < sequence.notes.length) {
                const noteObj = sequence.notes[index];
                playNoteWithDuration(noteObj.note, noteObj.duration);
                index++;
            } else {
                clearInterval(intervalId);  // Stop playing when the sequence is finished
            }
        }, 500); // Base interval for next note
    }
}

// Function to play a note with its corresponding duration based on BPM
function playNoteWithDuration(note, duration) {
    const audio = new Audio(`sounds/${note}.mp3`);
    audio.play();

    // Add active visual feedback
    document.getElementById(`key-${note}`).classList.add('active');
    document.getElementById("current-note").textContent = `Current Note: ${note}`;

    // Remove active class after a short delay
    setTimeout(() => {
        document.getElementById(`key-${note}`).classList.remove('active');
    }, 200);

    // Calculate the duration of the note based on the BPM
    const msPerBeat = 60000 / BPM; // milliseconds per beat at the specified BPM

    let time;
    switch(duration) {
        case 1: // Whole note
            time = msPerBeat * 4;  // 4 beats
            break;
        case 2: // Half note
            time = msPerBeat * 2;  // 2 beats
            break;
        case 4: // Quarter note
            time = msPerBeat * 1;  // 1 beat
            break;
        case 8: // Eighth note
            time = msPerBeat * 0.5;  // 0.5 beats
            break;
        case 16: // Sixteenth note
            time = msPerBeat * 0.25;  // 0.25 beats
            break;
        default: // Default to quarter note if unknown duration
            time = msPerBeat * 1;
    }

    setTimeout(() => {
        // After the duration of the note, allow the next note to play
    }, time);
}



// Event listener for the "Play Sequence" button
document.getElementById('play-sequence').addEventListener('click', () => {
    const selectedSequence = document.getElementById('sequence-select').value;
    playSequence(selectedSequence);
});

// Call fetchNoteSequences to load the note sequences when the page loads
fetchNoteSequences();


console.log(`Time for note ${note} with duration ${duration}: ${time}ms`);
