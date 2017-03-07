from __future__ import unicode_literals
from django.db import models
from datetime import datetime
import bcrypt
import re

# Create your models here.

#regex
NAME_REGEX = re.compile(r'^[a-zA-Z]*$')
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
PASSWORD_REGEX = re.compile(r'^[a-zA-Z0-9]{8,}$')

### WORK FLOW ###
# create a function to validate registration form
# create a boolean to determine if the field requeriment has been met or not, start with True
# create a variable (any name) with an empty list to keep track of all errors
# if statment scenario for different edge cases 
# append error message ('string')
# determine if validation is true or false  

class UserManager(models.Manager):
### VALIDATE REGISTRATION FORM ###
	# argument self and other variable
	def validRegistration(self, user_info):
		valid = True
		errors = []

		## VALIDATE NAME ##

		# name field can't be empty
		if len(user_info['name']) < 1:
			errors.append('Please enter your name')
			valid = False
		# name needs to more than 2 letters long
		if len(user_info['name']) < 2:
			errors.append("Name needs to be at least two letters long")
			valid = False
		# name must match regex requiments (only letters)
		if not NAME_REGEX.match(user_info['name']) and len(user_info['name']) > 2:
			errors.append("Name most only contain letters")
			valid = False

		## VALIDATE ALIAS ##

		# name field can't be empty
		if len(user_info['alias']) < 1:
			errors.append('Please enter you alias')
			valid = False
		# name needs to more than 2 letters long
		if len(user_info['alias']) < 2:
			errors.append("Alias needs to be at least two letters long")
			valid = False
		# name must match regex requiments (only letters)
		if not NAME_REGEX.match(user_info['alias']) and len(user_info['alias']) > 2:
			errors.append("Name most only contain lettres")
			valid = False


		## VALIDATE EMAIL ##

		# email field can't be empty
		if len(user_info['email']) < 1:
			errors.append("Please enter your email")
			valid = False
		# email must match regex requiments (example@test.com)
		if not EMAIL_REGEX.match(user_info['email']) and len(user_info['email']) > 1:
			errors.append("Invalid email. Please make sure your email is in the correct format")
			valid = False
		# check to see if email has not been registered before
		if len(self.filter(email=user_info['email'])) > 0:
			errors.append("Email already exists. Please login or choose a new email to register")
			valid = False

		## VALIDATE PASSWORD ##

		# password field can't be empty
		if len(user_info['password']) < 1:
			errors.append("Password field can't be blank.")
			valid = False
		# password must be at least 8 characters
		if len(user_info['password']) < 8:
			errors.append('Password must contain at least 8 characters.')
			valid = False
		# max length of password is 16 characters 
		if len(user_info['password']) > 16:
			errors.append('Password must be 16 characters or less!')
			valid = False

		## VALIDATE PASSWORD CONFIRMATION ##

		# password conf must match password
		if user_info['password'] != user_info['confirm_password']:
			errors.append('Passwords do not match.')
			valid = False

		## VALIDATE BIRTHDAY ##
		try:
			dob = datetime.strptime(user_info['birthday'], '%m/%d/%Y')
			print(dob)
		except ValueError:
			errors.append("Invalid date of birth entered. Use mm/dd/yyyy format")
			valid = False
		else:
			if datetime.now() < dob:
				errors.append("Are you sure you were born in the future?")


		# if registration form does not meet requirements (valid = false), return all error messages
		if valid == False:
			return (valid, errors)
		# if no mistakes, then encrypt the password and create a new user in the database
		else:
			psw = user_info['password'].encode()
			pwhashed = bcrypt.hashpw(psw, bcrypt.gensalt())
			new_user = self.create(name=user_info['name'], alias=user_info['alias'], email=user_info['email'], password = pwhashed, birthday=dob)
			return (valid, new_user)


### VALIDATE LOGIN FORM ###
	def validLogin(self, user_info):
		valid = True
		mistakes = []

		the_user = User.objects.filter(email = user_info['email'])

		# email field can't be empty
		if len(user_info['email']) < 1:
			mistakes.append("Please enter your email")
			print ("8" * 30)

		# password field can't be empty
		if len(user_info['password']) < 1:
			mistakes.append("Please enter your password")

		# if the user exists in the database 
		if len(the_user) > 0:
			hashed = User.objects.get(email = user_info['email']).password.encode('utf-8')
			password = user_info['password'].encode('utf-8')
			if bcrypt.hashpw(password, hashed) == hashed:
				valid = True
				return (valid, the_user[0])
			else:
				mistakes.append("Incorrect login credentials. Please try again")
				valid = False
		else:
			mistakes.append("Unsuccessful login.")
			valid = False
		return (valid, mistakes)

###########################################################
# Adding friends

	#check db to see if friend has been added (llok for friend and id)
	def addFriend(self, id, friend_id):
		if len(User.objects.filter(friends=friend_id, id=id)) > 0:
			return {'errors': 'This has already been added'}
		else:
			add = self.get(id=id)
			print "@" * 30, add
			add_friend = self.get(id = friend_id)
			add_friend.friends.add(add)
			return {}
			
# Remove friend
	# check to see id to see if friend has been removed
	# get id and remove from friends column
	def removeFriend(self, id, friend_id):
		if len(User.objects.filter(friends=friends_id, id=id)) == 0:
			return {'error': 'This friend has been removed already'}
		else:
			remove = self.get(id=id)
			remove_friend = self.get(id = friend_id)
			remove_friend.friends.remove(remove_friend)
			return {}


class User(models.Model):
	name = models.CharField(max_length=45)
	alias = models.CharField(max_length=45)
	email = models.EmailField(max_length=45)
	password = models.CharField(max_length=45)
	birthday = models.DateTimeField()
	friends = models.ManyToManyField('self')
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	objects = UserManager()



