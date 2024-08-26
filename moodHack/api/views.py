from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from .models import ChatMessage
from django.http import JsonResponse
from django.http import  JsonResponse 
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("API_KEY"))

model = genai.GenerativeModel('gemini-1.5-flash')

   
@csrf_exempt
def home(request, mood: str):
    message_for_bot = "I am feeling " + mood + " suggest me some coping mechanisms for this emotional state. Also suggest some songs to listen to with this mood."
    first_bot_response=model.generate_content(message_for_bot).text.split('**')
    bot_response='\n'.join(first_bot_response)
    #bot_response = model.generate_content(message_for_bot).text
    
    ChatMessage.objects.create(user_message=mood, bot_response=bot_response)
    return JsonResponse({'status': 'success'})


def botresponse(request):
    if request.method == 'GET':
        # Get the latest ChatMessage entry
        latest_message = ChatMessage.objects.latest('created_at')
        
        # Prepare the data to return as JSON
        data = {
            'user_message': latest_message.user_message,
            'bot_response': latest_message.bot_response,
            'created_at': latest_message.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        
    return JsonResponse(data)
