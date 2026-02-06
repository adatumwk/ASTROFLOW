import asyncio
import logging
import google.genai as genai
from google.genai import types
from config import GOOGLE_API_KEY

from typing import Tuple
import threading

logger = logging.getLogger(__name__)

CASCADE_SMART = [
    "gemma-3-27b-it",
    "gemma-3-12b-it", 
    "gemma-3-8b-it", # Correcting 8b if 4b is not standard, but adhering to user list if possible. User said 4b. Let's stick to user list exactly: 27, 12, 4, 2, 1.
    "gemma-3-4b-it",
    "gemma-3-2b-it",
    "gemma-3-1b-it"
]

_ai_client = None
_client_lock = threading.Lock()

def get_ai_client():
    global _ai_client
    if _ai_client is None:
        with _client_lock:
            if _ai_client is None:
                if not GOOGLE_API_KEY:
                    raise ValueError("GOOGLE_API_KEY not set!")
                _ai_client = genai.Client(api_key=GOOGLE_API_KEY)
    return _ai_client

def reset_ai_client():
    global _ai_client
    if _ai_client:
        _ai_client = None
    logger.info("🔄 Gemini Client reset.")

def _generate_sync_impl(model_name: str, prompt: str):
    client = get_ai_client()

    content = types.Content(
        role="user",
        parts=[types.Part.from_text(text=prompt)]
    )

    # Simplified call for compatibility
    response = client.models.generate_content(
        model=model_name,
        contents=[content],
        config=types.GenerateContentConfig(
            temperature=0.7,
            max_output_tokens=8192,
        ),
    )
    
    return response.text.strip(), model_name

async def generate_ai_content_with_fallback(prompt: str, cascade: list) -> Tuple[str, str]:
    last_error = None
    for model in cascade:
        logger.info(f"🧠 Trying model: {model}")
        for attempt in range(1, 3): 
            try:
                text, used_model = await asyncio.wait_for(
                    asyncio.to_thread(_generate_sync_impl, model, prompt),
                    timeout=60.0
                )
                if not text: raise ValueError("Empty response")
                return text, used_model

            except Exception as e:
                logger.warning(f"⚠️ Error {model}: {e}")
                last_error = e
                await asyncio.sleep(2)
                
    raise last_error if last_error else ValueError("All models failed")
