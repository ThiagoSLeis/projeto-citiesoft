import re
from django import forms
<<<<<<< HEAD
=======
from django.contrib.auth.models import User
>>>>>>> 5422c51b9ec5a8741a037bae8a7ae7915a36aefd
from users.models import CustomUser
from .validators import validate_cpf


class RegistrationForm(forms.ModelForm):
    password = forms.CharField(
        label='Senha',
        # Dica para o usuário sobre as novas regras da senha
        widget=forms.PasswordInput(attrs={'placeholder': 'Mínimo 8 caracteres, com letras e números'})
    )
    password2 = forms.CharField(
        label='Confirmação de Senha', 
        widget=forms.PasswordInput(attrs={'placeholder': 'Confirme sua senha'})
    )

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'username', 'email', 'cpf')

    # Validação da força da senha
    def clean_password(self):
        password = self.cleaned_data.get('password')
<<<<<<< HEAD

=======
>>>>>>> 5422c51b9ec5a8741a037bae8a7ae7915a36aefd
        if len(password) < 8:
            raise forms.ValidationError('A senha deve ter no mínimo 8 caracteres.')
        if not re.search(r'[A-Z]', password):
            raise forms.ValidationError('A senha deve conter pelo menos uma letra maiúscula.')
        if not re.search(r'[a-z]', password):
            raise forms.ValidationError('A senha deve conter pelo menos uma letra minúscula.')
        if not re.search(r'[0-9]', password):
            raise forms.ValidationError('A senha deve conter pelo menos um número.')
            
        return password
    
    def clean_password2(self):
        cd = self.cleaned_data
        # Caso a primeira seja invalida
        if 'password' in cd and cd['password'] != cd['password2']:
            raise forms.ValidationError('As senhas não correspondem.')
        return cd['password2']

    def clean_cpf(self):
        cpf = self.cleaned_data.get('cpf')
        cpf_limpo = ''.join(re.findall(r'\d', str(cpf)))
        validate_cpf(cpf_limpo)
        return cpf_limpo

    def save(self, commit=True):
        # A limpeza do CPF já acontece no clean_cpf, então o ModelForm já usa a versão limpa.
        # Não precisa mais limpar o CPF aqui.
        user = super().save(commit=False)
        
        # A forma mais segura de definir a senha é com set_password
        user.set_password(self.cleaned_data['password'])

        if commit:
            user.save()
<<<<<<< HEAD
            
        return user
=======

        return user
>>>>>>> 5422c51b9ec5a8741a037bae8a7ae7915a36aefd
