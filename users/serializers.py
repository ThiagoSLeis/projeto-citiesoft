from rest_framework import serializers
from .models import CustomUser


# HyperlinkedModelSerializer, vai adicionar um campo 'url' automaticamente
# que aponta para o detalhe do usuário.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'url', 'id', 'username', 'email', 'first_name', 'last_name',
            'cpf', 'cnpj', 'telefone', 'logradouro', 'bairro',
            'cidade', 'uf', 'password'
        ]
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            },
            # Informamos ao DRF como construir a URL para cada usuário.
            # 'customuser-detail' é o nome padrão que o roteador cria para a rota de detalhe.
            'url': {'view_name': 'customuser-detail', 'lookup_field': 'pk'}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance