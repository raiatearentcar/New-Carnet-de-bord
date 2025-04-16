# Cahier des Charges — Application Carnet de Bord Garage

## Objectif
Créer une application web permettant au personnel d’un garage de suivre l’historique des révisions et services réalisés sur les véhicules (vidange, entretien, etc.), sans gestion de clients ni de facturation.

## Utilisateurs
- Personnel du garage (utilisateurs autorisés avec identifiant/mot de passe)

## Fonctionnalités principales

### 1. Connexion sécurisée
- Authentification obligatoire (login/password)
- Accès à l’application uniquement après connexion

### 2. Gestion des véhicules
- Ajouter un véhicule (marque, modèle, immatriculation, année)
- Modifier ou supprimer un véhicule

### 3. Enregistrement des services
- Associer un service à un véhicule (type, date, détails)
- Exemples : vidange, changement de pneus, révision, contrôle technique…

### 4. Consultation de l’historique
- Afficher l’historique des services pour chaque véhicule
- Tri/filtre par date ou type de service

### 5. Sécurité & Simplicité
- Accès uniquement aux utilisateurs authentifiés
- Interface claire, intuitive, adaptée au personnel du garage
- Données stockées de façon sécurisée

## Contraintes techniques
- Frontend : React
- Backend : Node.js + Express
- Base de données : MongoDB (ou PostgreSQL)
- Authentification sécurisée (hash des mots de passe, JWT)
- API REST sécurisée
