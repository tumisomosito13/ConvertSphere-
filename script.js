// ConvertSphere JavaScript

console.log("ConvertSphere is running!");

// Theme button
const themeBtn = document.querySelector(".theme");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }
});

// File upload
const fileInput = document.querySelector('input[type="file"]');

fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        alert("Selected file: " + fileInput.files[0].name);
    }
});

// Convert button
const convertBtn = document.querySelector(".convert-btn");

convertBtn.addEventListener("click", () => {
    if (fileInput.files.length === 0) {
        alert("Please choose a file first.");
        return;
    }

    alert("Conversion feature coming soon!");
});