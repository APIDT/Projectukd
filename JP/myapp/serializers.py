from rest_framework import serializers
from .models import VideoUploader, Video

class VideoUploaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoUploader
        fields = ['name', 'upload'] 

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['title', 'file', 'uploaded_at'] 
