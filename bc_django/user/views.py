from django.shortcuts import render
from django.http import HttpResponse
from .forms import UserRegisterForm, UserLoginForm, UserPasswordChangeForm, UserChangeNameForm, AuthenticationForm
from django.contrib import messages
from django.contrib.auth import login, logout
from django.shortcuts import redirect

from django.contrib.auth import get_user_model
<<<<<<< HEAD
from django.contrib.auth.views import PasswordResetDoneView
from django.contrib.auth.decorators import login_required
=======
from django.contrib.auth.views import PasswordChangeForm
from django.contrib.auth.views import PasswordResetDoneView
from .forms import UserChangeNameForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
>>>>>>> e7898a0912e0be21476180a89025ea623c5c76c9


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
        form = AuthenticationForm(request, data=request.POST)
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
<<<<<<< HEAD
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
=======
        form = PasswordChangeForm(data=request.POST, user=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your password was successfully updated!')
            return redirect('userpage')
    else:
        form = PasswordChangeForm(user=request.user)

    args = {'form': form}
    return render(request, 'user/change_password.html', args)


@login_required
def change_name(request):
>>>>>>> e7898a0912e0be21476180a89025ea623c5c76c9
    if request.method == 'POST':
        form = UserChangeNameForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
<<<<<<< HEAD
            messages.success(request, 'Your phone was successfully updated!')
            return redirect('login')
    else:
        form = UserChangeNameForm(instance=request.user)
    return render(request, 'user/change_phone.html', {"form": form, "title": "Change phone number"})
=======
            messages.success(request, 'Your name was successfully updated!')
            return redirect('userpage')
    else:
        form = UserChangeNameForm(instance=request.user)

    args = {'form': form}
    return render(request, 'user/change_name.html', args)
>>>>>>> e7898a0912e0be21476180a89025ea623c5c76c9

