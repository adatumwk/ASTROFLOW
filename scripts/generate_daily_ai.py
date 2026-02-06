import asyncio
import logging
import datetime
import sys
import os
import json
import random

# Add parent directory to python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.ai_engine import generate_ai_content_with_fallback, CASCADE_SMART
from constants import ZODIAC_MAP
from scripts.prompts import HOROSCOPE_PROMPTS, ENERGY_PROMPTS

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger("DailyAI")

LANGUAGES = ["en", "ru", "de", "fr", "es"]
# ZODIAC_MAP keys are English (Aries, Leo...), values are IDs.
# We might want localized sign names passed to the prompt if possible, 
# but for now we pass English names or map them if needed. 
# The prompts use {sign_name}. The AI understands "Aries" in all langs usually, 
# but let's provide English names and let AI translate contextually or we map them.
# Given the prompt structure "Знак: {sign_name}", passing "Leo" is fine for GPT/Gemini, 
# it will understand to write about Leo in Russian.

async def generate_json(prompt: str):
    try:
        text, model = await generate_ai_content_with_fallback(prompt, CASCADE_SMART)
        # Clean cleanup potential markdown
        text = text.replace("```json", "").replace("```", "").strip()
        data = json.loads(text)
        return data
    except Exception as e:
        logger.error(f"Generation failed: {e}")
        return None

async def main():
    logger.info("Starting Multi-Language AI Generation...")
    
    target_date = datetime.date.today() + datetime.timedelta(days=1)
    logger.info(f"Target Date: {target_date}")

    final_horoscopes = {lang: [] for lang in LANGUAGES}
    final_global = {}

    for lang in LANGUAGES:
        logger.info(f"=== Processing Language: {lang.upper()} ===")
        
        # 1. Generate Global Energy
        logger.info(f"Generating Energy ({lang})...")
        e_prompt = ENERGY_PROMPTS[lang].format(date=target_date.strftime('%Y-%m-%d'))
        energy_data = await generate_json(e_prompt)
        
        if energy_data:
            energy_data['date'] = target_date.isoformat()
            final_global[lang] = energy_data
            logger.info(f"✅ Energy ({lang}) generated.")
        else:
            logger.error(f"❌ Failed to generate Energy ({lang})")

        # 2. Generate Horoscopes
        h_template = HOROSCOPE_PROMPTS[lang]
        
        for sign_name_en, sign_id in ZODIAC_MAP.items():
            logger.info(f"Generating {sign_name_en} ({lang})...")
            
            prompt = h_template.format(sign_name=sign_name_en, date=target_date.strftime('%Y-%m-%d'))
            h_data = await generate_json(prompt)
            
            if h_data:
                h_data['sign_id'] = sign_id
                h_data['sign_name'] = sign_name_en # Frontend maps this ID to localized name anyway
                h_data['date'] = target_date.isoformat()
                final_horoscopes[lang].append(h_data)
            else:
                logger.error(f"❌ Failed {sign_name_en} ({lang})")
            
            # Rate limit protection
            await asyncio.sleep(1) 

    # Save Files
    output_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'webapp', 'data')
    os.makedirs(output_dir, exist_ok=True)
    
    with open(os.path.join(output_dir, 'horoscopes.json'), 'w', encoding='utf-8') as f:
        json.dump(final_horoscopes, f, ensure_ascii=False, indent=2)
        
    with open(os.path.join(output_dir, 'global.json'), 'w', encoding='utf-8') as f:
        json.dump(final_global, f, ensure_ascii=False, indent=2)

    logger.info("🎉 All Done! Data saved.")

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())
