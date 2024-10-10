from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import uvicorn
from conversation_manager import ConversationManager

app = FastAPI()
conversation_manager = ConversationManager()

class ChatbotRequest(BaseModel):
    session_id: str
    message: str

class ChatbotResponse(BaseModel):
    reply: str

@app.post("/api/chatbot", response_model=ChatbotResponse)
async def chatbot_endpoint(request: ChatbotRequest):
    try:
        # Get or create conversation history
        conversation_history = conversation_manager.get_conversation(request.session_id)
        
        # Add user message to conversation history
        conversation_history.append({"role": "user", "content": request.message})
        
        # Generate response using GPT-4 (you'll need to implement this in conversation_manager)
        response = conversation_manager.generate_response(conversation_history)
        
        # Add bot response to conversation history
        conversation_history.append({"role": "assistant", "content": response})
        
        # Update conversation history
        conversation_manager.update_conversation(request.session_id, conversation_history)
        
        return ChatbotResponse(reply=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
