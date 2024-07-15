#urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('',           views.index, name='index'),
    path('tienda/',    views.tienda, name='tienda'),
    path('apiLibros/', views.apiLibros, name='apiLibros'),
    path('ayuda/',     views.ayuda, name='ayuda'),
    path('carro/',     views.carro, name='carro'),
    path('clasicos/', views.clasicos, name='clasicos'),
    path('cocina/',    views.cocina, name='cocina'),
    path('infantil/',  views.infantil, name='infantil'),
    path('logInForm/', views.logInForm, name='logInForm'),
    path('registro/', views.registro, name='registro'),
    path('pago/',      views.pago, name='pago'),
    path('crud/',      views.crud, name='crud'),
    

    # hacer lo mismo con las demas paginas html
]