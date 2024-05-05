#!/bin/bash

# Force l'installation des dépendances avec npm
npm install --force

# Crée le répertoire "dist" s'il n'existe pas
mkdir -p dist

# Exécute la construction de ton projet (remplace cette commande par celle de ton projet)
# Assure-toi que cette commande génère les fichiers dans le répertoire "dist"
npm run build

# Vérifie si des fichiers sont présents dans le répertoire "dist"
if [ -n "$(ls -A dist)" ]; then
  # Déplace les fichiers générés dans le répertoire "dist"
  mv dist/* ./dist/
else
  echo "Aucun fichier à déplacer dans le répertoire 'dist'."
fi