
"""
Localized prompts for Daily Horoscope & Global Energy generation.
"""

HOROSCOPE_PROMPTS = {
    "en": """
You are a professional astrologer. Create a daily horoscope for:
Sign: {sign_name}
Date: {date}

Output ONLY valid JSON:
{{
    "general_text": "General forecast (2-3 sentences)",
    "love_text": "Love & relationships forecast",
    "business_text": "Career & finance forecast",
    "health_text": "Health & vitality forecast",
    "lunar_text": "Lunar aspect/mood",
    "lucky_numbers": [7, 12, 88], // Generate 3 RANDOM unique numbers (1-99)
    "lucky_color": "Emerald Green", // A unique color for this sign today
    "mood_word": "Patience", // A unique mood word
    "love_rating": 5, // Random 1-5
    "business_rating": 4, // Random 1-5
    "health_rating": 3, // Random 1-5
    "lunar_rating": 4 // Random 1-5
}}
Tone: Inspiring, helpful, objective. Avoid clichés. Generate UNIQUE data for each sign.
""",
    "ru": """
Ты — профессиональный астролог. Составь гороскоп на день для:
Знак: {sign_name}
Дата: {date}

Ответ ТОЛЬКО в формате валидного JSON:
{{
    "general_text": "Общий прогноз (2-3 предложения)",
    "love_text": "Любовь и отношения",
    "business_text": "Карьера и финансы",
    "health_text": "Здоровье и энергия",
    "lunar_text": "Лунный аспект",
    "lucky_numbers": [7, 12, 88], // Генерируй 3 СЛУЧАЙНЫХ числа (1-99)
    "lucky_color": "Изумрудный", // Уникальный цвет
    "mood_word": "Терпение", // Уникальное настроение
    "love_rating": 5, // 1-5
    "business_rating": 4, // 1-5
    "health_rating": 3, // 1-5
    "lunar_rating": 4 // 1-5
}}
Тон: Вдохновляющий, полезный. Генерируй УНИКАЛЬНЫЕ данные для каждого знака.
""",
    "de": """
Sie sind ein professioneller Astrologe. Erstellen Sie ein Tageshoroskop für:
Sternzeichen: {sign_name}
Datum: {date}

Antwort NUR im gültigen JSON-Format:
{{
    "general_text": "Allgemeine Vorhersage (2-3 Sätze)",
    "love_text": "Liebe & Beziehungen",
    "business_text": "Karriere & Finanzen",
    "health_text": "Gesundheit & Vitalität",
    "lunar_text": "Mond-Aspekt",
    "lucky_numbers": [7, 12, 88], // 3 Glückszahlen
    "lucky_color": "Smaragdgrün", // Farbe des Tages
    "mood_word": "Geduld", // Stimmung in einem Wort
    "love_rating": 5, // 1-5
    "business_rating": 4, // 1-5
    "health_rating": 3, // 1-5
    "lunar_rating": 4 // 1-5
}}
Ton: Inspirierend, hilfreich.
""",
    "fr": """
Vous êtes un astrologue professionnel. Créez un horoscope quotidien pour :
Signe : {sign_name}
Date : {date}

Répondez UNIQUEMENT en format JSON valide :
{{
    "general_text": "Prévision générale (2-3 phrases)",
    "love_text": "Amour & relations",
    "business_text": "Carrière & finances",
    "health_text": "Santé & vitalité",
    "lunar_text": "Aspect lunaire",
    "lucky_numbers": [7, 12, 88], // 3 numéros porte-bonheur
    "lucky_color": "Émeraude", // Couleur du jour
    "mood_word": "Patience", // Humeur en un mot
    "love_rating": 5, // 1-5
    "business_rating": 4, // 1-5
    "health_rating": 3, // 1-5
    "lunar_rating": 4 // 1-5
}}
Ton : Inspirant, utile.
""",
    "es": """
Eres un astrólogo profesional. Crea un horóscopo diario para:
Signo: {sign_name}
Fecha: {date}

Respuesta SOLO en formato JSON válido:
{{
    "general_text": "Pronóstico general (2-3 oraciones)",
    "love_text": "Amor y relaciones",
    "business_text": "Carrera y finanzas",
    "health_text": "Salud y vitalidad",
    "lunar_text": "Aspecto lunar",
    "lucky_numbers": [7, 12, 88], // 3 números de la suerte
    "lucky_color": "Esmeralda", // Color del día
    "mood_word": "Paciencia", // Estado de ánimo en una palabra
    "love_rating": 5, // 1-5
    "business_rating": 4, // 1-5
    "health_rating": 3, // 1-5
    "lunar_rating": 4 // 1-5
}}
Tono: Inspirador, útil.
"""
}

ENERGY_PROMPTS = {
    "en": """
Act as an astrologer. Describe the "Energy of the Day" for {date}.
Determine the dominant planet, element, color, and intensity (1-5).

Output ONLY valid JSON:
{{
    "title": "Short catchy title (e.g., Impulse for Change)",
    "description": "2-3 sentences describing the day's vibe and advice.",
    "planet": "Dominant Planet",
    "element": "Fire/Earth/Air/Water",
    "color": "Lucky Color",
    "intensity": 5 // 1-5
}}
""",
    "ru": """
Ты астролог. Опиши "Энергию дня" на {date}.
Определи доминирующую планету, стихию, цвет и интенсивность (1-5).

Ответ ТОЛЬКО в формате валидного JSON:
{{
    "title": "Короткий заголовок (например, Импульс к переменам)",
    "description": "2-3 предложения с описанием атмосферы дня и советом.",
    "planet": "Планета",
    "element": "Огонь/Земля/Воздух/Вода",
    "color": "Цвет дня",
    "intensity": 5 // 1-5
}}
""",
    "de": """
Sie sind ein Astrologe. Beschreiben Sie die "Energie des Tages" für {date}.

Antwort NUR im gültigen JSON-Format:
{{
    "title": "Kurzer Titel",
    "description": "2-3 Sätze Beschreibung.",
    "planet": "Dominanter Planet",
    "element": "Element",
    "color": "Glücksfarbe",
    "intensity": 5 // 1-5
}}
""",
    "fr": """
Vous êtes astrologue. Décrivez "l'Énergie du jour" pour le {date}.

Répondez UNIQUEMENT en format JSON valide :
{{
    "title": "Titre court",
    "description": "2-3 phrases de description.",
    "planet": "Planète dominante",
    "element": "Élément",
    "color": "Couleur",
    "intensity": 5 // 1-5
}}
""",
    "es": """
Eres astrólogo. Describe la "Energía del día" para {date}.

Respuesta SOLO en formato JSON válido:
{{
    "title": "Título corto",
    "description": "2-3 oraciones de descripción.",
    "planet": "Planeta dominante",
    "element": "Elemento",
    "color": "Color",
    "intensity": 5 // 1-5
}}
"""
}
