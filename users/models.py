from django.db import models
from django.contrib.auth.models import AbstractUser
from authentication.validators import validate_cpf


class CustomUser(AbstractUser):
    cpf = models.CharField(max_length=14, unique=True, verbose_name='CPF', validators=[validate_cpf])
    email = models.EmailField(unique=True, verbose_name='E-mail')

    # Define que o campo de login agora será o EMAIL
    USERNAME_FIELD = 'cpf'

    # Lista de campos obrigatórios para criar um superusuário
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        # Se não tiver cpf retorna o username
        return self.cpf or self.username
