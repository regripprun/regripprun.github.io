# Site Regripp'Run

Site statique : pas de logiciel à installer, pas de base de données, aucun cookie.
Il suffit de déposer ces fichiers dans un dépôt GitHub public pour le mettre en ligne.

## Ce que contient le dossier

- `index.html`, `le-club.html`, `sorties.html`, `courses.html`, `contact.html` : les pages
- `404.html` : la page affichée quand une adresse n'existe pas
- `css/style.css` : l'apparence (couleurs du logo, polices, mise en page)
- `js/main.js` : le menu mobile, la météo en direct, l'affichage des parcours et des courses
- `data/donnees.js` : **le seul fichier à modifier** pour mettre le site à jour
- `assets/` : le logo, les icônes et les polices

## À compléter avant la mise en ligne

Ouvrez `data/donnees.js` et renseignez :

1. `whatsapp` : le lien d'invitation du groupe (sans lui, les boutons « Rejoindre » mènent à la page Contact)
2. `email`, `facebook`, `instagram` : un champ vide masque simplement le lien
3. `sorties.quand`, `sorties.ou`, `sorties.decouverte` : jour, lieu et prochaine sortie découverte
4. `statut`, `cout`, `licence` : pour la page « Le club » et sa foire aux questions
5. `editeur`, `responsable`, `adresse` : **mentions légales**, à remplir impérativement avant la publication
6. `parcours` et `courses` : voir les exemples en commentaire dans le fichier

Une photo du groupe est à ajouter plus tard (emplacement réservé dans `sorties.html`).

## Mettre le site en ligne (GitHub Pages)

1. Sur GitHub, créez une **organisation** gratuite nommée `regripprun` (menu « + » puis « New organization », offre Free).
2. Dans cette organisation, créez un dépôt **public** nommé exactement `regripprun.github.io`.
3. Dans le dépôt, « Add file » puis « Upload files » : glissez **tout le contenu** de ce dossier (pages, dossiers `css`, `js`, `data`, `assets`), puis « Commit changes ».
4. Ouvrez « Settings » puis « Pages ». Choisissez « Deploy from a branch », la branche `main`, le dossier `/ (root)`, puis enregistrez.
5. Après quelques minutes, le site est disponible sur `https://regripprun.github.io`.

Si le nom `regripprun` est déjà pris, choisissez une variante (par exemple `regripp-run`) : l'adresse suivra le nom de l'organisation.

## Mettre à jour le site

Sur GitHub, ouvrez `data/donnees.js`, cliquez sur le crayon, modifiez le texte entre les guillemets, puis « Commit changes ». Le site se met à jour en une à deux minutes.

## Tester sur votre ordinateur

Double-cliquez sur `index.html` : le site s'ouvre dans votre navigateur, la météo comprise (connexion internet nécessaire).

## Notes techniques

- La météo vient d'Open-Meteo (gratuit, sans clé), pour les coordonnées de La Regrippière.
- La page `404.html` utilise des chemins depuis la racine du site : elle fonctionne sur `regripprun.github.io`, mais devra être adaptée si le site est un jour placé dans un sous-dossier.
