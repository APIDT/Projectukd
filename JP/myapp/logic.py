'''
`#Бібліотеки
from django.db import models
from moviepy.editor import VideoFileClip
from django.core.exceptions import ValidationError

# Функція для перевірки тривалості відео
def validate_video_duration(video):
    try:
        clip = VideoFileClip(video.temporary_file_path())
        duration = clip.duration
        clip.close()
        if duration > 180:  # 3 хв
            raise ValidationError("Тривалість відео не повинна перевищувати 3 хвилини.")
    except Exception:
        raise ValidationError("Не вдалося перевірити тривалість відео.")

# Модель для збереження відео
class Video(models.Model):
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to="videos/", validators=[validate_video_duration])
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    '''