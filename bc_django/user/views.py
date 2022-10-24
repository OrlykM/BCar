from django.http import HttpResponse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.shortcuts import render, redirect

from django.contrib import messages
from django.contrib.auth import login, logout, get_user_model
from django.contrib.auth.views import PasswordResetDoneView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site

from django.core.mail import send_mail, BadHeaderError, EmailMessage
from django.db.models.query_utils import Q
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.utils.safestring import mark_safe

from .forms import UserRegisterForm, UserLoginForm, UserPasswordChangeForm, UserChangePhoneForm, UserPasswordResetForm
from .models import CustomUser
from .tokens import account_activation_token

# Create your views here.

def userpage(request):
    user = get_user_model()
    users = request.user
    return render(request, 'user/userpage.html', {'res': users, 'title': 'Userpage'})
def user_register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.is_active = False
            user.save()
            activateEmail(request, user, form.cleaned_data.get('email'))
            # messages.success(request, 'Register complete')
            return redirect('')
    else:
        form = UserRegisterForm()
    return render(request, 'user/register.html', {"form": form, 'title': 'Register'})
def user_login(request):
    if request.method == 'POST':
        form = UserLoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('')
    else:
        form = UserLoginForm()
    return render(request, 'user/login.html', {"form": form, 'title': 'Login'})
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
        form = UserChangePhoneForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your phone was successfully updated!')
            return redirect('login')
    else:
        form = UserChangePhoneForm(instance=request.user)
    return render(request, 'user/change_phone.html', {"form": form, "title": "Change phone number"})

#activate account after registration
def activateEmail(request, user, to_email):
    mail_subject = 'Activate your user account.'
    message = render_to_string('user/activate_account.txt', {
        'user': user.username,
        'domain': get_current_site(request).domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
        'protocol': 'https' if request.is_secure() else 'http'
    })
    email = EmailMessage(mail_subject, message, to=[to_email])
    if email.send():
        messages.success(request, mark_safe(
            f'Dear <b>{user}</b>, please go to you email '
            f'<b>{to_email}</b> inbox and click on '
            f' received activation link to confirm and complete'
            f'  the registration. <b>Note:</b> Check '
            f'your spam folder.'))
    else:
        messages.error(request,
                       f'Problem sending confirmation email to {to_email},'
                       f' check if you typed it correctly.')
def activate(request, uidb64, token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except:
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()

        messages.success(request,
                         f'Thank you for your email confirmation. Now you can '
                         f'login your account.')
        return redirect('')
    else:
        messages.error(request, 'Activation link is invalid!')

    return redirect('')

#reset password (register page)
def password_reset_request(request):
    if request.method == "POST":
        form = UserPasswordResetForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data['email']
            associated_users = CustomUser.objects.filter(Q(email=data))
            if associated_users.exists():
                for user in associated_users:
                    subject = "Password Reset Requested"
                    email_template_name = "user/password/password_reset_email.txt"  # template name
                    c = {
                        "email": user.email,
                        'domain': '127.0.0.1:8000',
                        'site_name': 'Website',
                        "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                        "user": user,
                        'token': default_token_generator.make_token(user),
                        'protocol': 'http',
                    }
                    email = render_to_string(email_template_name, c)
                    try:
                        send_mail(subject, email,
                                  'carsharing_project1@example.com',
                                  [user.email], fail_silently=False)
                    except BadHeaderError:
                        return HttpResponse('Invalid header found.')
                    return redirect('password_reset_done')
    form = UserPasswordResetForm()
    return render(request, "user/password/password_reset.html", {"form": form})