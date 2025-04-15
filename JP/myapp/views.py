<<<<<<< Updated upstream
from django.shortcuts import render, get_object_or_404, redirect
from .models import Video, Comment
from .forms import CommentForm
from django.contrib.auth.decorators import login_required
=======
﻿from django.shortcuts import render
from .models import Video
from django.http import JsonResponse
from rest_framework import viewsets
from .models import VideoUploader, Video
from .serializers import VideoUploaderSerializer, VideoSerializer
# Create your views here.
>>>>>>> Stashed changes

def index(request):
    videos = Video.objects.all()
    context = {
        'videos' :videos
    }
    return render(request,'index.html',context)

<<<<<<< Updated upstream
def video_detail(request, pk):
    video = get_object_or_404(Video, pk=pk)
    comments = video.comments.all() 

    if request.method == "POST":
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.video = video
            comment.user = request.user
            comment.save()
            return redirect('video_detail', pk=video.pk)
    else:
        form = CommentForm()

    return render(request, 'myapp/video_detail.html', {'video': video, 'comments': comments, 'form': form})
=======
def all_videos(request):
    videos = list(Video.objects.values())  # перетворює queryset у список словників
    return JsonResponse(videos, safe=False)
>>>>>>> Stashed changes

def frontend(request):
    return render(request, 'myapp/front/build/index.html')

class VideoUploaderViewSet(viewsets.ModelViewSet):
    queryset = VideoUploader.objects.all()
    serializer_class = VideoUploaderSerializer

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
