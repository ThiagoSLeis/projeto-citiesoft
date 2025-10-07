import re
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import RegistrationForm
<<<<<<< HEAD

def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    
=======
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import views as auth_views



def login_view(request):
>>>>>>> 5422c51b9ec5a8741a037bae8a7ae7915a36aefd
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

<<<<<<< HEAD
=======

>>>>>>> 5422c51b9ec5a8741a037bae8a7ae7915a36aefd
@login_required
def dashboard_view(request):
    return render(request, 'authentication/dashboard.html')

<<<<<<< HEAD
def register_view(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
=======

def register_view(request):
    if request.method == 'POST':
        # 1. Cria uma instância do formulário com os dados enviados (request.POST)
        form = RegistrationForm(request.POST)
        if form.is_valid():
            # Se for válido, salva o novo usuário no banco de dados.
            # O form.save() já cuida de criptografar a senha!
>>>>>>> 5422c51b9ec5a8741a037bae8a7ae7915a36aefd
            form.save()
            messages.success(request, 'Cadastro realizado com sucesso! Por favor, faça o login.')
            return redirect('login')
    else:
        form = RegistrationForm()
<<<<<<< HEAD
    return render(request, 'authentication/register.html', {'form': form})
=======
    return render(request, 'authentication/register.html', {'form': form})

def recuperar_view (request):
    if request.method == 'POST':
        form = PasswordResetForm(request.POST)
        if form.is_valid():
            # O email será mostrado no console
            form.save(
                request=request,
                use_https=request.is_secure(),
                token_generator=default_token_generator,
                email_template_name='auth/email_recuperacao.html',
                subject_template_name='auth/email_recuperacao_assunto.txt'
            )
            return redirect('recuperar_sucesso')
    else:
        form = PasswordResetForm()

    return render(request, 'authentication/recuperar.html')


def resetar_view(request):
    return render(request, 'authentication/resetar.html')

def recuperar_senha(request):
    if request.method == 'POST':
        form = RecuperarSenhaForm(request.POST)
        if form.is_valid():
            # Processar a recuperação de senha aqui
            email = form.cleaned_data['email']
            messages.success(request, 'Instruções para redefinir sua senha foram enviadas para seu e-mail.')
            return redirect('login')
    else:
        form = RecuperarSenhaForm()
    
    return render(request, 'recuperar_senha.html', {'form': form})

def password_reset(request):
    view = auth_views.PasswordResetView.as_view(template_name="authentication/recuperar.html")
    return view(request)

def password_reset_done(request):
    view = auth_views.PasswordResetDoneView.as_view(template_name="authentication/password_reset_done.html")
    return view(request)

#def password_reset_complete(request):
    #view = auth_views.PasswordResetCompleteView.as_view(template_name="authentication/password_reset_complete.html")
   # return view(request)#

def password_reset_confirm(request, uidb64=None, token=None):
    view = auth_views.PasswordResetConfirmView.as_view(
        template_name="authentication/resetar.html",
        success_url=reverse_lazy("password_reset_complete")
    )
    return view(request, uidb64=uidb64, token=token)

def password_reset_complete(request):
    messages.success(request, "Senha redefinida com sucesso! Agora faça login.")
    return redirect("login")
>>>>>>> 5422c51b9ec5a8741a037bae8a7ae7915a36aefd
