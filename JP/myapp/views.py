from django.shortcuts import render, get_object_or_404, redirect
from .models import Video, Comment
from .forms import CommentForm
from django.contrib.auth.decorators import login_required

def video_list(request):
    videos = Video.objects.all()
    return render(request, 'myapp/video_list.html', {'videos': videos})

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

def video_create(request):
    return render(request, 'myapp/video_create.html')
