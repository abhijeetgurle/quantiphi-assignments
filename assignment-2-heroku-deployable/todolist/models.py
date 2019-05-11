from django.conf import settings
from django.db import models
from django.utils import timezone

# Create your models here.
class Task(models.Model):
	author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	title = models.TextField()
	status = models.CharField(max_length=200)

	
	def __str__(self):
		return self.title
