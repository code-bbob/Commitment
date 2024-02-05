from rest_framework import serializers
from .models import Commit
from userauth.serializers import UserInfoSerializer

class CommitSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer()
    print(user)
    class Meta:
        model = Commit
        fields = '__all__'