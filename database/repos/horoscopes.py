from .base import BaseRepository
import datetime

class HoroscopeRepository(BaseRepository):
    
    async def upsert_horoscope(self, sign_id: int, h_type: str, h_date: datetime.date, data: dict):
        query = """
            INSERT INTO horoscopes 
                (sign_id, type, date, 
                business_rating, health_rating, love_rating, lunar_rating,
                general_text_ru, business_text_ru, health_text_ru, 
                love_text_ru, lunar_text_ru) 
            VALUES 
               ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            ON CONFLICT (sign_id, type, date) DO UPDATE SET
                business_rating = EXCLUDED.business_rating,
                health_rating = EXCLUDED.health_rating,
                love_rating = EXCLUDED.love_rating,
                lunar_rating = EXCLUDED.lunar_rating,
                general_text_ru = EXCLUDED.general_text_ru,
                business_text_ru = EXCLUDED.business_text_ru,
                health_text_ru = EXCLUDED.health_text_ru,
                love_text_ru = EXCLUDED.love_text_ru,
                lunar_text_ru = EXCLUDED.lunar_text_ru
        """
        await self.execute(
            query,
            sign_id, h_type, h_date,
            str(data.get('business_rating')),
            str(data.get('health_rating')), 
            str(data.get('love_rating')),
            str(data.get('lunar_rating')),
            data.get('general_text'), data.get('business_text'),
            data.get('health_text'), data.get('love_text'), data.get('lunar_text')
        )
