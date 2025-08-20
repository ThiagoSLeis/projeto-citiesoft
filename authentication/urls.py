from django.urls import path
# Garanta que AMBAS as views estão sendo importadas
from .views import login_view, dashboard_view

urlpatterns = [
    # A URL de login que já tínhamos
    path('', login_view, name='login'),

    # A URL do dashboard que estava faltando
    path('dashboard/', dashboard_view, name='dashboard'),
]
