// Import des scripts dans toutes les langues
import scriptFr from '../data/script/fr.json';
import scriptEn from '../data/script/en.json';

// Type pour un nœud de dialogue
export type DialogueNode = {
  id: string;
  character: string;
  avatar: string;
  text: string;
  time?: string;
  reactions?: { emoji: string; count: number }[];
  role?: string;
  choices?: { text: string; next: string }[];
  next?: string;
};

// Map des scripts par langue
const scriptsMap: Record<string, DialogueNode[]> = {
  fr: scriptFr as DialogueNode[],
  en: scriptEn as DialogueNode[],
};

// Langue par défaut
let currentLanguage = 'fr';

/**
 * Définit la langue active pour le dialogue
 */
export function setLanguage(lang: string): void {
  if (scriptsMap[lang]) {
    currentLanguage = lang;
    console.log(`📚 Langue du dialogue changée: ${lang}`);
  } else {
    console.warn(`⚠️ Langue "${lang}" non disponible, utilisation de "${currentLanguage}"`);
  }
}

/**
 * Récupère la langue active
 */
export function getCurrentLanguage(): string {
  return currentLanguage;
}

/**
 * Récupère un nœud par son ID dans la langue active
 */
export function getNodeById(id: string): DialogueNode | undefined {
  const script = scriptsMap[currentLanguage];
  const node = script.find((node) => node.id === id);
  console.log(`🔍 getNodeById(${id}) in ${currentLanguage}:`, node);
  return node;
}

/**
 * Récupère tous les nœuds du script dans la langue active
 */
export function getAllNodes(): DialogueNode[] {
  return scriptsMap[currentLanguage] || [];
}

/**
 * Vérifie si une langue est disponible
 */
export function isLanguageAvailable(lang: string): boolean {
  return !!scriptsMap[lang];
}

/**
 * Récupère la liste des langues disponibles
 */
export function getAvailableLanguages(): string[] {
  return Object.keys(scriptsMap);
}