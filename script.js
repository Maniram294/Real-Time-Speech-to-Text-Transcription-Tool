let recognition;
let isRecording = false;

// Start speech recognition
function startRecognition() {
    if (!recognition) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = "en-GB";
        recognition.continuous = true; // Keep recognition active
        recognition.interimResults = false;
        
        // Handle the result event
        recognition.addEventListener("result", (e) => {
            let transcript = '';
            for (let i = e.resultIndex; i < e.results.length; i++) {
                transcript += e.results[i][0].transcript;
            }
            // Append new transcript to the existing text
            const textArea = document.querySelector(".text");
            textArea.value += transcript + ' ';
            // Auto-scroll to the bottom
            textArea.scrollTop = textArea.scrollHeight;
        });

        // Handle the end event
        recognition.addEventListener("end", () => {
            if (isRecording) {
                recognition.start(); // Restart recognition if still recording
            }
        });

        // Handle errors
        recognition.addEventListener("error", (e) => {
            console.error("Speech Recognition Error:", e.error);
            // Optionally handle specific errors or notify the user
        });
    }

    isRecording = true;
    recognition.start();
}

// Stop speech recognition
function stopRecognition() {
    if (recognition) {
        isRecording = false;
        recognition.stop();
        recognition = null; // Reset recognition instance
    }
}

// Clear the text area
function clearText() {
    document.querySelector(".text").value = '';
}

// Event listeners for buttons
document.querySelector(".mic-btn").addEventListener("click", startRecognition);
document.querySelector(".stop-btn").addEventListener("click", stopRecognition);
document.querySelector(".clear-btn").addEventListener("click", clearText);
