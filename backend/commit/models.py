from django.db import models
from userauth.models import User

# Create your models here.

class Commit(models.Model):
    user = models.ForeignKey(User,related_name='commit',on_delete=models.CASCADE)
    commit = models.BooleanField(default=False)
    streak = models.IntegerField()