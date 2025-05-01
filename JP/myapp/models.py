from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers

# Модель для завантаження відео
class VideoUploader(models.Model):
    name = models.CharField(max_length=50)
    upload = models.FileField(upload_to="videos")

    def __str__(self):
        return self.name

# Серіалізатор для VideoUploader
class VideoUploaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoUploader
        fields = ['name', 'upload']


# Модель для відео
class Video(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    video_file = models.FileField(upload_to='videos/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.text[:30]}"

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['title', 'file', 'uploaded_at']