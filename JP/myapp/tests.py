from django.test import TestCase
from .models import VideoUploader

class VideoUploaderTest(TestCase):
    def test_video_uploader_creation(self):
        video = VideoUploader.objects.create(name="Test Video", upload="path/to/video.mp4")
        self.assertEqual(video.name, "Test Video")
        self.assertTrue(video.upload.name.endswith("video.mp4"))
