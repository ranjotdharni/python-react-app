from django.http import JsonResponse
# Create your views here.
def index(request):
    return JsonResponse({"status":200, "message":"Django Unchained"})

def home(request):
    return JsonResponse({"status":200, "message":"Pulp Fiction"})