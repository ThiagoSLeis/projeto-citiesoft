import re
from django.core.exceptions import ValidationError


def validate_cpf(value):
    # Limpa o valor, deixando apenas os dígitos
    cpf = ''.join(re.findall(r'\d', str(value)))

    if len(cpf) != 11:
        raise ValidationError('O CPF deve ter 11 dígitos.', code='invalid_length')

    if cpf == cpf[0] * 11:
        raise ValidationError('CPF inválido (todos os dígitos são iguais).', code='all_digits_equal')

    # Cálculo do primeiro digito
    soma = sum(int(cpf[i]) * (10 - i) for i in range(9))
    resto = 11 - (soma % 11)
    digito_1 = 0 if resto > 9 else resto

    # Cálculo do segundo dígito
    soma = sum(int(cpf[i]) * (11 - i) for i in range(10))
    resto = 11 - (soma % 11)
    digito_2 = 0 if resto > 9 else resto

    if not (digito_1 == int(cpf[9]) and digito_2 == int(cpf[10])):
<<<<<<< HEAD
        raise ValidationError('CPF inválido (dígitos verificadores não conferem).', code='invalid_check_digits')
=======
        raise ValidationError('CPF inválido (dígitos verificadores não conferem).', code='invalid_check_digits')
    
    
>>>>>>> 5422c51b9ec5a8741a037bae8a7ae7915a36aefd
