from django.contrib import admin
from .models import Commit,Group

# Register your models here.

class CommitAdmin(admin.ModelAdmin):
    ordering = ['-date']

admin.site.register(Commit,CommitAdmin)
admin.site.register(Group)