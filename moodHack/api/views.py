from django.shortcuts import render, reverse, redirect
from django.contrib.auth.decorators import login_required
from .models import ChatMessage
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Now you can access the API_KEY
genai.configure(api_key=os.getenv("API_KEY"))

# genai.configure(api_key=os.environ["API_KEY"])

model = genai.GenerativeModel('gemini-1.5-flash')


def home(request):

    if request.method == 'POST':
        
        # user_mood=request.POST.get('user_mood',  'neutral')
        # user_message = "I am feeling " + user_mood + " suggest me some coping mechanisms for this emotional state. Also suggest some songs to listen to with this mood."

        # ChatMessage.objects.create(user_mood=user_mood, bot_response=bot_response.text)
        user_message = request.POST.get('user_message')
        message_for_bot="I am feeling " + str(user_message) + " suggest me some coping mechanisms for this emotional state. Also suggest some songs to listen to with this mood."
        print(message_for_bot)
        bot_response = model.generate_content(message_for_bot).text
        # joined_bot_response=f' '.join(bot_response)
        

        ChatMessage.objects.create(user_message=user_message, bot_response=bot_response)

    return redirect('botresponse')


def botresponse(request):
    messages = ChatMessage.objects.all()
    # print(messages)
    return render(request, 'moodHack/home.html', { 'messages': messages })

