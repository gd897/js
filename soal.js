// Get all scale buttons
const scaleButtons = document.querySelectorAll('.scale-item');

// Add click event to each button
scaleButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Remove the 'selected' class from all buttons
        scaleButtons.forEach((btn) => {
            const circle = btn.querySelector('.circle');
            circle.classList.remove('selected');
        });

        // Add the 'selected' class to the clicked button
        const circle = button.querySelector('.circle');
        circle.classList.add('selected');
    });
});

// Daftar soal
const questions = [
    { question: "During the last 30 days, about how often did you feel tired out for no good reason?", answered: false, selectedAnswer: null },
    { question: "During the last 30 days, about how often did you feel nervous?", answered: false, selectedAnswer: null },
    { question: "During the last 30 days, about how often did you feel so nervous that nothing could calm you down?", answered: false, selectedAnswer: null },
    { question: "During the last 30 days, about how often did you feel hopeless?", answered: false, selectedAnswer: null },
    { question: "During the last 30 days, about how often did you feel restless or fidgety?", answered: false, selectedAnswer: null },
    { question: "During the last 30 days, about how often did you feel so restless you could not sit still?", answered: false, selectedAnswer: null },
    { question: "During the last 30 days, about how often did you feel depressed?", answered: false, selectedAnswer: null },
    { question: "During the last 30 days, about how often did you feel that everything was an effort?", answered: false, selectedAnswer: null },
    { question: "During the last 30 days, about how often did you feel so sad that nothing could cheer you up?", answered: false, selectedAnswer: null },
    { question: "During the last 30 days, about how often did you feel worthless?", answered: false, selectedAnswer: null }
];

// Elemen-elemen HTML
const questionElement = document.getElementById("question");
const progressBarElement = document.getElementById("progress");
const progressTextElement = document.getElementById("progress-text");
const navButtons = document.querySelectorAll(".nav-button");
const submitButton = document.getElementById("submit-button");

// Variabel untuk melacak soal aktif
let currentIndex = 0;

// Fungsi untuk memperbarui tampilan soal
// Function to update question and manage button states
function updateQuestion() {
    const currentQuestion = questions[currentIndex];
    questionElement.textContent = currentQuestion.question;

    // Clear the "selected" state for all buttons
    scaleButtons.forEach((btn) => {
        const circle = btn.querySelector(".circle");
        circle.classList.remove("selected");
    });

    // Restore the previously selected answer
    if (currentQuestion.selectedAnswer !== null) {
        const selectedButton = scaleButtons[currentQuestion.selectedAnswer];
        const circle = selectedButton.querySelector(".circle");
        circle.classList.add("selected");
    }

    // Enable all scale buttons for previously answered questions (allow changing answers)
    scaleButtons.forEach((btn) => btn.disabled = false);  // Enable buttons to change the answer

    // Update navigation button states
    navButtons[0].disabled = currentIndex === 0;
    navButtons[1].disabled = currentIndex === questions.length - 1;

    // Show the Submit button only on the last question
    if (currentIndex === questions.length - 1) {
        submitButton.classList.add("visible"); // Make it visible
        submitButton.disabled = !questions.every((q) => q.answered); // Enable only if all questions are answered
    } else {
        submitButton.classList.remove("visible");
    }
}

// Fungsi untuk memperbarui progress bar
function updateProgressBar() {
    const answeredCount = questions.filter((q) => q.answered).length;
    const progressPercentage = (answeredCount / questions.length) * 100;

    // Update the blue progress bar width
    progressBarElement.style.width = `${progressPercentage}%`;

    // Update the progress percentage text
    progressTextElement.textContent = `${progressPercentage.toFixed(0)}%`;

    // Dynamically position the percentage text inside the blue bar
    progressTextElement.style.left = `calc(${progressPercentage}% - 10px)`; // Offset to keep text inside the bar
}



