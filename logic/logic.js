document.getElementById("videoInput").addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (file) {
        const video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = function() {
            window.URL.revokeObjectURL(video.src);

            const duration = video.duration; // Отримуємо тривалість відео в секундах
            const maxDuration = 5 * 60; // 5 хвилин у секундах

            if (duration > maxDuration) {
                alert("Відео занадто довге! Максимальна тривалість – 5 хвилин.");
                event.target.value = ""; // Очищаємо вибір файлу
            }
        };

        video.src = URL.createObjectURL(file);
    }
});
