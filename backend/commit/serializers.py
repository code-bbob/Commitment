from rest_framework import serializers
from .models import Commit
from userauth.serializers import UserInfoSerializer

class CommitSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = Commit
        fields = '__all__'
    def get_user(self,obj):
        return obj.user.name


class GroupSerializer(serializers.ModelSerializer):
    pass