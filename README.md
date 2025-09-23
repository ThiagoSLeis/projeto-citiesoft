README INICIAL

git clone https://github.com/ThiagoSLeis/projeto-citiesoft.git
cd projeto-citiesoft
criar e ativar ambiente virtual
pip install -r requirements.txt
criar o banco de dados (CREATE DATABASE brisa_db;)
criar arquivo .env (DB_PASSWORD)
python manage.py makemigrations
python manage.py createsuperuser
python manage.py runserver

e pra poder atualizar o codigo todos os dias 
cd projeto-citiesoft
git checkout main
git pull origin main
python manage.py migrate
pip install requirements.txt