import re
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import RegistrationForm


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
        user = authenticate(request, username=cpf_limpo, password=password)

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


def register_view(request):
    if request.method == 'POST':
        # 1. Cria uma instância do formulário com os dados enviados (request.POST)
        form = RegistrationForm(request.POST)
        if form.is_valid():
            # Se for válido, salva o novo usuário no banco de dados.
            # O form.save() já cuida de criptografar a senha!
            form.save()
            messages.success(request, 'Cadastro realizado com sucesso! Por favor, faça o login.')
            return redirect('login')
    else:
        form = RegistrationForm()
    return render(request, 'authentication/register.html', {'form': form})
