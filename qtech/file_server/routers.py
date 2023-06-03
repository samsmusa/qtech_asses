from rest_framework.routers import DefaultRouter
from file_server.views import FileManagerViewSet

router = DefaultRouter()
router.register(r'files', FileManagerViewSet, basename='filemanager')
