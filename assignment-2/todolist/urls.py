from django.urls import path
from . import views

urlpatterns = [
	path('', views.login_user, name='login_user'),
	path('logout_user', views.logout_user, name='logout_user'),
	path('signup', views.signup, name='signup'),
    path('index', views.show_tasks, name='show_tasks'),
    path('add', views.add_task, name='add_task'),
    path('delete', views.delete_task, name='delete_task'),
]
