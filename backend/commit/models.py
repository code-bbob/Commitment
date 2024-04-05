from django.db import models
from userauth.models import User
import datetime
import uuid

# Create your models here.

class Commit(models.Model):
    COMMIT_TYPE_PERSONAL = "Personal"
    COMMIT_TYPE_GROUP = "Group"
    COMMIT_TYPE_Public = "Public"
    type_choices = [
        (COMMIT_TYPE_PERSONAL,"Personal"),
        (COMMIT_TYPE_GROUP,"Group"),
        (COMMIT_TYPE_Public,"Public"),
    ]
    type=models.CharField(max_length=10,choices=type_choices,default=COMMIT_TYPE_PERSONAL)
    user = models.ForeignKey(User, related_name='commit', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    code = models.UUIDField(default=uuid.uuid4)
    date = models.DateField(default=datetime.date.today)
    likes = models.ManyToManyField(User, related_name='commit_likes', blank=True)

    def __str__(self):
        return f"{self.title} at {self.date}"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # # Check if the commit type is 'group'
        # if self.type == Commit.COMMIT_TYPE_GROUP:
        #     # Add this commit to all related groups
        #     groups = Group.objects.filter(user=self.user,)
        #     for group in groups:
        #         group.commit.add(self)

class Group(models.Model):
    name= models.CharField(max_length=30)
    members = models.ManyToManyField(User)
    code = models.UUIDField(default=uuid.uuid4)
    commit = models.ManyToManyField(Commit)
    dp = models.ImageField(upload_to='commit/groups/images', default='')
    def __str__(self):
        return self.name    