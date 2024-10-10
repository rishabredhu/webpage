import os
from typing import List, Dict
import openai
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Load environment variables
load_dotenv()

# Set up OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConversationManager:
    def __init__(self):
        self.conversations: Dict[str, List[Dict[str, str]]] = {}

    def get_conversation(self, session_id: str) -> List[Dict[str, str]]:
        if session_id not in self.conversations:
            self.conversations[session_id] = []
        return self.conversations[session_id]

    def update_conversation(self, session_id: str, conversation: List[Dict[str, str]]):
        self.conversations[session_id] = conversation

    def generate_response(self, conversation_history: List[Dict[str, str]]) -> str:
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=conversation_history,
                max_tokens=150,
                n=1,
                stop=None,
                temperature=0.7,
                headers={
                    "Authorization": f"Bearer {openai.api_key}"
                }
            )
            return response.choices[0].message['content'].strip()
        except Exception as e:
            print(f"Error generating response: {e}")
            return "I'm sorry, I'm having trouble generating a response right now. Please try again later."

conversation_manager = ConversationManager()

@app.post("/api/chatbot")
async def chatbot(request: Request):
    request_data = await request.json()
    session_id = request_data.get("session_id")
    message = request_data.get("message")

    if not session_id or not message:
        return {"error": "Missing session_id or message"}

    conversation = conversation_manager.get_conversation(session_id)
    conversation.append({"role": "user", "content": message})

    response = conversation_manager.generate_response(conversation)

    conversation.append({"role": "assistant", "content": response})
    conversation_manager.update_conversation(session_id, conversation)

    return {"reply": response}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
