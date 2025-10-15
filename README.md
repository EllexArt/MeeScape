# MeeScape
An Electron app with React. A visual novel game if it is finished, or a simple test to use new technologies.

## Qu'est-ce que Forge ?
Forge (Electron Forge) est un outil qui facilite la création, le packaging et la distribution d'applications Electron. Il gère la configuration, le build (avec Webpack), et propose des commandes simples pour démarrer, packager ou publier votre application.

## Utilisation de l'application

1. **Installation des dépendances**
	```powershell
	npm install
	```

2. **Nettoyage (en cas de problème de lancement ou après modification de la structure du projet)**
	```powershell
	npm run clean
	```

3. **Lancement de l'application**
	```powershell
	npm start
	```

Si vous obtenez une erreur `EPERM: operation not permitted, rmdir ...`, fermez tous les programmes susceptibles d'utiliser le dossier `.webpack` (explorateur de fichiers, éditeur, terminaux), puis relancez `npm run clean` et `npm start`.

## Scripts disponibles

- `npm start` : Nettoie le dossier `.webpack` puis lance l'application Electron avec Forge.
- `npm run clean` : Supprime le dossier `.webpack` (utile en cas de problème de build ou de structure).
- `npm run lint` : Lint le code TypeScript/React.

## Dépendances principales
- [Electron Forge](https://www.electronforge.io/)
- React
- TypeScript

## Architecture de l'application

L'application suit l'architecture classique d'un projet Electron avec React :

- **src/index.ts** : point d'entrée du process principal Electron (main). Il crée la fenêtre et charge le frontend.
- **src/renderer.ts** : point d'entrée du renderer (frontend). C'est ici que React est initialisé et que l'UI s'affiche.
- **src/app.tsx** : composant principal React (UI).
- **src/preload.ts** : (optionnel) permet d'exposer des APIs sécurisées du main vers le renderer.

Le dossier `.webpack` est généré automatiquement lors du build et contient les fichiers packagés.

### Utilisation d'Electron
Electron permet de créer des applications desktop multiplateformes en utilisant des technologies web (HTML, CSS, JS/TS, React, etc.).
Le process principal (main) gère la fenêtre et la communication système, tandis que le renderer affiche l'interface utilisateur.

## Exemple d'architecture pour un visual novel en mode chat (type Discord)

Voici une proposition de structure de dossiers et de composants pour développer un visual novel en mode chat :

```
src/
	components/
		ChatWindow.tsx         # Fenêtre principale du chat
		MessageList.tsx        # Liste des messages
		MessageInput.tsx       # Zone de saisie
		CharacterAvatar.tsx    # Avatar des personnages
		ChoiceButtons.tsx      # Boutons de choix pour l'utilisateur
	data/
		script.json            # Script du visual novel (messages, choix, embranchements)
	logic/
		dialogueEngine.ts      # Gestion de l'avancement dans le script
	app.tsx                 # Point d'entrée React, composition des composants
	renderer.ts             # Entrée renderer Electron
	preload.ts              # (optionnel) APIs sécurisées
	index.ts                # Entrée main Electron
```

### Fonctionnement
- Le script du visual novel est stocké dans `data/script.json` (ou un format similaire).
- `dialogueEngine.ts` gère la logique d'affichage des messages, des choix, et la progression.
- Les composants React affichent l'interface façon chat Discord (bulles, avatars, etc.).
- L'utilisateur interagit via des boutons de choix, qui modifient l'état du dialogue.

N'hésitez pas à demander un exemple de composant ou de structure de script !

---

## Personnaliser l'architecture et enrichir votre visual novel

### 1. Ajouter des choix et du script

- Le fichier `src/data/script.json` contient la structure de votre histoire.
- Chaque entrée représente un message, un personnage, et éventuellement des choix.
- Pour ajouter un choix, ajoutez une propriété `choices` à un message :

```json
{
	"id": "start",
	"character": "Alice",
	"avatar": "alice.png",
	"text": "Salut ! Prêt pour l’aventure ?",
	"choices": [
		{ "text": "Oui, allons-y !", "next": "go" },
		{ "text": "Non, pas maintenant.", "next": "end" }
	]
}
```

### 2. Afficher les choix comme un vrai chat

- Les boutons de choix sont affichés dans le composant `ChoiceButtons.tsx`.
- Pour un rendu immersif façon Discord, chaque choix peut être stylisé comme une bulle de message ou un bouton sous la dernière réplique.
- Le CSS du projet propose déjà un style moderne ; adaptez-le dans `index.css` si besoin.

### 3. Ajouter des interactions avancées

- Ajoutez des propriétés à vos nœuds de script (sons, images, conditions, etc.).
- Gérez la logique dans `dialogueEngine.ts` pour supporter :
	- Des embranchements conditionnels
	- Des variables d’état (inventaire, relations, etc.)
	- Des événements spéciaux (sons, animations)

### 4. Personnaliser les composants

- Modifiez ou ajoutez des composants dans `src/components/` pour enrichir l’UI (animations, réactions, notifications, etc.).
- Inspirez-vous de Discord pour l’UX : avatars ronds, bulles alignées, couleurs de rôles, etc.

### 5. Ajouter un nouveau message ou choix dans le script

1. Ouvrez `src/data/script.json`.
2. Ajoutez un nouvel objet avec un `id` unique, le texte, le personnage, et les choix éventuels.
3. Reliez ce nœud à un choix précédent via la propriété `next`.

### 6. Tester et itérer

- Lancez l’application avec `npm start` pour voir vos modifications en temps réel.
- Modifiez le style dans `index.css` pour personnaliser l’apparence.

---

Pour toute personnalisation avancée, modifiez la logique dans `dialogueEngine.ts` et les composants React. Inspirez-vous de l’architecture proposée pour garder un code clair et évolutif.

---
Images provenant de Freepik 
<a href="https://fr.freepik.com/vecteurs-libre/illustration-reves-magiques-dessines-main_30708773.htm">Image de freepik</a>
Image par <a href="https://pixabay.com/fr/users/adege-4994132/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=9883036">Andreas</a> de <a href="https://pixabay.com/fr//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=9883036">Pixabay</a>
Image par <a href="https://pixabay.com/fr/users/satyress-3829110/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8335519">Satyress</a> de <a href="https://pixabay.com/fr//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8335519">Pixabay</a>
Image par <a href="https://pixabay.com/fr/users/biancavandijk-9606149/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=9169969">Bianca Van Dijk</a> de <a href="https://pixabay.com/fr//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=9169969">Pixabay</a>