#views.py

from django.shortcuts import render, redirect, get_object_or_404
from .forms import UsuarioForm
from .models import Usuario
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .forms import UsuarioForm
from django.contrib.auth.decorators import  login_required

# Create your views here.
def index(request):
    context = {}
    return render(request,'pages/index.html', context)

def tienda(request):
    context = {}
    return render(request,'pages/tienda.html', context)

def ayuda(request):
    context = {}
    return render(request,'pages/ayuda.html', context)

def apiLibros(request):
    context = {}
    return render(request,'pages/api-libros.html', context)

def carro(request):
    context = {}
    return render(request,'pages/carro.html', context)

def clasicos(request):
    context = {}
    return render(request,'pages/clasicos.html', context)

def cocina(request):
    context = {}
    return render(request,'pages/cocina.html', context)

def infantil(request):
    context = {}
    return render(request,'pages/infantil.html', context)

def logInForm(request):
    context = {}
    return render(request,'pages/logInForm.html', context)

def registro(request):

    if request.method == 'POST':
        form = UsuarioForm(request.POST)
        if form.is_valid():
            form.save()  # Guarda el formulario en la base de datos
            #return redirect('index')  # Redirige a la página de inicio o a donde desees
    else:
        form = UsuarioForm()

    context = {'form': form}
    return render(request, 'pages/registro.html', context)


def pago(request):
    context = {}
    return render(request,'pages/pago.html', context)


def crud(request):
    usuarios = Usuario.objects.all()
    context = {
        "usuarios": usuarios,
    }
    return render(request, 'pages/Crud.html', context)

def usuario_editar(request,pk):
    if pk!="":
        usuario = User.objects.get(rut=pk)

        context={
            "usuario":usuario,
        }
        return render(request,"pages/Formulario_editar.html",context)
    else:
        usuarios = User.objects.all()
        context={
            "mensaje": "Error, Rut no encontrado",
            "usuarios":usuarios,
        }
        return render(request,"pages/Crud.html",context)


# hacer lo mismo con las demas paginas html
