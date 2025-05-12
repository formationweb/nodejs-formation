Créer un programme en Node.js qui permet de convertir des fichiers Markdown en fichiers HTML et de copier les fichiers images associés dans un dossier spécifique. Le programme doit être exécutable via une ligne de commande avec des arguments pour spécifier les dossiers d'entrée et de sortie.

1. **Créer un fichier `mark.js`** :
   - Ce fichier contiendra le code nécessaire pour réaliser les tâches suivantes :
     - Récupérer le contenu d'un dossier 

    pourquoi pas, de manière récursive

     - Convertir les fichiers Markdown en fichiers HTML.
     - Copier les fichiers images dans un dossier spécifique.

Méthodes utiles:

https://node-js.fr/filesystem/utils.html

fs.mkdir(dir, { recursive: true });

2. **Utiliser les modules Node.js `fs` et `path`** :
   - Utiliser le module `fs` pour lire et écrire des fichiers.
   - Utiliser le module `path` pour manipuler les chemins de fichiers.

 - Utiliser `markdown-it` pour convertir le contenu Markdown en HTML.

Exemple:

import markdownit from 'markdown-it';
const md = markdownit();
md.render(’# Titre’)


4. **Gérer les arguments de la ligne de commande** :
   - Le programme doit accepter deux arguments :
     - Le dossier d'entrée contenant les fichiers Markdown et les images.
     - Le dossier de sortie pour les fichiers HTML (optionnel, par défaut `dist`).

5. **Créer les dossiers de sortie si nécessaire** :
   - Si les dossiers de sortie n'existent pas, le programme doit les créer.

6. **Exécuter le programme via la ligne de commande** :
   - Le programme doit être exécutable avec la commande suivante :
     ```sh
     node mark.js input [output]
     ```
   - `input` : Le dossier d'entrée contenant les fichiers Markdown et les images.
   - `output` (optionnel) : Le dossier de sortie pour les fichiers HTML. Si non spécifié, le dossier `dist` sera utilisé par défaut.