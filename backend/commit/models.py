from django.db import models
from userauth.models import User
from django.utils import timezone

# Create your models here.

class Commit(models.Model):
    user = models.ForeignKey(User, related_name='commit', on_delete=models.CASCADE)
    commit = models.BooleanField(default=False)
    date = models.DateField(default=timezone.now)