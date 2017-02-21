from __future__ import unicode_literals
from django.contrib import messages
from django.db import models
import re

# Create your models here.
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

class UserManager(models.Manager):
	def validEmail(self, email):
		if len(email) > 6 and EMAIL_REGEX.match(email):
			return True
		else:
			return False


class Email(models.Model):
	email = models.CharField(max_length=45)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	object = UserManager()
		