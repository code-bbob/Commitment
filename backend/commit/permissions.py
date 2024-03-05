from rest_framework.permissions import BasePermission
from commit.models import Commit

class IsAuthor(BasePermission):
    def has_object_permission(self, request, view, obj):
        for ob in obj:
            if ob.type == "Public":
                print("lol")
                return True
            print("lil")
            return ob.user == request.user
        
    
class Custom(BasePermission):
    def has_object_permission(self, request, view, obj):
        print (obj.title)
        if obj.title == "asdasdasdasjkakdas":
            print("milyaxata")
            return True
        return False
        