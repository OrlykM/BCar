from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.forms import UserChangeForm
<<<<<<< HEAD
from django.contrib.auth.forms import PasswordChangeForm
=======
>>>>>>> e7898a0912e0be21476180a89025ea623c5c76c9
from django.contrib.auth.models import User


class UserRegisterForm(UserCreationForm):
<<<<<<< HEAD
    username = forms.CharField(label='Phone number', widget=forms.TextInput(
=======
    username = forms.CharField(label='Username', widget=forms.TextInput(
>>>>>>> e7898a0912e0be21476180a89025ea623c5c76c9
        attrs={'class': 'form-control'}))
    email = forms.EmailField(label='Email', widget=forms.EmailInput(
        attrs={'class': 'form-control'}))
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput(
        attrs={'class': 'form-control'}))
    password2 = forms.CharField(label='Repeat password',
                                widget=forms.PasswordInput(
                                    attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')


class UserLoginForm(AuthenticationForm):
<<<<<<< HEAD
    username = forms.CharField(label='Phone number', widget=forms.TextInput(
=======
    username = forms.CharField(label='Username', widget=forms.TextInput(
>>>>>>> e7898a0912e0be21476180a89025ea623c5c76c9
        attrs={'class': 'form-control'}))
    password = forms.CharField(label='Password', widget=forms.PasswordInput(
        attrs={'class': 'form-control'}))


class UserChangeNameForm(forms.ModelForm):
<<<<<<< HEAD
    username = forms.CharField(label='Phone number', widget=forms.TextInput(
        attrs={'class': 'form-control'}))
    class Meta:
        model = User
        fields = ['username']

class UserPasswordChangeForm(PasswordChangeForm):
    old_password = forms.CharField(label='Old password', widget=forms.PasswordInput(
        attrs={'class': 'form-control'}))
    new_password1 = forms.CharField(label='New password', widget=forms.PasswordInput(
        attrs={'class': 'form-control'}))
    new_password2 = forms.CharField(label='Confirm new password', widget=forms.PasswordInput(
        attrs={'class': 'form-control'}))
    class Meta:
        model = User
        fields = ['old_password', 'new_password1', 'new_password2']
=======
    username = forms.CharField(label='Username', widget=forms.TextInput(
        attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ['username']
>>>>>>> e7898a0912e0be21476180a89025ea623c5c76c9
