
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/userauth/', include('userauth.urls')),
    path('api/commit/', include('commit.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
#added to custom media static files 