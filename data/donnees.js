/* ==========================================================
   Regripp'Run : informations du site
   ----------------------------------------------------------
   C'est le seul fichier à modifier pour mettre le site à jour.
   - Un champ laissé vide ("") affiche "à venir" ou masque le bloc.
   - Gardez bien les guillemets " " et les virgules.
   - Pour modifier : sur GitHub, ouvrez ce fichier, cliquez sur
     le crayon, changez le texte, puis "Commit changes".

   Dates des courses (3 façons de les écrire) :
     date: "2026-11-28"    date exacte        -> 28 novembre
     date: "~2026-11-28"   date approximative -> Vers le 28 novembre
     date: "2027-02"       mois seulement     -> Février 2027
   Un champ fin: "2026-11-22" ajoute une deuxième journée.
   ========================================================== */

window.RRC = {

  club: {
    creation: "2024",
    statut: "Groupe informel",
    cout: "Gratuit",
    licence: "Pas de licence obligatoire pour les sorties du club",

    // Mentions légales (page Contact)
    editeur: "Regripp’Run",
    responsable: "Thomas DAUCHEL",
    adresse: "La Regrippière, Loire-Atlantique, France",

    whatsapp: "https://chat.whatsapp.com/BF3AoqiXDaWIoE2smRpgUr",
    email: "regripprun@gmail.com",
    facebook: "",
    instagram: "",

    sorties: {
      quand: "Le samedi à 9h",
      ou: "Parking de la place St Jo'",
      formats: "Marche, course à pied et trail, avec un ou plusieurs groupes de niveau",
      decouverte: "Samedi 14 novembre, 9h, boucle de 6 km"
    }
  },

  /* Parcours autour de La Regrippière.
     categorie : "moins-5", "5-15" ou "15-25"
     Sources : office de tourisme du Vignoble de Nantes (fiches circuits). */
  parcours: [
    {
      categorie: "moins-5",
      nom: "Boucle de la Fleurancellerie (4,1 km)",
      denivele: "43 m",
      duree: "1 h 15 à pied",
      difficulte: "Facile",
      depart: "La Regrippière",
      lien: "https://www.destination-vignoble-nantais.com/que-faire-vignoble-nantais/randonnee-itinerance/boucle-circuit-de-la-fleurancellerie-la-regrippiere-fr-6002186/"
    },
    {
      categorie: "5-15",
      nom: "Circuit des Coteaux (10,1 km)",
      denivele: "100 m",
      duree: "2 h 15 à pied",
      difficulte: "Facile",
      depart: "Vallet",
      lien: "https://www.destination-vignoble-nantais.com/que-faire-vignoble-nantais/randonnee-itinerance/boucle-circuit-des-coteaux-vallet-fr-6002241/"
    },
    {
      categorie: "15-25",
      nom: "Sur les pas des Gabelous (15,3 km)",
      denivele: "117 m",
      duree: "3 h 30 à pied",
      difficulte: "Facile",
      depart: "La Regrippière",
      lien: "https://www.destination-vignoble-nantais.com/que-faire-vignoble-nantais/randonnee-itinerance/boucle-circuit-sur-les-pas-des-gabelous-la-regrippiere-fr-6002338/"
    }
  ],

  /* Courses des départements 44 et 49.
     À vérifier sur le site de chaque organisateur avant de s'inscrire. */
  courses: [
    { date: "2026-11-07", nom: "Diva’Trail Nocturne", lieu: "La Varenne, Orée-d’Anjou (49)", distances: "10, 15 et 20 km, nocturne, sans classement", lien: "https://www.timepulse.fr/evenements/voir/3297/diva-trail-nocturne-la-varenne" },
    { date: "2026-11-08", nom: "Musca’Day Trail", lieu: "Saint-Fiacre-sur-Maine (44)", distances: "10 km et 23 km", lien: "https://espace-competition.com/index.php?module=inscription&comp=3232" },
    { date: "2026-11-08", nom: "Trail de l’Hyrome", lieu: "Chemillé-en-Anjou (49)", distances: "plusieurs distances, jusqu’à 44 km" },
    { date: "2026-11-21", fin: "2026-11-22", nom: "Trail de la Côte de Jade", lieu: "Saint-Michel-Chef-Chef (44)", distances: "10, 14 et 24 km" },
    { date: "~2026-11-28", nom: "La Crapahute au clair de lune", lieu: "Martigné-Briand (49)", distances: "9 et 18 km" },
    { date: "2026-12-05", nom: "Course Nocturne Bouguenais", lieu: "Bouguenais (44)", distances: "12 et 18 km" },
    { date: "~2026-12-06", nom: "Trail de la Source", lieu: "Beaupréau-en-Mauges (49)", distances: "10, 16 et 20 km" },
    { date: "2026-12", nom: "Trail du Téléthon", lieu: "Château-Thébaud (44)", distances: "9, 13 et 20 km, non chronométré, au profit de l’AFM Téléthon" },
    { date: "2027-02", nom: "Val’escapades", lieu: "Vallet (44)", distances: "10,1 et 20 km" },
    { date: "2027-04", nom: "Sentiers des vignes", lieu: "Saint-Julien-de-Concelles (44)", distances: "11, 21 et 32 km" },
    { date: "2027-04-10", fin: "2027-04-11", nom: "Trail du vignoble nantais", lieu: "Vertou (44)", distances: "de 12 à 75 km" },
    { date: "2027-05", nom: "Folies du vignobles", lieu: "Vallet (44)", distances: "5, 12 et 22 km, marche ou trail" },
    { date: "2027-06", nom: "Les côteaux de la Logne", lieu: "Corcoué-sur-Logne (44)", distances: "3, 4, 13 et 24 km" }
  ]
};
