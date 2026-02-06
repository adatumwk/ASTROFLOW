from enum import Enum

# === Job Types Enum ===
class JobType(str, Enum):
    DAILY_TRANSIT = 'daily_transit'
    SEND_GENERAL_HOROSCOPE = 'send_general_horoscope'

# Zodiac Signs
ZODIAC_MAP = {
    'Aries': 3, 'Taurus': 5, 'Gemini': 7, 'Cancer': 8, 'Leo': 1,
    'Virgo': 2, 'Libra': 6, 'Scorpio': 4, 'Sagittarius': 12,
    'Capricorn': 9, 'Aquarius': 10, 'Pisces': 11
}

ZODIAC_EMOJIS = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
}
