from django.contrib import admin
from django.urls import path
from myapp.views import frontend, VideoUploaderViewSet, VideoViewSet
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

# Створюємо маршрутизатор для автоматичного налаштування URL-ів
router = DefaultRouter()
router.register(r'video-uploaders', VideoUploaderViewSet)
router.register(r'videos', VideoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', frontend, name='frontend'),  # Шлях до фронтенду
] + router.urls  # Додаємо URL-адреси для API

# Умовне додавання медіа-статичних файлів тільки в режимі DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
