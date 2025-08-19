from django.shortcuts import render


# Create your views here.


def login_view(request):
    # view sem lógica apenas para visualizar
    # render e return template
    return render(request, 'authentication/login.html')
