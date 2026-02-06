import json
from datetime import date

signs = [
    { "id": 1, "name": "Leo" }, { "id": 2, "name": "Virgo" }, { "id": 3, "name": "Aries" },
    { "id": 4, "name": "Scorpio" }, { "id": 5, "name": "Taurus" }, { "id": 6, "name": "Libra" },
    { "id": 7, "name": "Gemini" }, { "id": 8, "name": "Cancer" }, { "id": 9, "name": "Capricorn" },
    { "id": 10, "name": "Aquarius" }, { "id": 11, "name": "Pisces" }, { "id": 12, "name": "Sagittarius" }
]

langs = ["en", "ru", "de", "fr", "es"]

dummy_text = {
    "en": {
        "general": "Today is a great day for new beginnings.",
        "love": "Romance is in the air.",
        "business": "Financial matters are easily resolved.",
        "health": "Energy is high.",
        "lunar": "Moon favors activity."
    },
    "ru": {
        "general": "Сегодня отличный день для новых начинаний.",
        "love": "В романтической сфере возможны сюрпризы.",
        "business": "Финансовые вопросы решаются легко.",
        "health": "Энергия на высоте.",
        "lunar": "Луна способствует активности."
    },
    "de": {
        "general": "Heute ist ein großartiger Tag für Neuanfänge.",
        "love": "Romantik liegt in der Luft.",
        "business": "Finanzielle Angelegenheiten lassen sich leicht lösen.",
        "health": "Die Energie ist hoch.",
        "lunar": "Der Mond begünstigt Aktivität."
    },
    "fr": {
        "general": "C'est une excellente journée pour de nouveaux départs.",
        "love": "La romance est dans l'air.",
        "business": "Les questions financières sont facilement résolues.",
        "health": "L'énergie est élevée.",
        "lunar": "La lune favorise l'activité."
    },
    "es": {
        "general": "Hoy es un gran día para nuevos comienzos.",
        "love": "El romance está en el aire.",
        "business": "Los asuntos financieros se resuelven fácilmente.",
        "health": "La energía es alta.",
        "lunar": "La luna favorece la actividad."
    }
}

horoscopes = {}
global_data = {}
today = date.today().isoformat()

for lang in langs:
    # Horoscopes
    horoscopes[lang] = []
    text = dummy_text.get(lang, dummy_text["en"])
    
    for s in signs:
        horoscopes[lang].append({
            "sign_id": s["id"],
            "sign_name": s["name"], # Note: Name ideally should also be translated
            "date": today,
            "general_text": text["general"],
            "love_text": text["love"],
            "business_text": text["business"],
            "health_text": text["health"],
            "lunar_text": text["lunar"],
            "love_rating": 5, "business_rating": 4, "health_rating": 5, "lunar_rating": 4
        })

    # Global
    global_data[lang] = {
        "date": today,
        "title": f"Energy ({lang.upper()})",
        "description": f"Global energy description in {lang}.",
        "planet": "Mars",
        "element": "Fire",
        "color": "Red",
        "intensity": 5
    }

with open('webapp/data/horoscopes.json', 'w', encoding='utf-8') as f:
    json.dump(horoscopes, f, ensure_ascii=False, indent=2)

with open('webapp/data/global.json', 'w', encoding='utf-8') as f:
    json.dump(global_data, f, ensure_ascii=False, indent=2)

print("Generated multi-language dummy data.")
