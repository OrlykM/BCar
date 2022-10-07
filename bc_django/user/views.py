from django.shortcuts import render
from django.http import HttpResponse
from .forms import UserRegisterForm, UserLoginForm, UserPasswordChangeForm, UserChangeNameForm
from django.contrib import messages
from django.contrib.auth import login, logout
from django.shortcuts import redirect

from django.contrib.auth import get_user_model
from django.contrib.auth.views import PasswordResetDoneView
from django.contrib.auth.decorators import login_required


# Create your views here.

def userpage(request):
    user = get_user_model()
    users = request.user
    return render(request, 'user/userpage.html', {'res': users})


def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Register complete')
            return redirect('login')
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


# user profile
@login_required
def change_password(request):
    if request.method == 'POST':
        form = UserPasswordChangeForm(data=request.POST, user=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your password was successfully updated!')
            return redirect('login')
    else:
        form = UserPasswordChangeForm(user=request.user)
    return render(request, 'user/change_password.html', {"form": form, "title": "Change password"})

@login_required
def change_phone(request):
    if request.method == 'POST':
        form = UserChangeNameForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your phone was successfully updated!')
            return redirect('login')
    else:
        form = UserChangeNameForm(instance=request.user)
    return render(request, 'user/change_phone.html', {"form": form, "title": "Change phone number"})

