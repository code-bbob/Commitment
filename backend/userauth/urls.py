from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.contrib import admin
from django.urls import path
from .views import UserLoginView, UserRegistrationView
from . import views

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('refresh-token/', TokenRefreshView.as_view(), name='refresh'),
    path('change-password/',views.UserChangePasswordView.as_view(),name='changepassword'),
    path('reset-password/',views.SendPasswordResetEmailView.as_view(),name='resetpassword'),
    path('reset-password/<uid>/<token>/', views.UserPasswordResetView.as_view(), name='reset-password'),
    path('signup/',views.SignupView.as_view(),name="signup"),
    path('info/',views.UserInfoView.as_view(), name='info'),
    path('info/<str:id>', views.UserInfoView.as_view(), name='infoid'),
]