// Fungsi untuk memeriksa apakah tombol submit bisa diaktifkan
function checkSubmitEligibility() {
    const allAnswered = questions.every((q) => q.answered); // Semua pertanyaan harus dijawab
    const answeredCount = questions.filter((q) => q.answered).length;
    const progressPercentage = (answeredCount / questions.length) * 100;

    // Periksa progres 100% sebelum mengaktifkan tombol
    if (allAnswered && progressPercentage === 100) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// Event listener untuk tombol navigasi
navButtons[0].addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateQuestion();
    }
});

navButtons[1].addEventListener("click", () => {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        updateQuestion();
    }
});

// Event listener untuk tombol skala
// Event listener for scale buttons
// Event listener for scale buttons
scaleButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        // If the question hasn't been answered yet, mark it as answered and save the selected answer
        if (!questions[currentIndex].answered) {
            questions[currentIndex].answered = true;
            questions[currentIndex].selectedAnswer = index; // Save the index of the selected button

            // Highlight the selected button
            scaleButtons.forEach((btn) => {
                const circle = btn.querySelector(".circle");
                circle.classList.remove("selected");
            });

            const circle = button.querySelector(".circle");
            circle.classList.add("selected");

            // Update the progress bar
            updateProgressBar();

            // Automatically go to the next question after a delay
            setTimeout(() => {
                if (currentIndex < questions.length - 1) {
                    currentIndex++;
                    updateQuestion();
                } else {
                    // If it's the last question, check if submit button should be enabled
                    checkSubmitEligibility();
                }
            }, 500); // 500ms delay before moving to the next question
        } else {
            // If the question is already answered, allow changing the answer
            questions[currentIndex].selectedAnswer = index;

            // Highlight the selected button (allow changing the answer)
            scaleButtons.forEach((btn) => {
                const circle = btn.querySelector(".circle");
                circle.classList.remove("selected");
            });

            const circle = button.querySelector(".circle");
            circle.classList.add("selected");

            // Update the progress bar after changing the answer
            updateProgressBar();
        }
    });
});

// Event listener untuk tombol submit
submitButton.addEventListener("click", () => {
    if (!submitButton.disabled) {
        // Alihkan ke halaman terima kasih
        window.location.href = "result.html";
    } else {
        alert("Jawab semua pertanyaan sebelum submit!");
    }
});


// Inisialisasi soal pertama
updateQuestion();
updateProgressBar();

// Fungsi untuk menghitung total poin
function calculateTotalPoints() {
    let totalPoints = 0;

    questions.forEach((question) => {
        if (question.selectedAnswer !== null) {
            // Jawaban dipilih, tambahkan poinnya (index + 1 karena skala mulai dari 1)
            totalPoints += question.selectedAnswer + 1;
        }
    });

    return totalPoints;
}

// Fungsi untuk menentukan diagnosa berdasarkan poin
function getDiagnosis(points) {
    if (points <= 19) {
        return "Anda memiliki tingkat stres rendah. Semuanya tampak baik-baik saja.";
    } else if (points <= 24) {
        return "Anda memiliki tingkat stres sedang. Perhatikan kesejahteraan mental Anda dan coba kelola stres dengan baik.";
    } else if (points <= 29) {
        return "Anda memiliki tingkat stres tinggi. Pertimbangkan untuk mencari dukungan atau berbicara dengan seseorang yang dipercaya.";
    } else {
        return "Anda memiliki tingkat stres sangat tinggi. Disarankan untuk segera mencari bantuan profesional untuk mendiskusikan kondisi Anda.";
    }
}


// Event listener untuk tombol submit
submitButton.addEventListener("click", () => {
    if (!submitButton.disabled) {
        // Hitung total poin
        const totalPoints = calculateTotalPoints();

        // Tentukan diagnosa berdasarkan poin
        const diagnosis = getDiagnosis(totalPoints);

        // Simpan diagnosa di localStorage
        localStorage.setItem("diagnosis", diagnosis);
        localStorage.setItem("totalPoints", totalPoints);

        // Alihkan ke halaman terima kasih
        window.location.href = "result.html";
    } else {
        alert("Jawab semua pertanyaan sebelum submit!");
    }
});

