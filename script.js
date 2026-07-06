// ConvertSphere JavaScript

console.log("ConvertSphere is running!");

// Theme button
const themeBtn = document.querySelector(".theme");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            themeBtn.textContent = "☀️";
        } else {
            themeBtn.textContent = "🌙";
        }
    });
}

// File selection
const fileInput = document.getElementById("videoFile");

if (fileInput) {
    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            alert("Selected file: " + fileInput.files[0].name);
        }
    });
}

// Upload and convert video
async function uploadVideo() {
    alert("Convert button clicked!");

    const fileInput = document.getElementById("videoFile");
    const status = document.getElementById("uploadStatus");

    if (!fileInput || fileInput.files.length === 0) {
        status.innerHTML = "Please choose a video first.";
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    status.innerHTML = "Converting video...";

    try {
        const response = await fetch(CONFIG.API_URL + "/convert/mp4-to-mp3", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Conversion failed");
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "converted.mp3";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        status.innerHTML = "✅ Conversion completed!";
    } catch (error) {
        console.error(error);
        status.innerHTML = "❌ Conversion failed.";
    }
            }
