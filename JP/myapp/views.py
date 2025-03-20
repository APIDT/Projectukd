from django.shortcuts import render, get_object_or_404
from .models import Video

def video_list(request):
    videos = Video.objects.all()
    return render(request, 'myapp/video_list.html', {'videos': videos})

def video_detail(request, pk):
    video = get_object_or_404(Video, pk=pk)
    return render(request, 'myapp/video_detail.html', {'video': video})

def video_create(request):
    return render(request, 'myapp/video_create.html')
