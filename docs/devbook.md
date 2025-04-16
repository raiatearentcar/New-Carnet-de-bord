# DevBook — Application Carnet de Bord Garage

## Structure du projet

```
/garage-carnet-bord
  /backend
    - server.js
    - /models (User, Vehicle, Service)
    - /routes (auth, vehicle, service)
    - /middleware (auth.js)
    - .env
    - package.json
  /frontend
    - /src
      - App.js
      - /components (Login, VehicleList, VehicleForm, ServiceForm, History)
      - /pages (LoginPage, Dashboard, VehiclePage)
      - /services (API utils)
    - package.json
  /docs
    - cdc.md
    - devbook.md
  README.md
```

## Backend
- **Node.js + Express**
- **MongoDB** via Mongoose
- Authentification JWT
- Hash des mots de passe avec bcrypt
- API REST sécurisée

### Modèles
- **User** : username, password (hashé)
- **Vehicle** : marque, modele, immatriculation (unique), annee
- **Service** : vehicle (ref Vehicle), type, date, details

### Démarrage (backend)
1. Installer les dépendances : `npm install`
2. Lancer MongoDB localement ou utiliser un service cloud (MongoDB Atlas)
3. Lancer le serveur : `npm run dev`

## Frontend
- **React** (création à venir)
- Authentification (stockage du token JWT)
- Navigation protégée
- Formulaires pour véhicules/services
- Tableaux filtrables pour l’historique

### Démarrage (frontend)
1. Accéder au dossier frontend
2. Installer les dépendances : `npm install`
3. Lancer l’app : `npm start`

## Sécurité
- Utiliser HTTPS en production
- Stocker les secrets dans `.env`
- Ne jamais exposer les mots de passe en clair

## Conseils
- Toujours protéger les routes API sensibles avec le middleware d’authentification
- Valider les entrées côté backend et frontend

---
Pour toute question technique ou évolution, consulter ce DevBook ou demander de l’aide à l’équipe technique.
