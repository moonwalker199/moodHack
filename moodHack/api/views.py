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
    # response = model.generate_content("")
    # print(response.text)
    # return HttpResponse(response.text)
    # if request.method == "POST":
    #     text = request.POST.get("text")
    #     model = genai.GenerativeModel("gemini-pro")
    #     chat = model.start_chat()
    #     response = chat.send_message(text)
    #     user = request.user
    #     ChatBot.objects.create(text_input=text, gemini_output=response.text, user=user)
    #     # Extract necessary data from response
    #     response_data = {
    #         "text": response.text,  # Assuming response.text contains the relevant response data
    #         # Add other relevant data from response if needed
    #     }
    #     return JsonResponse({"data": response_data})
    # else:
    #     return HttpResponseRedirect(
    #         reverse("chat")
    #     )  # Redirect to chat page for GET requests

    if request.method == 'POST':
        
        user_mood=request.POST.get('user_mood',  'neutral')
        user_message = "I am feeling " + user_mood + " suggest me some coping mechanisms for this emotional state. Also suggest some songs to listen to with this mood."
        bot_response = model.generate_content(user_message)

        ChatMessage.objects.create(user_mood=user_mood, bot_response=bot_response.text)

    return redirect('botresponse')

def botresponse(request):
    messages = ChatMessage.objects.all()
    print(messages)
    return render(request, 'chatbot/home.html', { 'messages': messages })
# def chat(request):
#     user = request.user
#     chats = ChatBot.objects.filter(user=user)
#     return render(request, "chat_bot.html", {"chats": chats})