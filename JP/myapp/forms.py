# forms.py
from django import forms
from .models import Video
from .models import Comment

class VideoForm(forms.ModelForm):
    class Meta:
        model = Video
        fields = ['title', 'description', 'video_file']

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['text']
