#!/bin/bash

# Force l'installation des dépendances avec npm
npm install --force

# Crée le répertoire "dist" s'il n'existe pas
mkdir -p dist

# Exécute la construction de ton projet (remplace cette commande par celle de ton projet)
# Assure-toi que cette commande génère les fichiers dans le répertoire "dist"
npm run build

# Déplace les fichiers générés dans le répertoire "dist"
# Assure-toi de spécifier correctement le chemin des fichiers générés
# Ici, nous supposons que les fichiers sont déjà dans le répertoire "dist"
mv dist/* ./dist/