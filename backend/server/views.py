from django.http import JsonResponse
# Create your views here.
def index(request):
    return JsonResponse({"status":200, "message":"also conn. success..."})

def home(request):
    return JsonResponse({"status":200, "message":"server connected..."})