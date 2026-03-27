import React, { useState, useEffect } from 'react';

const STORAGE_VERSION = 'v2';

const initialTasks = [
  {
    id: "task_001",
    title: "Heißluftfriteuse vs. Mikrowelle",
    description: "Entscheidung: Heißluftfriteuse kaufen? Mikrowelle verkaufen?",
    category: "Haushalt & Ernährung",
    effort_hours: 2,
    complexity: "niedrig",
    meaningfulness: 8,
    feasibility: 9,
    status: "zurückgestellt",
    progress: 0,
    next_action: "In 2 Monaten erneut prüfen (Ende Mai 2026)",
    goals: ["Gewicht verlieren"],
    created_date: "2026-03-20T19:30:00Z",
    initial_description: "Soll ich mir eine Heißluftfriteuse kaufen? Sie frisst Platz. Soll ich dann meine Mikrowelle verkaufen? Ich könnte vermutlich einfacher und zeitsparender kochen",
    activity_history: [
      { date: "26.03.2026", description: "Zurückgestellt - in 2 Monaten nochmal erinnern" }
    ]
  },
  {
    id: "task_002",
    title: "Uni-Unterlagen strukturiert ablegen",
    description: "Studienunterlagen hochladen, interaktives Lernen + Framework-Vorschläge",
    category: "Lernen & Bildung",
    effort_hours: 8,
    complexity: "mittel",
    meaningfulness: 9,
    feasibility: 7,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Unterlagen hochladen → Ordnerstruktur definieren",
    goals: ["Wissensvertiefung"],
    created_date: "2026-03-20T19:30:00Z",
    initial_description: "Kann ich meine Unterlagen aus der Universität bei dir hochladen - und mit dir entweder Themen nochmals interaktiv lernen oder dich darum bitten mir bei Aufgaben auch eigenständig Frameworks aus dem Studium vorzuschlagen?"
  },
  {
    id: "task_003",
    title: "Körperanalysewaage + Training optimieren",
    description: "Waage mit App, <150€, präzise Body Composition. Tägliche Trainingspläne",
    category: "Gesundheit & Fitness",
    effort_hours: 5,
    complexity: "mittel",
    meaningfulness: 10,
    feasibility: 8,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Top 3 Waagen-Modelle vergleichen",
    goals: ["Gewicht verlieren", "Muskelmasse gewinnen", "In alte Klamotten passen"],
    created_date: "2026-03-20T19:30:00Z",
    initial_description: "Soll ich mir eine Körpergewichtsanalysewaage kaufen, die eine gute App hat, sich einfach mit Apple Health verknüpfen lässt und vor allem meine Body Composition (Muskelmasse und Fettmasse in Körperbereichen) so genau wie möglich erfasst?"
  },
  {
    id: "task_004",
    title: "Wohnung entmüllen (Raum für Raum)",
    description: "Minimalistischer leben: strukturiert durch jeden Raum",
    category: "Organisation & Lifestyle",
    effort_hours: 20,
    complexity: "mittel",
    meaningfulness: 8,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Raum-Liste erstellen → mit kleinstem Raum starten",
    goals: ["Struktur im Alltag"],
    created_date: "2026-03-20T19:30:00Z",
    initial_description: "Ich möchte meine Wohnung entmüllen bzw. minimalistischer leben. Dabei möchte ich strukturiert von Raum zu Raum durchgehen."
  },
  {
    id: "task_005",
    title: "Nationalmannschaftstrikot kaufen?",
    description: "Kaufentscheidung: Nostalgie-Trikot",
    category: "Shopping & Konsum",
    effort_hours: 0.5,
    complexity: "niedrig",
    meaningfulness: 3,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Preis checken → mit Fitness-Zielen abgleichen",
    goals: [],
    created_date: "2026-03-20T19:30:00Z",
    initial_description: "Soll ich mir das alte Nationalmannschaftstrikot kaufen?"
  },
  {
    id: "task_006",
    title: "Rasier-Reminder einrichten",
    description: "Regelmäßige Erinnerung zum Rasieren",
    category: "Selbstpflege",
    effort_hours: 0.25,
    complexity: "niedrig",
    meaningfulness: 4,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Rasier-Rhythmus definieren → Reminder-System wählen",
    goals: [],
    created_date: "2026-03-20T19:30:00Z",
    initial_description: "Reminder von Claude, wann ich mich rasieren sollte"
  },
  {
    id: "task_007",
    title: "Haarconditioner-Reminder",
    description: "Erinnerung: Conditioner nicht täglich nutzen",
    category: "Selbstpflege",
    effort_hours: 0.25,
    complexity: "niedrig",
    meaningfulness: 4,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Optimale Conditioner-Frequenz recherchieren",
    goals: [],
    created_date: "2026-03-20T19:30:00Z",
    initial_description: "Reminder von Claude, wann ich Haarconditioner nehmen soll (nicht täglich!?)."
  },
  {
    id: "task_008",
    title: "Kalender-System einrichten",
    description: "Seit PwC-Laptop-Abgabe keinen Kalender mehr",
    category: "Organisation & Lifestyle",
    effort_hours: 3,
    complexity: "niedrig",
    meaningfulness: 9,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Kalender-Tool wählen (Apple Calendar, Google, Notion?)",
    goals: ["Produktivität", "Struktur im Alltag"],
    created_date: "2026-03-20T20:15:00Z",
    initial_description: "Ich nutze seit der Abgabe meines PwC-Laptops gar keinen Kalender mehr. Ich brauche wieder ein funktionierendes Kalender-System."
  },
  {
    id: "task_009",
    title: "Claude Erkenntnisse nach Projekten sortieren",
    description: "Bisherige Chats strukturiert ablegen - ab Dienstag 15:00",
    category: "Organisation & Lifestyle",
    effort_hours: 5,
    complexity: "mittel",
    meaningfulness: 9,
    feasibility: 8,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Projekt-Struktur definieren",
    goals: ["Produktivität", "Wissensvertiefung"],
    created_date: "2026-03-20T22:10:00Z",
    initial_description: "Bisherige Claude Erkenntnisse und Chats nach Projekten sortieren."
  },
  {
    id: "task_010",
    title: "Github Operating System aufbauen",
    description: "Arbeit am Github-Aufschlag fortführen - ab Dienstag 15:00",
    category: "Beruf & Karriere",
    effort_hours: 15,
    complexity: "hoch",
    meaningfulness: 10,
    feasibility: 7,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Aufschlag reviewen, nächste Schritte planen",
    goals: ["Produktivität", "Struktur im Alltag"],
    created_date: "2026-03-20T22:11:00Z",
    initial_description: "Sobald Volumen verfügbar, Arbeit an Github-Aufschlag fortführen."
  },
  {
    id: "task_011",
    title: "Termine 23.-25.03. vorbereiten",
    description: "Buntscheck (9:30, Notizbuch + 306€ + 40g Elv), EKG Hausarzt (11:00/11:30, Überweisung, Ergebnisse per E-Mail), Stübig (24.03. 10:00, PKV-GKV, BU auf 100€, Volkswohlbund beitragsfrei), Amélie Babysitting (25.03. 13:00-18:30)",
    category: "Organisation & Lifestyle",
    effort_hours: 2,
    complexity: "niedrig",
    meaningfulness: 10,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Notizbuch + 306€ + 40g Elv vorbereiten, Überweisung holen",
    goals: ["Gesundheit", "Struktur im Alltag"],
    created_date: "2026-03-20T22:12:00Z",
    initial_description: "23.03. 9:30 Buntscheck, 11:00/11:30 Hausarzt EKG. 24.03. 10:00 Stübig. 25.03. 13:00-18:30 Amélie Babysitting."
  },
  {
    id: "task_012",
    title: "Hautarzt-Termin wegen Füßen via BKK PwC",
    description: "Termin vereinbaren via BKK-Telefonat",
    category: "Gesundheit & Fitness",
    effort_hours: 0.5,
    complexity: "niedrig",
    meaningfulness: 7,
    feasibility: 10,
    status: "in Arbeit",
    progress: 50,
    next_action: "Auf Mail von BKK mit Terminvorschlägen warten",
    goals: ["Gesundheit"],
    created_date: "2026-03-20T22:13:00Z",
    initial_description: "Hautarzt-Termin wg. Füßen via BKK PwC.",
    activity_history: [
      { date: "26.03.2026", description: "BKK angerufen; Mail mit Terminvorschlägen kommt" }
    ]
  },
  {
    id: "task_013",
    title: "SWM wegen Geld kontaktieren",
    description: "Offene Geldfragen mit SWM klären",
    category: "Finanzen",
    effort_hours: 0.5,
    complexity: "niedrig",
    meaningfulness: 6,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "SWM kontaktieren",
    goals: [],
    created_date: "2026-03-20T22:13:00Z",
    initial_description: "SWM wegen Geld kontaktieren."
  },
  {
    id: "task_014",
    title: "Dokumente ordentlich wegsortieren",
    description: "Papierkram strukturieren",
    category: "Organisation & Lifestyle",
    effort_hours: 3,
    complexity: "niedrig",
    meaningfulness: 7,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ablagesystem einrichten, Dokumente durchgehen",
    goals: ["Struktur im Alltag"],
    created_date: "2026-03-20T22:14:00Z",
    initial_description: "Dokumente ordentlich wegsortieren."
  },
  {
    id: "task_015",
    title: "Aktivitäten für 21.03.",
    description: "Churros, Klamotten testen/aussortieren/spenden, Kochen/Sushi",
    category: "Organisation & Lifestyle",
    effort_hours: 4,
    complexity: "niedrig",
    meaningfulness: 6,
    feasibility: 10,
    status: "abgeschlossen",
    progress: 100,
    next_action: "Erledigt",
    goals: [],
    created_date: "2026-03-20T22:14:00Z",
    initial_description: "Ideen für den 21.03.: Churros, Klamotten testen und aussortieren, Klamotten spenden, Einkaufen und Kochen, Sushi bestellen.",
    activity_history: [
      { date: "26.03.2026", description: "Abgeschlossen" }
    ]
  },
  {
    id: "task_016",
    title: "Parkplatz & Fotoalbum mit Patricia",
    description: "Gemeinsame Projekte koordinieren",
    category: "Beziehung & Soziales",
    effort_hours: 2,
    complexity: "niedrig",
    meaningfulness: 8,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Termin mit Patricia abstimmen",
    goals: [],
    created_date: "2026-03-20T22:14:00Z",
    initial_description: "Parkplatz mit Patricia. Fotoalbum mit Patricia."
  },
  {
    id: "task_017",
    title: "Freunde kontaktieren: Maxim, Yannik, Hendrik, Olaf, Sven",
    description: "5 Freunde erreichen",
    category: "Beziehung & Soziales",
    effort_hours: 1,
    complexity: "niedrig",
    meaningfulness: 7,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Nachrichten schreiben oder anrufen",
    goals: [],
    created_date: "2026-03-20T22:14:00Z",
    initial_description: "Maxim & Yannik & Hendrik & Olaf & Sven kontaktieren."
  },
  {
    id: "task_018",
    title: "Ostern-Planung: Wo verbringe ich die Feiertage?",
    description: "Entscheiden wo ich Ostern verbringe",
    category: "Familie",
    effort_hours: 0.5,
    complexity: "niedrig",
    meaningfulness: 6,
    feasibility: 10,
    status: "in Arbeit",
    progress: 50,
    next_action: "Auf Desirées Plan warten, dann finalisieren",
    goals: [],
    created_date: "2026-03-20T13:50:00Z",
    initial_description: "Wo verbringe ich Ostern?",
    activity_history: [
      { date: "22.03.2026", description: "Bei Desirée nach ihrem Plan erkundigt" }
    ]
  },
  {
    id: "task_019",
    title: "Tempo Göttingen: Papa mitteilen",
    description: "Papa sagen: keine Beiträge mehr",
    category: "Familie",
    effort_hours: 0.5,
    complexity: "niedrig",
    meaningfulness: 7,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Gespräch vorbereiten, Papa anrufen",
    goals: [],
    created_date: "2026-03-20T13:50:00Z",
    initial_description: "Papa sagen, dass ich seine Beiträge für Tempo Göttingen nicht weiter zahlen möchte."
  },
  {
    id: "task_020",
    title: "Freizeitideen sammeln",
    description: "Fahrrad, Aldi, ESV München, Schach, Autofahren, Deutschlandticket",
    category: "Organisation & Lifestyle",
    effort_hours: 1,
    complexity: "niedrig",
    meaningfulness: 5,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Liste erstellen, Prioritäten setzen",
    goals: [],
    created_date: "2026-03-20T13:50:00Z",
    initial_description: "Fantasie von Fahrrad, Aldi-Einkauf, ESV München, Schachverein, Autofahren und Deutschlandticket notieren."
  },
  {
    id: "task_021",
    title: "WhatsApp aufräumen (190 Chats)",
    description: "Chat-Daten exportieren, kategorisieren, Erinnerungen einrichten",
    category: "Organisation & Lifestyle",
    effort_hours: 8,
    complexity: "mittel",
    meaningfulness: 8,
    feasibility: 7,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - WhatsApp-Export-Optionen prüfen",
    goals: ["Struktur im Alltag"],
    created_date: "2026-03-20T13:55:00Z",
    initial_description: "190 offene Chats sortieren. Viele alt. Bei vielen unangenehm. Regelmäßige Reminder für wichtige Kontakte."
  },
  {
    id: "task_022",
    title: "Outlook & Gmail aufräumen + automatisierte Filterregeln",
    description: "E-Mail-Chaos beenden, Newsletter abmelden, Regeln erstellen",
    category: "Organisation & Lifestyle",
    effort_hours: 6,
    complexity: "mittel",
    meaningfulness: 8,
    feasibility: 8,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Absender-Liste exportieren",
    goals: ["Struktur im Alltag", "Produktivität"],
    created_date: "2026-03-20T13:56:00Z",
    initial_description: "Outlook und Gmail aufräumen. Unnötige E-Mails automatisiert löschen."
  },
  {
    id: "task_023",
    title: "Fort Knox - Umfassende Datensicherheitsstrategie",
    description: "Passwörter, PIN-Codes, sensible Daten bestmöglich schützen",
    category: "Organisation & Lifestyle",
    effort_hours: 4,
    complexity: "mittel",
    meaningfulness: 10,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Sicherheits-Audit starten",
    goals: ["Struktur im Alltag"],
    created_date: "2026-03-20T13:57:00Z",
    initial_description: "Persönliche Daten bestmöglich schützen. Smarter Umgang mit Passwörtern, PINs."
  },
  {
    id: "task_024",
    title: "Cloud- & Backup-Strategie (OneDrive, externe Festplatte, Handy-Fotos)",
    description: "3-2-1 Backup-Regel umsetzen, Foto-Upload automatisieren",
    category: "Organisation & Lifestyle",
    effort_hours: 5,
    complexity: "mittel",
    meaningfulness: 9,
    feasibility: 8,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - OneDrive-Struktur planen",
    goals: ["Struktur im Alltag"],
    created_date: "2026-03-20T13:58:00Z",
    initial_description: "Wo speichere ich Daten, Fotos, Claude-Daten? Backup-System. Fotos automatisch hochladen."
  },
  {
    id: "task_025",
    title: "Handyvertrag mit Schweiz-Option (ab 07.04. regelmäßig dort)",
    description: "Tarif finden für 3 Wochen + dann monatlich 1 Woche Schweiz",
    category: "Finanzen",
    effort_hours: 2,
    complexity: "niedrig",
    meaningfulness: 9,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Tarife vergleichen (Deadline: 05.04.)",
    goals: [],
    created_date: "2026-03-20T13:59:00Z",
    initial_description: "Ab 07.04. für drei Wochen und danach jeden Monat für eine Woche in der Schweiz."
  },
  {
    id: "task_026",
    title: "Web Search & andere Claude-Features aktivieren",
    description: "Settings checken: Web Search, Deep Research etc.",
    category: "Organisation & Lifestyle",
    effort_hours: 0.5,
    complexity: "niedrig",
    meaningfulness: 8,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Claude-Einstellungen öffnen → Features aktivieren",
    goals: ["Produktivität"],
    created_date: "2026-03-20T14:00:00Z",
    initial_description: "Web Search und andere Claude-Features aktivieren für bessere Recherchen."
  },
  {
    id: "task_027",
    title: "Intelligentes Ernährungs- & Einkaufssystem mit Kassenbon-Scan",
    description: "App-Konzept: Kassenbon → Nährwerte, Rezepte, Preise, Einkaufslisten",
    category: "Gesundheit & Fitness",
    effort_hours: 10,
    complexity: "hoch",
    meaningfulness: 10,
    feasibility: 7,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - MVP-Spec schreiben",
    goals: ["Gewicht verlieren", "Muskelmasse gewinnen"],
    created_date: "2026-03-20T14:01:00Z",
    initial_description: "Kassenbon fotografieren → Artikel, Nährwerte, Rezepte, Preise tracken. Smarte Einkaufslisten."
  },
  {
    id: "task_028",
    title: "App-Entwicklung als Einnahmequelle evaluieren (Kassenbon-Scan als Case)",
    description: "Machbarkeit, Zeitaufwand, rechtliche Hürden, Business-Modell prüfen",
    category: "Beruf & Karriere",
    effort_hours: 3,
    complexity: "mittel",
    meaningfulness: 9,
    feasibility: 8,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Marktanalyse & MVP-Plan",
    goals: ["Produktivität"],
    created_date: "2026-03-20T14:02:00Z",
    initial_description: "Könnte ich mit Claude Code eine App bauen und verkaufen? Machbarkeit, Zeitaufwand, rechtliche Hürden?"
  },
  {
    id: "task_029",
    title: "Jake schreiben",
    description: "Nachricht an Jake schicken",
    category: "Beziehung & Soziales",
    effort_hours: 0.25,
    complexity: "niedrig",
    meaningfulness: 6,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Nachricht verfassen und senden",
    goals: [],
    created_date: "2026-03-20T14:03:00Z",
    initial_description: "Jake schreiben."
  },
  {
    id: "task_030",
    title: "Waschmaschinenfilter checken & reinigen",
    description: "Filter prüfen und bei Bedarf säubern",
    category: "Haushalt & Ernährung",
    effort_hours: 0.5,
    complexity: "niedrig",
    meaningfulness: 5,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Waschmaschine öffnen, Filter lokalisieren, reinigen",
    goals: [],
    created_date: "2026-03-20T14:03:00Z",
    initial_description: "Waschmaschinenfilter checken und ggf. reinigen."
  },
  {
    id: "task_031",
    title: "Garderobe weiter ausmisten (Oberteile, Jacken, Accessoires)",
    description: "Decluttering fortsetzen (Hosen, Schuhe, Schals, Hemden bereits fertig)",
    category: "Organisation & Lifestyle",
    effort_hours: 3,
    complexity: "niedrig",
    meaningfulness: 7,
    feasibility: 9,
    status: "in Arbeit",
    progress: 50,
    next_action: "Zuordnung mit P.'s Hilfe",
    goals: ["Struktur im Alltag"],
    created_date: "2026-03-20T14:04:00Z",
    initial_description: "Weiteres Decluttering meiner Garderobe.",
    activity_history: [
      { date: "26.03.2026", description: "Sortierung erfolgt; nun Zuordnung mit P." }
    ]
  },
  {
    id: "task_032",
    title: "Motivations-Wasserflasche mit Zeitmarkierungen kaufen",
    description: "Flasche mit Strichen für Trink-Tracking über den Tag",
    category: "Gesundheit & Fitness",
    effort_hours: 0.5,
    complexity: "niedrig",
    meaningfulness: 6,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Online recherchieren, bestellen",
    goals: ["Gesundheit"],
    created_date: "2026-03-20T14:05:00Z",
    initial_description: "Flaschen mit Strichen kaufen für besseres Trink-Tracking."
  },
  {
    id: "task_033",
    title: "Haushalts-Reminder-System (Rohrreinigung, Bettwäsche, Entkalken, Entstauben)",
    description: "Regelmäßige Erinnerungen für Haushalts-Tasks",
    category: "Haushalt & Ernährung",
    effort_hours: 1,
    complexity: "niedrig",
    meaningfulness: 7,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Liste erstellen, Intervalle festlegen",
    goals: ["Struktur im Alltag"],
    created_date: "2026-03-20T14:06:00Z",
    initial_description: "Reminder für Haushalts-Tasks."
  },
  {
    id: "task_034",
    title: "Friseur-Reminder + 'Raus aus München'-Erinnerung",
    description: "Regelmäßige Erinnerung für Friseur & neue Orte erkunden",
    category: "Selbstpflege",
    effort_hours: 0.5,
    complexity: "niedrig",
    meaningfulness: 6,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Rhythmus festlegen (Friseur alle 6-8 Wochen, Trips monatlich?)",
    goals: [],
    created_date: "2026-03-20T14:07:00Z",
    initial_description: "Reminder für Friseurbesuch und wenn zu lange in München."
  },
  {
    id: "task_035",
    title: "Interaktive Reise-Weltkarte (war ich/will ich hin/Events/Prioritäten)",
    description: "Visualisierung aller Reise-Ziele mit Begründungen",
    category: "Organisation & Lifestyle",
    effort_hours: 4,
    complexity: "mittel",
    meaningfulness: 7,
    feasibility: 8,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Karte erstellen, Orte eintragen",
    goals: [],
    created_date: "2026-03-20T14:08:00Z",
    initial_description: "Interaktive Weltkarte mit allen Reise-Zielen und Begründungen."
  },
  {
    id: "task_036",
    title: "TODO-System evaluieren: Quick-Wins-Kachel für kleine Tasks?",
    description: "Checken ob kleine TODOs besser als Auffangbecken strukturiert werden",
    category: "Organisation & Lifestyle",
    effort_hours: 2,
    complexity: "niedrig",
    meaningfulness: 8,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Dashboard-Struktur überdenken",
    goals: ["Produktivität", "Struktur im Alltag"],
    created_date: "2026-03-20T14:09:00Z",
    initial_description: "Checken ob kleine Tasks wie 'Jake schreiben' eine Quick-Wins-Section brauchen."
  },
  {
    id: "task_037",
    title: "Private Time-Modus (nur Familie + dringendste Notifications)",
    description: "Fokuszeit ohne Störungen, aber Familie bleibt erreichbar",
    category: "Organisation & Lifestyle",
    effort_hours: 1,
    complexity: "niedrig",
    meaningfulness: 8,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "iPhone Focus-Modi einrichten oder App nutzen",
    goals: ["Produktivität"],
    created_date: "2026-03-20T14:10:00Z",
    initial_description: "Fokuszeit ohne Störungen, aber Familie bleibt erreichbar."
  },
  {
    id: "task_038",
    title: "Wöchentliches Claude-Feedback-Format (Patterns, Fortschritte, blinde Flecken)",
    description: "Regelmäßige Meta-Reviews aus Chat-History",
    category: "Organisation & Lifestyle",
    effort_hours: 3,
    complexity: "mittel",
    meaningfulness: 9,
    feasibility: 8,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Format definieren, ersten Report erstellen",
    goals: ["Produktivität", "Wissensvertiefung"],
    created_date: "2026-03-20T14:11:00Z",
    initial_description: "Regelmäßige Meta-Reviews: Was fällt mir in deinen Chats auf?"
  },
  {
    id: "task_039",
    title: "Interaktives Lernsystem mit Claude (Audio/Video/Dashboard + Spaced Repetition)",
    description: "Multi-Format-Lernen mit strukturierter Ablage",
    category: "Lernen & Bildung",
    effort_hours: 8,
    complexity: "hoch",
    meaningfulness: 10,
    feasibility: 7,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Systemarchitektur planen",
    goals: ["Wissensvertiefung"],
    created_date: "2026-03-20T14:12:00Z",
    initial_description: "Multi-Format-Lernen mit strukturierter Ablage."
  },
  {
    id: "task_040",
    title: "Personen-basiertes Wissens-Modeling (Atrioc, Scott Galloway)",
    description: "Gezieltes Training in deren Expertise-Bereichen",
    category: "Lernen & Bildung",
    effort_hours: 15,
    complexity: "hoch",
    meaningfulness: 10,
    feasibility: 7,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Atrioc-Profil erstellen, Curriculum planen",
    goals: ["Wissensvertiefung"],
    created_date: "2026-03-20T14:13:00Z",
    initial_description: "Profile erstellen, gezieltes Training wie Atrioc/Galloway zu denken."
  },
  {
    id: "task_041",
    title: "Geschenkideen-Datenbank aufbauen",
    description: "Systematisch Geschenkideen für verschiedene Personen abspeichern",
    category: "Beziehung & Soziales",
    effort_hours: 2,
    complexity: "niedrig",
    meaningfulness: 7,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Struktur aufsetzen, erste Ideen sammeln",
    goals: [],
    created_date: "2026-03-20T14:14:00Z",
    initial_description: "Geschenkideen systematisch abspeichern."
  },
  {
    id: "task_042",
    title: "Schlafzimmer dekorieren (Holzbrett + Trikots + Bilder aufhängen)",
    description: "Holzbrett mit Foto + 1-3 Trikots gerahmt + weitere Wanddeko",
    category: "Organisation & Lifestyle",
    effort_hours: 3,
    complexity: "niedrig",
    meaningfulness: 6,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Holzbrett + Rahmen kaufen, Fotos aussuchen",
    goals: [],
    created_date: "2026-03-20T14:15:00Z",
    initial_description: "Holzbrett mit Familienfoto + 1-3 Trikots gerahmt."
  },
  {
    id: "task_043",
    title: "Blaulichtfilter-Brillen recherchieren (Premium ohne Sehstärke)",
    description: "Prüfen ob teure Modelle sich lohnen für Schlaf & Augen",
    category: "Gesundheit & Fitness",
    effort_hours: 1,
    complexity: "niedrig",
    meaningfulness: 6,
    feasibility: 9,
    status: "zurückgestellt",
    progress: 0,
    next_action: "In 2 Monaten erneut prüfen (Ende Mai 2026)",
    goals: ["Gesundheit"],
    created_date: "2026-03-20T14:16:00Z",
    initial_description: "Checken ob teure Blaulichtfilter-Brillen sich lohnen.",
    activity_history: [
      { date: "26.03.2026", description: "Zurückgestellt - in 2 Monaten nochmal erinnern" }
    ]
  },
  {
    id: "task_044",
    title: "Steuererklärungen machen",
    description: "Alle ausstehenden Steuererklärungen einreichen",
    category: "Finanzen",
    effort_hours: 8,
    complexity: "hoch",
    meaningfulness: 10,
    feasibility: 7,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Welche Jahre fehlen? Unterlagen sammeln",
    goals: [],
    created_date: "2026-03-20T14:17:00Z",
    initial_description: "Steuererklärungen."
  },
  {
    id: "task_045",
    title: "Real Bayern CL mit Freunden schauen organisieren?",
    description: "Event planen falls Real vs Bayern stattfindet",
    category: "Beziehung & Soziales",
    effort_hours: 1,
    complexity: "niedrig",
    meaningfulness: 5,
    feasibility: 9,
    status: "abgeschlossen",
    progress: 100,
    next_action: "Erledigt - Nein, nicht organisieren",
    goals: [],
    created_date: "2026-03-20T14:18:00Z",
    initial_description: "Real Bayern CL mit Freunden gucken?",
    activity_history: [
      { date: "26.03.2026", description: "Entschieden: Nein, nicht organisieren" }
    ]
  },
  {
    id: "task_046",
    title: "Finanzdashboard-System evaluieren (Forderungen, Verkäufe, Kündigungen)",
    description: "3-Säulen-System: TODO-Board + Finanzdashboard + Kalender",
    category: "Finanzen",
    effort_hours: 3,
    complexity: "mittel",
    meaningfulness: 9,
    feasibility: 8,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Finanzdashboard bauen (D. 610€, SWM, Parkplatz, Tempo kündigen)",
    goals: [],
    created_date: "2026-03-20T14:19:00Z",
    initial_description: "D. 610€, SWM, Parkplatz verkaufen, Tempo kündigen."
  },
  {
    id: "task_047",
    title: "Notizenapp aufräumen (iPad Arbeitsnotizen + iPhone)",
    description: "Digitale Notizen strukturieren/löschen",
    category: "Organisation & Lifestyle",
    effort_hours: 2,
    complexity: "niedrig",
    meaningfulness: 7,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Notizen durchgehen, Kategorien erstellen, Wichtiges behalten",
    goals: ["Struktur im Alltag"],
    created_date: "2026-03-20T14:20:00Z",
    initial_description: "Digitale Notizen entrümpeln."
  },
  {
    id: "task_048",
    title: "Wichtige Dokumente in Claude ablegen (Lebenslauf, Bewerbungsfotos etc.)",
    description: "Zentrale Ablage für schnellen Zugriff",
    category: "Organisation & Lifestyle",
    effort_hours: 1,
    complexity: "niedrig",
    meaningfulness: 8,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Im Rahmen von Fort Knox besprechen",
    goals: ["Produktivität"],
    created_date: "2026-03-20T14:21:00Z",
    initial_description: "Wichtige Dokumente griffbereit haben."
  },
  {
    id: "task_049",
    title: "Regelmäßiger Ohrenspülungs-Reminder",
    description: "Erinnerung für Ohrenspülung einrichten",
    category: "Gesundheit & Fitness",
    effort_hours: 0.25,
    complexity: "niedrig",
    meaningfulness: 6,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Rhythmus festlegen, in Reminder-System aufnehmen",
    goals: ["Gesundheit"],
    created_date: "2026-03-20T14:22:00Z",
    initial_description: "Regelmäßiger Reminder Ohrenspülung."
  },
  {
    id: "task_050",
    title: "Regelmäßiger Reminder professionelle Zahnreinigung",
    description: "Halbjährliche Erinnerung für PZR (ARAG übernimmt 2x 60€/Jahr)",
    category: "Gesundheit & Fitness",
    effort_hours: 0.25,
    complexity: "niedrig",
    meaningfulness: 7,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Alle 6 Monate Termin vereinbaren",
    goals: ["Gesundheit"],
    created_date: "2026-03-20T14:22:00Z",
    initial_description: "Regelmäßiger Reminder professionelle Zahnreinigung.",
    activity_history: [
      { date: "25.03.2026", description: "Info von Desirée: ARAG übernimmt 2x 60€ im Jahr" }
    ]
  },
  {
    id: "task_051",
    title: "Fußballspiele automatisch in Kalender aufnehmen",
    description: "Bayern-Spiele + wichtige Events automatisch tracken",
    category: "Organisation & Lifestyle",
    effort_hours: 1,
    complexity: "niedrig",
    meaningfulness: 6,
    feasibility: 8,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Kalender-Integration einrichten",
    goals: [],
    created_date: "2026-03-20T14:23:00Z",
    initial_description: "Fußballspiele automatisch in Kalender aufnehmen."
  },
  {
    id: "task_052",
    title: "ALTA App-Integration (Kleiderschrank digitalisieren + AI-Outfits)",
    description: "Klamotten katalogisieren, Outfit-Vorschläge automatisieren",
    category: "Organisation & Lifestyle",
    effort_hours: 3,
    complexity: "niedrig",
    meaningfulness: 7,
    feasibility: 8,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - ALTA testen, Integration mit Claude planen",
    goals: [],
    created_date: "2026-03-20T14:24:00Z",
    initial_description: "Klamotten katalogisieren, Outfit-Vorschläge automatisieren."
  },
  {
    id: "task_053",
    title: "Runstar Körperfettwaage evaluieren (8 Elektroden, Datenweiterleitung)",
    description: "8 Elektroden, Datenweiterleitung an Claude prüfen",
    category: "Gesundheit & Fitness",
    effort_hours: 2,
    complexity: "niedrig",
    meaningfulness: 9,
    feasibility: 9,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Ab Dienstag 15:00 - Vergleich mit Alternativen, Datenexport einrichten",
    goals: ["Gewicht verlieren", "Muskelmasse gewinnen"],
    created_date: "2026-03-20T16:10:00Z",
    initial_description: "Runstar-Körperfettwaage mit 8 Elektroden. Datenweiterleitung an Claude möglich?"
  },
  {
    id: "task_054",
    title: "BLP Diskussion fortführen",
    description: "Antwort erhalten, Diskussion nicht abgeschlossen",
    category: "Beziehung & Soziales",
    effort_hours: 1,
    complexity: "niedrig",
    meaningfulness: 6,
    feasibility: 10,
    status: "nicht gestartet",
    progress: 0,
    next_action: "Nachricht lesen, antworten",
    goals: [],
    created_date: "2026-03-20T16:12:00Z",
    initial_description: "BLP geantwortet (Diskussion noch nicht abgeschlossen)."
  }
];

