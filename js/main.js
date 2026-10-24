/* Regripp'Run : script commun à toutes les pages.
   Aucune bibliothèque, aucun cookie, aucun suivi. */

(function () {
  "use strict";

  var DONNEES = window.RRC || { club: {}, parcours: [], courses: [{ date: "2026-11-07", nom: "Diva’Trail Nocturne", lieu: "La Varenne, Orée-d’Anjou (49)", distances: "10, 15 et 20 km, nocturne, sans classement", lien: "https://www.timepulse.fr/evenements/voir/3297/diva-trail-nocturne-la-varenne" },
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
  ] };
  var CLUB = DONNEES.club || {};
  var SORTIES = CLUB.sorties || {};

  /* ---------- Utilitaires ---------- */

  function lire(chemin) {
    // "sorties.quand" -> CLUB.sorties.quand
    return chemin.split(".").reduce(function (obj, cle) {
      return obj && obj[cle] !== undefined ? obj[cle] : "";
    }, CLUB);
  }

  function lienValide(url) {
    return typeof url === "string" && /^https?:\/\//i.test(url.trim());
  }

  function creer(balise, classe, texte) {
    var el = document.createElement(balise);
    if (classe) el.className = classe;
    if (texte !== undefined) el.textContent = texte;
    return el;
  }

  /* ---------- Menu mobile ---------- */

  function initMenu() {
    var bouton = document.querySelector(".menu-bouton");
    var menu = document.getElementById("menu-principal");
    if (!bouton || !menu) return;
    bouton.addEventListener("click", function () {
      var ouvert = menu.classList.toggle("ouvert");
      bouton.setAttribute("aria-expanded", ouvert ? "true" : "false");
    });
  }

  /* ---------- Informations du club ---------- */

  function initInfosClub() {
    // Texte : <span data-club="sorties.quand" data-vide="À préciser bientôt">
    document.querySelectorAll("[data-club]").forEach(function (el) {
      var valeur = String(lire(el.getAttribute("data-club")) || "").trim();
      el.textContent = valeur || el.getAttribute("data-vide") || "À venir";
      if (!valeur) el.classList.add("parcours-vide");
    });

    // Liens : <a data-lien="whatsapp" data-repli="contact.html#rejoindre">
    document.querySelectorAll("[data-lien]").forEach(function (el) {
      var cle = el.getAttribute("data-lien");
      var valeur = String(lire(cle) || "").trim();
      if (cle === "email" && valeur) {
        el.setAttribute("href", "mailto:" + valeur);
        if (!el.hasAttribute("data-garder-texte")) el.textContent = valeur;
      } else if (lienValide(valeur)) {
        el.setAttribute("href", valeur);
        el.setAttribute("rel", "noopener");
        if (el.hasAttribute("data-externe")) el.setAttribute("target", "_blank");
      } else if (el.getAttribute("data-repli")) {
        el.setAttribute("href", el.getAttribute("data-repli"));
      } else {
        // Pas de valeur : on masque l'élément (ou son conteneur désigné)
        var cible = el.closest("[data-masquable]") || el;
        cible.hidden = true;
      }
    });

    // Message affiché seulement tant qu'une information est absente
    document.querySelectorAll("[data-si-absent]").forEach(function (el) {
      if (lienValide(String(lire(el.getAttribute("data-si-absent")) || ""))) el.hidden = true;
    });

    // Si aucun moyen de contact n'est renseigné, on masque toute la section
    document.querySelectorAll(".contacts").forEach(function (bloc) {
      var visibles = Array.prototype.filter.call(bloc.children, function (c) { return !c.hidden; });
      if (!visibles.length) {
        var section = bloc.closest("section");
        if (section) section.hidden = true;
      }
    });
  }

  /* ---------- Parcours ---------- */

  function initParcours() {
    document.querySelectorAll("[data-parcours]").forEach(function (zone) {
      var categorie = zone.getAttribute("data-parcours");
      var liste = (DONNEES.parcours || []).filter(function (p) {
        return p.categorie === categorie;
      });
      var titre = zone.querySelector(".parcours-contenu");
      if (!titre) return;
      titre.textContent = "";

      if (!liste.length) {
        titre.appendChild(creer("p", "parcours-vide", "Parcours à venir. Les idées de sorties circulent déjà sur le groupe WhatsApp."));
        return;
      }

      var p = liste[0];
      titre.appendChild(creer("h3", "", p.nom || "Parcours"));
      var ul = creer("ul", "parcours-liste");
      [["Dénivelé", p.denivele], ["Durée", p.duree], ["Difficulté", p.difficulte], ["Départ", p.depart]]
        .forEach(function (ligne) {
          if (ligne[1]) ul.appendChild(creer("li", "", ligne[0] + " : " + ligne[1]));
        });
      titre.appendChild(ul);
      if (lienValide(p.lien)) {
        var a = creer("a", "", "Voir la trace");
        a.href = p.lien;
        a.rel = "noopener";
        a.target = "_blank";
        a.style.fontWeight = "800";
        titre.appendChild(a);
      }
    });
  }

  /* ---------- Courses ---------- */

  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

  /* Une date peut s'écrire de trois façons dans data/donnees.js :
       "2026-11-28"   date exacte        -> "28 novembre"
       "~2026-11-28"  date approximative -> "Vers le 28 novembre"
       "2027-02"      mois seulement     -> "Février 2027"
     Un champ "fin" facultatif ("2026-11-22") ajoute une deuxième journée. */
  function analyserDate(valeur) {
    var v = String(valeur || "").trim();
    var m;
    if ((m = /^~(\d{4})-(\d{2})-(\d{2})$/.exec(v))) return { type: "environ", a: +m[1], m: +m[2], j: +m[3], tri: m[1] + "-" + m[2] + "-" + m[3] };
    if ((m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v))) return { type: "jour", a: +m[1], m: +m[2], j: +m[3], tri: v };
    if ((m = /^(\d{4})-(\d{2})$/.exec(v))) return { type: "mois", a: +m[1], m: +m[2], j: 0, tri: v + "-99" };
    return { type: "inconnu", a: 0, m: 0, j: 0, tri: "9999" };
  }

  function majuscule(t) { return t.charAt(0).toUpperCase() + t.slice(1); }

  function formaterDate(course) {
    var d = analyserDate(course.date);
    if (d.type === "mois") return majuscule(MOIS[d.m - 1] + " " + d.a);
    if (d.type === "inconnu") return "Date à confirmer";
    var texte = d.j + " " + MOIS[d.m - 1];
    var f = analyserDate(course.fin);
    if (d.type === "jour" && f.type === "jour" && f.tri > d.tri) {
      texte = f.m === d.m ? d.j + " au " + f.j + " " + MOIS[d.m - 1] : d.j + " " + MOIS[d.m - 1] + " au " + f.j + " " + MOIS[f.m - 1];
    }
    return d.type === "environ" ? "Vers le " + texte : texte;
  }

  function encoreAVenir(course, aujourdhui) {
    var d = analyserDate(course.date);
    if (d.type === "inconnu") return true;
    if (d.type === "mois") return d.tri.slice(0, 7) >= aujourdhui.slice(0, 7);
    var f = analyserDate(course.fin);
    var derniere = f.type === "jour" && f.tri > d.tri ? f.tri : d.tri;
    return derniere >= aujourdhui;
  }

  function initCourses() {
    var zone = document.getElementById("liste-courses");
    if (!zone) return;
    var aujourdhui = new Date().toISOString().slice(0, 10);
    var liste = (DONNEES.courses || [])
      .filter(function (c) { return encoreAVenir(c, aujourdhui); })
      .sort(function (a, b) { return analyserDate(a.date).tri.localeCompare(analyserDate(b.date).tri); });

    zone.textContent = "";
    if (!liste.length) {
      var vide = creer("div", "vide");
      vide.appendChild(creer("p", "", "La liste des prochaines courses arrive bientôt."));
      vide.appendChild(creer("p", "", "En attendant, proposez celles qui vous tentent sur le groupe WhatsApp."));
      zone.appendChild(vide);
      return;
    }

    var incertaines = false;
    liste.forEach(function (c) {
      var type = analyserDate(c.date).type;
      if (type !== "jour") incertaines = true;
      var ligne = creer("div", "course");
      ligne.appendChild(creer("span", "course-date", formaterDate(c)));
      var corps = creer("div", "course-corps");
      corps.appendChild(creer("p", "course-nom", c.nom || "Course"));
      var detail = [c.lieu, c.distances].filter(Boolean).join(" · ");
      if (detail) corps.appendChild(creer("p", "course-detail", detail));
      ligne.appendChild(corps);
      if (lienValide(c.lien)) {
        var a = creer("a", "course-lien", "Inscription");
        a.href = c.lien;
        a.rel = "noopener";
        a.target = "_blank";
        ligne.appendChild(a);
      }
      zone.appendChild(ligne);
    });

    if (incertaines) {
      var note = creer("p", "", "« Vers le » ou un mois seul : l’organisateur n’a pas encore confirmé la date exacte. Vérifiez-la avant de vous inscrire.");
      note.style.fontSize = "0.95rem";
      note.style.margin = "20px 0 0";
      zone.appendChild(note);
    }
  }

  /* ---------- Météo (Open-Meteo, sans clé, sans cookie) ---------- */

  var LAT = 47.182;
  var LON = -1.177;

  var ICONES = {
    soleil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    nuages: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 10.5 3.75 3.75 0 0 1 17.5 18z"/></svg>',
    pluie: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 15a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 7.5 3.75 3.75 0 0 1 17.5 15z"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/></svg>',
    neige: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v20M4.2 7l15.6 10M19.8 7L4.2 17"/></svg>',
    orage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 14a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 6.5 3.75 3.75 0 0 1 17.5 14z"/><path d="M12 12l-2 4h4l-2 4"/></svg>',
    brouillard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h16M2 12h20M4 16h16M8 20h8"/></svg>'
  };

  // Codes météo WMO regroupés en situations simples.
  function situation(code) {
    if (code === 0 || code === 1) return { icone: "soleil", texte: "dégagé" };
    if (code === 2) return { icone: "nuages", texte: "éclaircies" };
    if (code === 3) return { icone: "nuages", texte: "couvert" };
    if (code === 45 || code === 48) return { icone: "brouillard", texte: "brouillard" };
    if (code >= 51 && code <= 67) return { icone: "pluie", texte: "pluie" };
    if (code >= 71 && code <= 77) return { icone: "neige", texte: "neige" };
    if (code >= 80 && code <= 82) return { icone: "pluie", texte: "averses" };
    if (code === 85 || code === 86) return { icone: "neige", texte: "averses de neige" };
    if (code >= 95) return { icone: "orage", texte: "orage" };
    return { icone: "nuages", texte: "nuageux" };
  }

  function arrondi(n) { return Math.round(n); }

  function jourSemaine(iso) {
    // 12h UTC pour éviter tout décalage lié au fuseau horaire
    return new Date(iso + "T12:00:00Z").getUTCDay(); // 0 dimanche ... 6 samedi
  }

  function conseil(jours) {
    var bons = jours.filter(function (j) { return j.pluie < 40 && j.vent < 35; });
    if (bons.length === jours.length) return "Beau temps pour sortir ce week-end.";
    if (bons.length === 1) {
      var mauvais = jours.filter(function (j) { return bons.indexOf(j) === -1; })[0];
      var raison = mauvais.pluie >= 40 ? "pluie probable" : "vent soutenu";
      return bons[0].nom + " est le meilleur jour pour sortir (" + raison + " " + mauvais.nom.toLowerCase() + ").";
    }
    return "Week-end plutôt humide ou venteux : confirmez la sortie sur le groupe.";
  }

  function remplirJour(zone, jour) {
    var s = situation(jour.code);
    var carte = creer("div", "meteo-jour");
    carte.appendChild(creer("h3", "", jour.nom));
    var icone = creer("div");
    icone.innerHTML = ICONES[s.icone]; // chaînes SVG statiques définies ci-dessus
    icone.setAttribute("role", "img");
    icone.setAttribute("aria-label", s.texte);
    carte.appendChild(icone);
    carte.appendChild(creer("p", "meteo-jour-temp", arrondi(jour.min) + "° / " + arrondi(jour.max) + "°"));
    carte.appendChild(creer("p", "meteo-jour-detail", "Pluie " + arrondi(jour.pluie) + " % · vent " + arrondi(jour.vent) + " km/h"));
    zone.appendChild(carte);
  }

  function initMeteo() {
    var bloc = document.getElementById("meteo");
    if (!bloc || !window.fetch) return;

    var url = "https://api.open-meteo.com/v1/forecast" +
      "?latitude=" + LAT + "&longitude=" + LON +
      "&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m" +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max" +
      "&timezone=Europe%2FParis&forecast_days=7";

    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error("Réponse " + r.status);
        return r.json();
      })
      .then(function (d) {
        var actuel = d.current;
        var s = situation(actuel.weather_code);
        document.getElementById("meteo-temp").textContent = arrondi(actuel.temperature_2m) + "°C";
        document.getElementById("meteo-detail").textContent =
          "Ressenti " + arrondi(actuel.apparent_temperature) + "°C · " + s.texte + " · vent " + arrondi(actuel.wind_speed_10m) + " km/h";

        var jours = [];
        d.daily.time.forEach(function (iso, i) {
          var j = jourSemaine(iso);
          if (j === 6 || j === 0) {
            jours.push({
              nom: j === 6 ? "Samedi" : "Dimanche",
              code: d.daily.weather_code[i],
              min: d.daily.temperature_2m_min[i],
              max: d.daily.temperature_2m_max[i],
              pluie: d.daily.precipitation_probability_max[i] || 0,
              vent: d.daily.wind_speed_10m_max[i] || 0
            });
          }
        });
        // Un dimanche, on n'affiche que le dimanche en cours.
        jours = jours.length && jours[0].nom === "Dimanche" ? jours.slice(0, 1) : jours.slice(0, 2);

        var zone = document.getElementById("meteo-jours");
        zone.textContent = "";
        jours.forEach(function (j) { remplirJour(zone, j); });
        if (jours.length) {
          zone.appendChild(creer("p", "meteo-conseil", conseil(jours)));
        }
        bloc.removeAttribute("aria-busy");
      })
      .catch(function () {
        document.getElementById("meteo-temp").textContent = "";
        document.getElementById("meteo-detail").textContent =
          "La météo est momentanément indisponible. Rechargez la page dans quelques instants.";
        document.getElementById("meteo-jours").textContent = "";
        bloc.removeAttribute("aria-busy");
      });
  }

  /* ---------- Démarrage ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    initMenu();
    initInfosClub();
    initParcours();
    initCourses();
    initMeteo();
    var annee = document.getElementById("annee");
    if (annee) annee.textContent = new Date().getFullYear();
  });
})();
