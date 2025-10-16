from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet

# O Roteador gera as URLs para nós automaticamente.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
