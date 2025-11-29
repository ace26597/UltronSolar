import os
from openai import OpenAI
from typing import List, Dict, Optional


class OpenAIChatService:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable is not set")
        
        self.client = OpenAI(api_key=api_key)
        self.model = os.getenv("OPENAI_MODEL_NAME", "gpt-4o-mini")
        
        # System prompt for Ultron Power Systems
        self.system_prompt = """You are a helpful sales and education assistant for Ultron Power Systems, a solar EPC (Engineering, Procurement, and Construction) company based in Dhule, Jalgaon, and North Maharashtra, India.

Your role:
- Provide accurate, helpful information about solar energy solutions
- Answer questions about rooftop solar, solar water pumps, inverters, and EPC services
- Help customers understand pricing, subsidies, and financing options
- Be concise, practical, and avoid over-promising
- If you are not sure about specific policy/pricing details, say you will connect the user with a human expert

Important guidelines:
- Be friendly and professional
- Focus on the benefits of solar energy (cost savings, environmental impact)
- Mention that Ultron Power Systems serves Dhule, Jalgaon, and North Maharashtra
- If asked about pricing, mention that prices vary based on system size, components, and site conditions
- Always encourage users to contact the team for personalized quotes and site visits
- Never make specific promises about subsidies or government schemes without recommending they verify with the team

Keep responses conversational and helpful."""

    def generate_response(
        self,
        messages: List[Dict[str, str]],
        context_docs: Optional[List[Dict[str, str]]] = None
    ) -> str:
        """
        Generate a response using OpenAI Chat Completions API.
        
        Args:
            messages: List of message dicts with 'role' and 'content' keys
            context_docs: Optional list of context documents for RAG (future use)
        
        Returns:
            Generated response text
        """
        # Build messages list with system prompt
        chat_messages = [
            {"role": "system", "content": self.system_prompt}
        ]
        
        # Add context if available (for future RAG integration)
        if context_docs:
            context_text = "\n\nRelevant information:\n"
            for doc in context_docs:
                context_text += f"- {doc.get('content', '')}\n"
            chat_messages.append({
                "role": "system",
                "content": f"{self.system_prompt}\n\n{context_text}"
            })
        
        # Add conversation history
        chat_messages.extend(messages)
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=chat_messages,
                temperature=0.7,
                max_tokens=500,
            )
            
            return response.choices[0].message.content.strip()
        except Exception as e:
            raise Exception(f"OpenAI API error: {str(e)}")

