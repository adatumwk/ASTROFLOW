import os
import logging 
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger("Config")

# --- Google Gemini API ---
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
if GOOGLE_API_KEY:
    os.environ['GOOGLE_API_KEY'] = GOOGLE_API_KEY
else:
    logger.warning("⚠️ GOOGLE_API_KEY not found.")