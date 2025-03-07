from flask import Flask, request, render_template, jsonify
import os
from moviepy.editor import VideoFileClip

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
MAX_DURATION = 5 * 60 


if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route("/")
def upload_form():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_video():
    if "video" not in request.files:
        return jsonify({"error": "Файл не знайдено"}), 400

    file = request.files["video"]
    if file.filename == "":
        return jsonify({"error": "Файл не вибрано"}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

 
    try:
        video = VideoFileClip(filepath)
        duration = video.duration
        video.close()

        if duration > MAX_DURATION:
            os.remove(filepath) 
            return jsonify({"error": "Відео занадто довге! Максимальна тривалість – 5 хвилин."}), 400

        return jsonify({"message": "Відео успішно завантажено!"})

    except Exception as e:
        return jsonify({"error": f"Помилка обробки відео: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
