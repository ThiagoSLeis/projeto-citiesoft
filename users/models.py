from django.db import models
from django.contrib.auth.models import AbstractUser
from authentication.validators import validate_cpf

class CustomUser(AbstractUser):
    cpf = models.CharField(max_length=14, unique=True, verbose_name='CPF', validators=[validate_cpf])
    email = models.EmailField(unique=True, verbose_name='E-mail')
    telefone = models.CharField('Telefone', max_length=15, blank=True, null=True)
    cnpj = models.CharField('CNPJ', max_length=18, unique=True, blank=True, null=True)
    logradouro = models.CharField('Logradouro', max_length=150, blank=True, null=True)
    bairro = models.CharField('Bairro', max_length=100, blank=True, null=True)
    cidade = models.CharField('Cidade', max_length=100, blank=True, null=True)
    uf = models.CharField('UF', max_length=2, blank=True, null=True)
    USERNAME_FIELD = 'cpf'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'email']

    def __str__(self):
        return self.cpf or self.username
# teste