from django.urls import path
from .views import index, home

urlpatterns = [
    path("v1/", index, name="index"),
    path("api/", home, name="home"),
]