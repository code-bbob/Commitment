from django.db import models
from userauth.models import User
from django.utils import timezone
import uuid

# Create your models here.

class Commit(models.Model):
    type_choices = [
        ("Personal","Personal"),
        ("Group","Group"),
        ("Public","Public"),
    ]
    type=models.CharField(max_length=10,choices=type_choices,default="Personal")
    user = models.ForeignKey(User, related_name='commit', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.user} at {self.date}"

class Group(models.Model):
    name= models.CharField(max_length=30)
    user = models.ManyToManyField(User)
    join_code = models.UUIDField(default=uuid.uuid4)
    commit = models.ManyToManyField(Commit)
    
    def __str__(self):
        return self.name    