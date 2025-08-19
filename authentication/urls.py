from django.urls import path
from . import views

app_name = 'authentication'

urlpatterns = [
    # Quando o usuário acessar a URL raiz do nosso site (''),
    # execute a função login_view
    path('', views.login_view, name='login'),
]
