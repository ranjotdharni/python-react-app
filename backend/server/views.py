from django.shortcuts import render
from django_nextjs.render import render_nextjs_page_sync
from django.http import JsonResponse
# Create your views here.
def index(request):
    return render_nextjs_page_sync(request)

def home(request):
    return JsonResponse({"status":200, "message":"successful connection!"})