from django.shortcuts import render

# Create your views here.
def show_tasks(request):
    return render(request, 'todolist/index.html', {})