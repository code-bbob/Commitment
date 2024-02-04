
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/userauth/', include('userauth.urls')),
    path('api/commit/', include('commit.urls'))
]
