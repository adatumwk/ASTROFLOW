import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const HOROSCOPES_FILE = path.join(DATA_DIR, 'horoscopes.json');
const GLOBAL_FILE = path.join(DATA_DIR, 'global.json');

export async function getDailyHoroscopes() {
    try {
        if (!fs.existsSync(HOROSCOPES_FILE)) {
            return [];
        }
        const fileContents = fs.readFileSync(HOROSCOPES_FILE, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading horoscopes file:', error);
        return [];
    }
}

export async function getGlobalEnergy() {
    try {
        if (!fs.existsSync(GLOBAL_FILE)) {
            // Fallback if missing
            return {
                title: "Energy Loading...",
                description: "Aligning with the stars to bring you the latest cosmic updates. Please check back shortly.",
                intensity: 3,
                planet: "Sun",
                element: "Fire",
                color: "Gold"
            };
        }
        const fileContents = fs.readFileSync(GLOBAL_FILE, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading global file:', error);
        return null;
    }
}
