import re 
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required


def login_view(request):
    if request.method == 'POST':
        cpf_com_formatacao = request.POST.get('cpf')
        password = request.POST.get('password')

        if not cpf_com_formatacao:
            messages.error(request, 'Por favor, digite seu CPF.')
            return render(request, 'authentication/login.html')

        # Limpa a formatação do CPF, deixando apenas os números
        cpf_limpo = ''.join(re.findall(r'\d', cpf_com_formatacao))

        # Usa o CPF limpo para autenticar
        user = authenticate(request, cpf=cpf_limpo, password=password)

        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.error(request, 'CPF ou senha inválidos.')
            return render(request, 'authentication/login.html')

    return render(request, 'authentication/login.html')


@login_required
def dashboard_view(request):
    return render(request, 'authentication/dashboard.html')