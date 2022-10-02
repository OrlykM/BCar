from django.shortcuts import render
from django.http import HttpResponse
from .forms import UserRegisterForm, UserLoginForm
from django.contrib import messages
from django.contrib.auth import login, logout
from django.shortcuts import redirect

# Create your views here.

def userpage(request):
    return render(request, 'user/userpage.html')

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Register complete')
            return redirect('https://youtu.be/dQw4w9WgXcQ')
    else:
        form = UserRegisterForm()
    return render(request, 'user/register.html', {"form": form})

def user_login(request):
    if request.method == 'POST':
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('')
    else:
        form = UserLoginForm()
    return render(request, 'user/login.html', {"form": form})

def user_logout(request):
    logout(request)
    return redirect('')