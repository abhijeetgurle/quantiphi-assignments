from django.shortcuts import render
from django.http import *
from django.contrib.auth import authenticate, login, logout
from .models import Task
from django.contrib.auth.forms import UserCreationForm

# Create your views here.
def login_user(request):
	username = password = ''
	if request.POST:
		username = request.POST['username']
		password = request.POST['password']
		user = authenticate(username=username, password=password)
		if user is not None:
			if user.is_active:
				login(request, user)
				return HttpResponseRedirect('/index')

	return render(request, 'todolist/login.html', {})


def logout_user(request):
	logout(request)
	return HttpResponseRedirect('/')


def signup(request):
	if request.method == 'POST':
		form = UserCreationForm(request.POST)
		if form.is_valid():
			form.save()
			username = form.cleaned_data.get('username')
			raw_password = form.cleaned_data.get('password1')
			user = authenticate(username=username, password=raw_password)
			login(request, user)
			return HttpResponseRedirect('/index')
	else:
		form = UserCreationForm()
	return render(request, 'todolist/signup.html', {'form': form})


def show_tasks(request):

	if request.user.is_authenticated:
		tasks = Task.objects.filter(author = request.user)
		return render(request, 'todolist/index.html', {'tasks': tasks, 'current_user': request.user})
	else:
		return HttpResponseRedirect('/')	