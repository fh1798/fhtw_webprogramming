// Set BPM at the very top to make it easily configurable
const BPM: number = 80;  // Ensure BPM is a number (explicitly typed)

document.addEventListener('DOMContentLoaded', () => {
    // All the existing code below
    createPiano();
    fetchNoteSequences(); // Call fetchNoteSequences here after DOMContentLoaded

    // Add event listeners after the DOM is fully loaded
    const clearButton = document.getElementById('clear');
    const playSequenceButton = document.getElementById('play-sequence');
    const sequenceSelect = document.getElementById('sequence-select');

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            document.getElementById("current-note")!.textContent = 'Current Note: None';
        });
    }

    if (playSequenceButton && sequenceSelect) {
        playSequenceButton.addEventListener('click', () => {
            const selectedSequence = (sequenceSelect as HTMLSelectElement).value;
            playSequence(selectedSequence);
        });
    }
});

// Define the white keys and their corresponding notes
const noteMapping: { [key: string]: string } = {
    'y': 'C',
    's': 'D',
    'd': 'E',
    'f': 'F',
    'g': 'G',
    'h': 'A',
    'j': 'B',
    'k': 'C'
};

// Define an interface for a piano key to enforce its properties
interface PianoKey {
    note: string;
    keyElement: HTMLElement;
    id: string;
}

// Type for the sequence object
interface NoteSequence {
    name: string;
    notes: { note: string; duration: number }[];  // Array of notes with durations
}

// Function to generate the piano keys dynamically (only white keys for now)
function createPiano(): void {
    const pianoContainer = document.getElementById('piano') as HTMLElement;
    const keys = Object.keys(noteMapping);  // Get the keys (e.g. 'y', 's', etc.)
    
    keys.forEach(key => {
        const note = noteMapping[key];
        const keyElement = document.createElement('div');
        keyElement.classList.add('key');
        keyElement.id = `key-${note}`;
        keyElement.textContent = note;

        // Create a PianoKey instance and ensure type safety
        const pianoKey: PianoKey = new PianoKey(note, keyElement, `key-${note}`);
        
        // Add event listener for mouse click to play the note
        keyElement.addEventListener('click', () => playNote(pianoKey.note));

        pianoContainer.appendChild(keyElement);
    });
}

// Class to represent a PianoKey, including its note, key element, and id
class PianoKey {
    note: string;
    keyElement: HTMLElement;
    id: string;

    constructor(note: string, keyElement: HTMLElement, id: string) {
        this.note = note;
        this.keyElement = keyElement;
        this.id = id;
    }

    // Method to add the active class (for visual feedback)
    activate(): void {
        this.keyElement.classList.add('active');
    }

    // Method to remove the active class (for visual feedback)
    deactivate(): void {
        this.keyElement.classList.remove('active');
    }
}

// Function to play the sound of a note
function playNote(note: string): void {
    const audio = new Audio(`./sounds/${note}.mp3`);  // Assuming the sound files are in a 'sounds' folder
    audio.play();

    // Add active visual feedback
    document.getElementById(`key-${note}`)?.classList.add('active');
    document.getElementById("current-note")!.textContent = `Current Note: ${note}`;

    // Remove active class after a short delay
    setTimeout(() => {
        document.getElementById(`key-${note}`)?.classList.remove('active');
    }, 400);
}

// Handle key press events
document.addEventListener('keydown', (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (noteMapping[key]) {
        playNote(noteMapping[key]);
    }
});

// Global variable to hold the sequences from the JSON file
let sequences: NoteSequence[] = [];

// Fetch the note sequences from the external JSON file
function fetchNoteSequences(): void {
    fetch('./notes.json')
        .then((response: Response) => response.json())  // Parse the response as JSON
        .then((data: { sequences: NoteSequence[] }) => {
            sequences = data.sequences;  // Store the sequences in the global variable
            populateSequences();  // Populate the dropdown with available sequences
        })
        .catch((error: Error) => console.error("Error fetching the note sequences:", error));
}

// Function to populate the available sequences in a dropdown
function populateSequences(): void {
    const sequenceSelect = document.getElementById('sequence-select') as HTMLSelectElement;
    sequences.forEach(sequence => {
        const option = document.createElement('option');
        option.value = sequence.name;
        option.textContent = sequence.name;
        sequenceSelect.appendChild(option);
    });
}

// Function to play the selected note sequence with duration
function playSequence(sequenceName: string): void {
    const sequence = sequences.find(seq => seq.name === sequenceName);
    if (sequence) {
        let index = 0;
        const intervalId: number = setInterval(() => {
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
function playNoteWithDuration(note: string, duration: number): void {
    const audio = new Audio(`./sounds/${note}.mp3`);
    audio.play();

    // Add active visual feedback
    document.getElementById(`key-${note}`)?.classList.add('active');
    document.getElementById("current-note")!.textContent = `Current Note: ${note}`;

    // Remove active class after a short delay
    setTimeout(() => {
        document.getElementById(`key-${note}`)?.classList.remove('active');
    }, 200);

    // Calculate the duration of the note based on the BPM
    const msPerBeat = 60000 / BPM;  // milliseconds per beat at the specified BPM

    let time: number;
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

    console.log(`Time for note ${note} with duration ${duration}: ${time}ms`); // Log inside the function where these variables exist

    setTimeout(() => {
        // After the duration of the note, allow the next note to play
    }, time);
}
