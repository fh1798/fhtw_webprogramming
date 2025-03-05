// Map each key (both white and black) to its corresponding sound file
const sounds = {
    keyC: 'sounds/C.mp3',
    keyD: 'sounds/D.mp3',
    keyE: 'sounds/E.mp3',
    keyF: 'sounds/F.mp3',
    keyG: 'sounds/G.mp3',
    keyA: 'sounds/A.mp3',
    keyB: 'sounds/B.mp3',
    keyCSharp: 'sounds/C.mp3',  // Assuming C# uses the same sound as C
    keyDSharp: 'sounds/D.mp3',  // Assuming D# uses the same sound as D
    keyFSharp: 'sounds/F.mp3',  // Assuming F# uses the same sound as F
    keyGSharp: 'sounds/G.mp3',  // Assuming G# uses the same sound as G
    keyASharp: 'sounds/A.mp3'   // Assuming A# uses the same sound as A
};

// Function to play sound when a key is clicked
function playSound(key) {
    const audio = new Audio(sounds[key]);
    audio.play();
}

// Add event listeners to the keys (both white and black)
document.getElementById('keyC').addEventListener('click', () => playSound('keyC'));
document.getElementById('keyD').addEventListener('click', () => playSound('keyD'));
document.getElementById('keyE').addEventListener('click', () => playSound('keyE'));
document.getElementById('keyF').addEventListener('click', () => playSound('keyF'));
document.getElementById('keyG').addEventListener('click', () => playSound('keyG'));
document.getElementById('keyA').addEventListener('click', () => playSound('keyA'));
document.getElementById('keyB').addEventListener('click', () => playSound('keyB'));

// For the black keys
document.getElementById('keyCSharp').addEventListener('click', () => playSound('keyCSharp'));
document.getElementById('keyDSharp').addEventListener('click', () => playSound('keyDSharp'));
document.getElementById('keyFSharp').addEventListener('click', () => playSound('keyFSharp'));
document.getElementById('keyGSharp').addEventListener('click', () => playSound('keyGSharp'));
document.getElementById('keyASharp').addEventListener('click', () => playSound('keyASharp'));

// Optionally, you can add event listeners for keyboard input (e.g., when a user presses a physical key)
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'y': playSound('keyC'); break;
        case 's': playSound('keyD'); break;
        case 'd': playSound('keyE'); break;
        case 'f': playSound('keyF'); break;
        case 'g': playSound('keyG'); break;
        case 'h': playSound('keyA'); break;
        case 'j': playSound('keyB'); break;
        case 'k': playSound('keyC'); break;
        // Add other key mappings here
    }
});