const complexityFactors = {
  'niedrig': 1,
  'mittel': 1.5,
  'hoch': 2.5
};

const calculatePriorityScore = (task) => {
  const effortFactor = task.effort_hours <= 1 ? 0.8 : task.effort_hours <= 5 ? 1 : 1.3;
  const goalImpact = task.goals && task.goals.length > 0 ? task.goals.length * 1.2 : 0.5;
  const urgency = 5;
  
  const score = (task.meaningfulness * urgency * goalImpact * task.feasibility) / 
                (complexityFactors[task.complexity] * effortFactor * 10);
  
  return {
    meaningfulness: task.meaningfulness,
    feasibility: task.feasibility,
    complexity: complexityFactors[task.complexity],
    effort: effortFactor,
    goalImpact: goalImpact,
    urgency: urgency,
    total: Math.round(score)
  };
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatText = (text) => {
  if (!text) return '';
  
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^### (.+)$/gm, '<div style="font-size:15px;font-weight:600;margin:12px 0 6px">$1</div>')
    .replace(/^## (.+)$/gm, '<div style="font-size:16px;font-weight:600;margin:14px 0 6px">$1</div>')
    .replace(/^# (.+)$/gm, '<div style="font-size:17px;font-weight:600;margin:16px 0 8px">$1</div>')
    .replace(/^- (.+)$/gm, '<div style="margin-left:16px;margin-bottom:4px">• $1</div>')
    .replace(/^(\d+)\. (.+)$/gm, '<div style="margin-left:16px;margin-bottom:4px"><strong>$1.</strong> $2</div>')
    .replace(/\n{3,}/g, '<br/>')
    .replace(/\n\n/g, '<br/>');
};

const TaskCard = ({ task, onStart }) => {
  const [showFormula, setShowFormula] = useState(false);
  const score = calculatePriorityScore(task);
  
  const progressColor = task.progress === 0 
    ? 'text-gray-400' 
    : task.progress < 50 
    ? 'text-amber-600' 
    : task.progress < 100 
    ? 'text-blue-600' 
    : 'text-emerald-600';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1.5 text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>📅 {formatDate(task.created_date)}</span>
            <span className={`font-medium ${progressColor}`}>• {task.progress}%</span>
          </div>
        </div>
        <div className="ml-4 text-right">
          <div 
            className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => setShowFormula(!showFormula)}
          >
            {score.total}
          </div>
          <div className="text-xs text-gray-500">Priorität</div>
          {showFormula && (
            <div className="mt-3 text-xs text-gray-600 text-left bg-gray-50 p-3 rounded-xl shadow-sm min-w-[180px] border">
              <div className="text-[10px] font-semibold text-gray-400 mb-2">FORMEL</div>
              <div className="text-[10px] text-gray-500 mb-3 font-mono">
                ({score.meaningfulness} × {score.urgency} × {score.goalImpact.toFixed(1)} × {score.feasibility}) ÷ ({score.complexity} × {score.effort.toFixed(1)} × 10) = {score.total}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
        <div 
          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all" 
          style={{ width: `${task.progress}%` }}
        />
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        <span className="bg-gray-50 text-gray-700 text-xs px-3 py-1.5 rounded-full border">{task.category}</span>
        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
          task.complexity === 'niedrig' 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : task.complexity === 'mittel' 
            ? 'bg-amber-50 text-amber-700 border-amber-200'
            : 'bg-rose-50 text-rose-700 border-rose-200'
        }`}>
          {task.complexity}
        </span>
        <span className="bg-gray-50 text-gray-700 text-xs px-3 py-1.5 rounded-full border">⏱️ {task.effort_hours}h</span>
        <span className="bg-gray-50 text-gray-700 text-xs px-3 py-1.5 rounded-full border">💡 {task.meaningfulness}/10</span>
        <span className="bg-gray-50 text-gray-700 text-xs px-3 py-1.5 rounded-full border">✓ {task.feasibility}/10</span>
      </div>

      {task.goals && task.goals.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {task.goals.map((goal, idx) => (
            <span key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs px-3 py-1.5 rounded-full border border-blue-200">
              🎯 {goal}
            </span>
          ))}
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-4 mb-4 border">
        <div className="text-xs font-semibold text-gray-500 mb-1.5">Nächster Schritt</div>
        <div className="text-sm text-gray-800">{task.next_action}</div>
      </div>

      <button
        onClick={() => onStart(task)}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
      >
        Starten →
      </button>
    </div>
  );
};

const Modal = ({ task, onClose, tasks, setTasks }) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (task) {
      loadTaskData();
    }
  }, [task?.id]);

  const loadTaskData = async () => {
    try {
      const cacheKey = `${STORAGE_VERSION}-task-${task.id}`;
      const cached = await window.storage.get(cacheKey);
      
      let hasAssessment = false;
      if (cached?.value) {
        const data = JSON.parse(cached.value);
        setResponse(data.assessment || '');
        setMessages(data.chatHistory || []);
        if (data.summary) {
          setSummary(data.summary);
        } else {
          generateSummary();
        }
        hasAssessment = !!data.assessment;
      } else {
        generateSummary();
      }
      
      if (!hasAssessment) {
        generateAssessment();
      }
    } catch (error) {
      generateSummary();
      generateAssessment();
    }
  };

  const generateSummary = async () => {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 200,
          messages: [{
            role: "user",
            content: `Fasse in 2-3 Bullet Points zusammen (max 60 Zeichen pro Punkt):\n\n"${task.initial_description}"`
          }]
        })
      });

      const data = await response.json();
      const summaryText = data.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("\n");
      setSummary(summaryText);
    } catch (error) {
      const sentences = task.initial_description.split(/[.?!]+/).filter(s => s.trim().length > 10);
      setSummary(sentences.slice(0, 2).map(s => `• ${s.trim().slice(0, 60)}...`).join('\n'));
    }
  };

  const saveTaskData = async (assessment, chatHistory) => {
    try {
      const cacheKey = `${STORAGE_VERSION}-task-${task.id}`;
      await window.storage.set(cacheKey, JSON.stringify({
        assessment: assessment || response,
        chatHistory: chatHistory || messages,
        summary: summary
      }));
    } catch (error) {
      console.error('Failed to save task data:', error);
    }
  };

  const generateAssessment = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 3000,
          messages: [{
            role: "user",
            content: `Aufgabe: ${task.title}\n\n"${task.initial_description}"\n\nBitte:\n1. Ausführliche Einschätzung\n2. Konkrete nächste Schritte`
          }]
        })
      });

      const data = await response.json();
      const assessmentText = data.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("\n");
      setResponse(assessmentText);
      await saveTaskData(assessmentText, []);
    } catch (error) {
      setResponse("Fehler beim Laden der Einschätzung");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || chatLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setChatLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 3000,
          messages: [
            {
              role: 'user',
              content: `Kontext: "${task.title}"\n\n${task.initial_description}\n\nEinschätzung:\n${response}`
            },
            {
              role: 'assistant',
              content: 'OK, ich verstehe den Kontext.'
            },
            ...newMessages.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          ]
        })
      });

      const data = await response.json();
      const assistantMessage = data.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("\n");
      
      const updatedMessages = [...newMessages, { role: 'assistant', content: assistantMessage }];
      setMessages(updatedMessages);
      await saveTaskData(response, updatedMessages);
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: 'Fehler beim Senden der Nachricht' }]);
    } finally {
      setChatLoading(false);
    }
  };

  if (!task) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="text-xs font-semibold text-blue-600 uppercase mb-2">📋 Beschreibung</div>
            <div className="text-sm text-gray-800">{task.initial_description}</div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <div className="text-xs font-semibold text-purple-600 uppercase mb-2">✨ Zusammenfassung</div>
            <div className="text-sm text-gray-800 whitespace-pre-line">{summary}</div>
          </div>

          {task.activity_history && task.activity_history.length > 0 && (
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="text-xs font-semibold text-amber-600 uppercase mb-2">📊 Aktivitäten</div>
              <div className="text-sm text-gray-800 whitespace-pre-line">
                {task.activity_history.map((activity, idx) => (
                  <div key={idx}>• {activity.date}: {activity.description}</div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="bg-gray-50 rounded-xl p-6 border text-center">
              <div className="animate-pulse text-gray-600">Claude denkt...</div>
            </div>
          )}

          {response && (
            <>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
                <div className="text-xs font-semibold text-indigo-600 uppercase mb-2">💬 Claude's Einschätzung</div>
                <div 
                  className="text-sm text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatText(response) }}
                />
              </div>

              {messages.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4 border max-h-64 overflow-y-auto">
                  <div className="text-xs font-semibold text-gray-600 uppercase mb-3">💭 Chat</div>
                  <div className="space-y-3">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                        <div className={`inline-block max-w-[80%] rounded-lg p-3 ${
                          msg.role === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white border text-gray-800'
                        }`}>
                          <div 
                            className="text-sm"
                            dangerouslySetInnerHTML={{ 
                              __html: msg.role === 'assistant' ? formatText(msg.content) : msg.content 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="text-left">
                        <div className="inline-block bg-white border rounded-lg p-3">
                          <div className="text-sm text-gray-600 animate-pulse">...</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Folgefrage..."
                  className="flex-1 px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={chatLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={chatLoading || !input.trim()}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all"
                >
                  →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function TodoDashboard() {
  const [tasks, setTasks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const result = await window.storage.get(`${STORAGE_VERSION}-tasks`);
      if (result?.value) {
        setTasks(JSON.parse(result.value));
      } else {
        await window.storage.set(`${STORAGE_VERSION}-tasks`, JSON.stringify(initialTasks));
        setTasks(initialTasks);
      }
    } catch (error) {
      setTasks(initialTasks);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTasks = async (updatedTasks) => {
    try {
      await window.storage.set(`${STORAGE_VERSION}-tasks`, JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  const categories = [...new Set(tasks.map(task => task.category))].sort();

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(task => task.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (sortBy === 'priority') {
      filtered.sort((a, b) => calculatePriorityScore(b).total - calculatePriorityScore(a).total);
    } else if (sortBy === 'meaningfulness') {
      filtered.sort((a, b) => b.meaningfulness - a.meaningfulness);
    } else if (sortBy === 'feasibility') {
      filtered.sort((a, b) => b.feasibility - a.feasibility);
    } else if (sortBy === 'effort') {
      filtered.sort((a, b) => a.effort_hours - b.effort_hours);
    } else if (sortBy === 'complexity') {
      filtered.sort((a, b) => complexityFactors[a.complexity] - complexityFactors[b.complexity]);
    } else if (sortBy === 'goal_impact') {
      filtered.sort((a, b) => calculatePriorityScore(b).goalImpact - calculatePriorityScore(a).goalImpact);
    } else if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }

    return filtered;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-900">Lädt...</div>
      </div>
    );
  }

  const displayedTasks = getFilteredTasks();
  const notStartedCount = displayedTasks.filter(t => t.status === 'nicht gestartet').length;
  const avgProgress = displayedTasks.length > 0 
    ? Math.round(displayedTasks.reduce((sum, t) => sum + t.progress, 0) / displayedTasks.length)
    : 0;
  const topPriority = displayedTasks.length > 0 
    ? Math.max(...displayedTasks.map(t => calculatePriorityScore(t).total))
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            TODO Dashboard
          </h1>
          <p className="text-gray-600">Alle 54 Aufgaben • Update: 26.03.2026, 17:30</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategorie</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Alle Kategorien</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sortierung</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="priority">Priorität</option>
              <option value="meaningfulness">Sinnhaftigkeit</option>
              <option value="feasibility">Umsetzbarkeit</option>
              <option value="effort">Aufwand</option>
              <option value="complexity">Komplexität</option>
              <option value="goal_impact">Ziel-Impact</option>
              <option value="date">Datum</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Alle Status</option>
              <option value="nicht gestartet">Nicht gestartet</option>
              <option value="in Arbeit">In Arbeit</option>
              <option value="zurückgestellt">Zurückgestellt</option>
              <option value="abgeschlossen">Abgeschlossen</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Gesamt</div>
            <div className="text-3xl font-bold text-gray-900">{displayedTasks.length}</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Nicht gestartet</div>
            <div className="text-3xl font-bold text-amber-600">{notStartedCount}</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Ø Fortschritt</div>
            <div className="text-3xl font-bold text-blue-600">{avgProgress}%</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-2">Top-Priorität</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {topPriority}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedTasks.map(task => (
            <TaskCard key={task.id} task={task} onStart={setSelectedTask} />
          ))}
        </div>
      </div>

      {selectedTask && (
        <Modal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          tasks={tasks}
          setTasks={saveTasks}
        />
      )}
    </div>
  );
}
