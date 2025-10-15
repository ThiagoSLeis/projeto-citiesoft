from django.urls import path
from .views import login_view, dashboard_view, register_view, password_reset, password_reset_done, password_reset_complete
from django.contrib.auth import views as auth_views
# authentication/urls.py
from . import views



urlpatterns = [
    path('', login_view, name='login'),
    path('dashboard/', dashboard_view, name='dashboard'),
    path('register/', register_view, name='register'),
    path('password_reset/', password_reset, name='password_reset'),
    path('password_reset/done/', password_reset_done, name='password_reset_done'),
    path('reset/<uidb64>/<token>/',auth_views.PasswordResetConfirmView.as_view(template_name="authentication/password_reset_confirm.html"),name='password_reset_confirm' ),
    path('reset/done/', password_reset_complete, name='password_reset_complete'),
    path('register/', views.register_view, name='url_de_registro'),
    
    
            ]
