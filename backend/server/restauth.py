import os
from django.http import HttpResponseBadRequest

#Uncomment during development
#from dotenv import load_dotenv
#
#load_dotenv()

class CustomMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        if request.headers.get('AUTH-TOKEN') != os.environ['AUTH_TOKEN']:
            return HttpResponseBadRequest("authentication not provided")

        response = self.get_response(request)

        return response