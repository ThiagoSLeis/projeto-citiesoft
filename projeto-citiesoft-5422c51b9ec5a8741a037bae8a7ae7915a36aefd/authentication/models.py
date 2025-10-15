from django.db import models
# authentication/models.py

class Usuario(models.Model):
    nome = models.CharField(max_length=150)
    email = models.EmailField(unique=True) # unique=True impede emails repetidos
    senha = models.CharField(max_length=150) # ATENÇÃO: Em um projeto real, nunca salve a senha assim. Use o sistema de usuários do Django.

    def __str__(self):
        return self.email
# Create your models here.
