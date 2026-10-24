/* ==========================================================
   Regripp'Run : informations du site
   ----------------------------------------------------------
   C'est le seul fichier à modifier pour mettre le site à jour.
   - Un champ laissé vide ("") affiche "à venir" ou masque le bloc.
   - Gardez bien les guillemets " " et les virgules.
   - Pour modifier : sur GitHub, ouvrez ce fichier, cliquez sur
     le crayon, changez le texte, puis "Commit changes".
   ========================================================== */

window.RRC = {

  club: {
    creation: "2024",
    statut: "",                // ex. : "Association loi 1901" ou "Groupe informel"
    cout: "",                  // ex. : "Gratuit" ou "Cotisation de 20 € par an"
    licence: "",               // ex. : "Pas de licence obligatoire pour les sorties du club"

    // Mentions légales (page Contact) : à compléter avant la mise en ligne
    editeur: "",               // nom officiel du club
    responsable: "",           // nom de la personne responsable de la publication
    adresse: "",               // adresse postale ou de la mairie de domiciliation

    whatsapp: "",              // lien d'invitation du groupe WhatsApp
    email: "",
    facebook: "",
    instagram: "",

    sorties: {
      quand: "",               // ex. : "Le samedi à 9h"
      ou: "",                  // ex. : "Parking de la salle des fêtes"
      formats: "Marche, course à pied et trail, avec un ou plusieurs groupes de niveau",
      decouverte: ""           // ex. : "Samedi 14 novembre, 9h, boucle de 6 km"
    }
  },

  /* Parcours autour de La Regrippière.
     categorie : "moins-5", "5-15" ou "15-25"
     Exemple d'entrée (à copier, remplir, placer entre les crochets) :
     {
       categorie: "moins-5",
       nom: "La boucle du village",
       denivele: "40 m",
       duree: "50 min",
       difficulte: "Facile",
       depart: "Place de l'église",
       lien: "https://www.visorando.com/..."
     }
  */
  parcours: [],

  /* Courses des départements 44 et 49.
     date : au format AAAA-MM-JJ
     Exemple d'entrée :
     {
       date: "2026-11-22",
       nom: "Trail des vignes",
       lieu: "Vallet (44)",
       distances: "10 km, 21 km",
       lien: "https://..."
     }
  */
  courses: []
};
