from django.shortcuts import render
from django.http import *
from django.contrib.auth import authenticate, login, logout
from .models import Task
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages

# Create your views here.
# View to login user
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
		else:
			messages.error(request,'Username or Password not correct')
			return HttpResponseRedirect('/')		

	return render(request, 'todolist/login.html', {})


# View to logout user
def logout_user(request):
	logout(request)
	return HttpResponseRedirect('/')


# View to signup user
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
			messages.error(request,'Failed to Signup. Please make sure you have matched all criteria.')
			return HttpResponseRedirect('/signup')	
	
	else:
		form = UserCreationForm()
	return render(request, 'todolist/signup.html', {'form': form})


# View to show all tasks based on loggedIn user 
def show_tasks(request):

	if request.user.is_authenticated:
		tasks = Task.objects.filter(author = request.user).values('title', 'status')
		return render(request, 'todolist/index.html', {'tasks': tasks, 'current_user': request.user})
	else:
		return HttpResponseRedirect('/')


# View to add task to database
@csrf_exempt
def add_task(request):
	
	if request.POST:
		title = request.POST['title']
		status = request.POST['status']

		if request.user.is_authenticated:
			author = request.user
			task = Task(author = request.user, title = title, status = status);
			task.save()
			return HttpResponse("Sucess")

	return HttpResponse("Failed")


# View to update status of task
@csrf_exempt
def update_status(request):
	
	if request.POST:
		title = request.POST['title']
		status = request.POST['status']

		if request.user.is_authenticated:
			author = request.user
			print(title)
			print(Task.objects.filter(author = request.user, title = title))
			task = Task.objects.get(author = request.user, title = title)
			task.status = status
			task.save()
			return HttpResponse("Sucess")

	return HttpResponse("Failed")			


# View to delete task in database
@csrf_exempt
def delete_task(request):

	if request.POST:
		task = request.POST['task']

		if request.user.is_authenticated:
			Task.objects.filter(author = request.user, title = task).delete()
			return HttpResponse("Sucess")

	return HttpResponse("Failed")	
