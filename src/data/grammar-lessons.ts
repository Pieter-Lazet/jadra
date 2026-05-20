import type { GrammarLesson } from "@/lib/types";

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: "g001",
    slug: "alphabet-pronunciation",
    title: "Alfabet & Uitspraak",
    subtitle: "De basis van Kroatisch lezen",
    dayUnlock: 1,
    order: 1,
    explanation:
      "Kroatisch gebruikt het Latijnse alfabet met 30 letters. Elk teken heeft maar één uitspraak — als je het alfabet kent, kun je alles lezen!",
    rules: [
      {
        title: "Speciale letters",
        description:
          "č = 'tsj' (zoals in 'chip'), ć = zachter 'tsj', đ = 'dz' (als in 'judge'), š = 'sj', ž = 'zj' (als in 'garage')",
        example: "šuma = SJOOma (bos)",
      },
      {
        title: "J klinkt als 'j'",
        description: "De letter J spreek je uit als de Nederlandse J.",
        example: "jutro = JOOtro (ochtend)",
      },
      {
        title: "C klinkt als 'ts'",
        description: "C in het Kroatisch klinkt als 'ts'.",
        example: "cijena = TSIyena (prijs)",
      },
      {
        title: "Zelfklinkers: altijd duidelijk",
        description: "a, e, i, o, u worden altijd volledig uitgesproken.",
        example: "hvala = HVAla (dank je)",
      },
    ],
    examples: [
      { croatian: "Bok", dutch: "Hoi", note: "b-o-k: allemaal duidelijk" },
      { croatian: "Hvala", dutch: "Bedankt", note: "hv samen: 'hv'" },
      { croatian: "Čaj", dutch: "Thee", note: "č = tsj" },
      { croatian: "Šuma", dutch: "Bos", note: "š = sj" },
      { croatian: "Žena", dutch: "Vrouw", note: "ž = zj" },
    ],
    cheatSheet: [
      "č → tsj (cheese)",
      "ć → zachter tsj",
      "đ → dj (jungle)",
      "š → sj (shop)",
      "ž → zj (garage)",
      "j → j (ja)",
      "c → ts (pizza)",
    ],
    exercises: [
      {
        id: "g001e1",
        type: "multiple_choice",
        question: "Hoe spreek je 'š' uit?",
        options: ["sk", "sj", "ks", "ss"],
        correctAnswer: "sj",
        explanation: "š klinkt als 'sj' zoals in het Engelse 'shop'",
      },
      {
        id: "g001e2",
        type: "multiple_choice",
        question: "Welk woord bevat het 'tsj' geluid?",
        options: ["dan", "glad", "čaj", "more"],
        correctAnswer: "čaj",
        explanation: "č klinkt als 'tsj'",
      },
      {
        id: "g001e3",
        type: "multiple_choice",
        question: "Welk alfabet gebruikt het Kroatisch?",
        options: ["Cyrillisch", "Latijns", "Arabisch", "Grieks"],
        correctAnswer: "Latijns",
        explanation: "Kroatisch gebruikt het Latijnse alfabet, niet Cyrillisch.",
      },
    ],
  },
  {
    id: "g002",
    slug: "personal-pronouns",
    title: "Persoonlijke Voornaamwoorden",
    subtitle: "Ik, jij, hij, zij...",
    dayUnlock: 1,
    order: 2,
    explanation:
      "Kroatisch heeft formeel en informeel aanspreken. 'Ti' is informeel (vrienden/familie), 'Vi' is formeel (respect). In het Kroatisch kun je het voornaamwoord vaak weglaten — het werkwoord geeft al aan wie er handelt.",
    rules: [
      {
        title: "Enkelvoud",
        description: "ja (ik), ti (jij informeel), on (hij), ona (zij), ono (het)",
        example: "Ja sam Pieter. = Ik ben Pieter.",
      },
      {
        title: "Meervoud",
        description: "mi (wij), vi (jullie/u formeel), oni/one/ona (zij)",
        example: "Mi idemo. = Wij gaan.",
      },
      {
        title: "Formeel vs Informeel",
        description: "Gebruik 'Vi' (hoofdletter) voor respectvol aanspreken van één persoon.",
        example: "Kako ste? (formeel) vs Kako si? (informeel)",
      },
    ],
    examples: [
      { croatian: "Ja sam gladan.", dutch: "Ik ben hongerig." },
      { croatian: "Ti si lijep.", dutch: "Jij bent knap." },
      { croatian: "On govori hrvatski.", dutch: "Hij spreekt Kroatisch." },
      { croatian: "Ona voli more.", dutch: "Zij houdt van de zee." },
      { croatian: "Mi idemo na plažu.", dutch: "Wij gaan naar het strand." },
    ],
    cheatSheet: [
      "ja = ik",
      "ti = jij (informeel)",
      "on = hij",
      "ona = zij",
      "ono = het",
      "mi = wij",
      "vi = jullie / u (formeel)",
      "oni = zij (mannelijk)",
      "one = zij (vrouwelijk)",
    ],
    exercises: [
      {
        id: "g002e1",
        type: "multiple_choice",
        question: "Hoe zeg je 'wij' in het Kroatisch?",
        options: ["vi", "oni", "mi", "ti"],
        correctAnswer: "mi",
      },
      {
        id: "g002e2",
        type: "translate",
        question: "Vertaal: 'Zij (vrouwelijk) gaat naar Zagreb.'",
        correctAnswer: "Ona ide u Zagreb.",
        explanation: "ona = zij (vrouwelijk enkelvoud)",
      },
      {
        id: "g002e3",
        type: "multiple_choice",
        question: "Welk voornaamwoord gebruik je formeel voor één persoon?",
        options: ["ti", "on", "Vi", "oni"],
        correctAnswer: "Vi",
      },
    ],
  },
  {
    id: "g003",
    slug: "verb-biti",
    title: "Werkwoord 'biti' — zijn",
    subtitle: "Het meest gebruikte werkwoord",
    dayUnlock: 2,
    order: 3,
    explanation:
      "'Biti' (zijn) is het meest gebruikte Kroatische werkwoord. Er zijn twee vormen: een lange (nadruk) en een korte (gewoon gebruik). In de meeste zinnen gebruik je de korte vorm.",
    rules: [
      {
        title: "Korte vormen (gewoon gebruik)",
        description:
          "ja sam, ti si, on/ona/ono je, mi smo, vi ste, oni/one/ona su",
        example: "Ja sam iz Nizozemske. = Ik ben uit Nederland.",
      },
      {
        title: "Ontkennende vorm",
        description: "Voeg 'ni' toe vóór de werkwoordvorm: nisam, nisi, nije, nismo, niste, nisu",
        example: "Nisam umoran. = Ik ben niet moe.",
      },
      {
        title: "Vraagvorm",
        description: "Gebruik 'jesam li?', 'jesi li?', 'je li?' etc. Of zet de zin op als vraag met intonatie.",
        example: "Jesi li gladan? = Ben jij hongerig?",
      },
    ],
    examples: [
      { croatian: "Ja sam student.", dutch: "Ik ben student." },
      { croatian: "Ona je liječnica.", dutch: "Zij is arts." },
      { croatian: "Mi smo iz Nizozemske.", dutch: "Wij zijn uit Nederland." },
      { croatian: "Nisu doma.", dutch: "Zij zijn niet thuis." },
      { croatian: "Je li on tu?", dutch: "Is hij hier?" },
    ],
    cheatSheet: [
      "sam = ben (ik)",
      "si = bent (jij)",
      "je = is (hij/zij/het)",
      "smo = zijn (wij)",
      "ste = zijn (jullie)",
      "su = zijn (zij)",
      "nisam = ik ben niet",
      "nije = hij/zij is niet",
    ],
    exercises: [
      {
        id: "g003e1",
        type: "fill_blank",
        question: "Ja ___ gladan. (ik ben hongerig)",
        correctAnswer: "sam",
      },
      {
        id: "g003e2",
        type: "multiple_choice",
        question: "Hoe zeg je 'Zij zijn uit Zagreb'?",
        options: ["Oni ste iz Zagreba.", "Oni su iz Zagreba.", "Oni smo iz Zagreba.", "Oni sam iz Zagreba."],
        correctAnswer: "Oni su iz Zagreba.",
      },
      {
        id: "g003e3",
        type: "translate",
        question: "Vertaal: 'Ik ben niet moe.'",
        correctAnswer: "Nisam umoran.",
      },
    ],
  },
  {
    id: "g004",
    slug: "verb-imati",
    title: "Werkwoord 'imati' — hebben",
    subtitle: "Iets bezitten of beschrijven",
    dayUnlock: 3,
    order: 4,
    explanation:
      "'Imati' (hebben) is essentieel. Je gebruikt het voor bezit maar ook voor leeftijd (letterlijk: 'ik heb 30 jaar'). In het Kroatisch zeg je 'imam 30 godina' = 'ik ben 30 jaar oud'.",
    rules: [
      {
        title: "Vervoeging",
        description: "imam, imaš, ima, imamo, imate, imaju",
        example: "Imam brata. = Ik heb een broer.",
      },
      {
        title: "Leeftijd uitdrukken",
        description: "Gebruik 'imati' + getal + 'godina' voor leeftijd.",
        example: "Imam 28 godina. = Ik ben 28 jaar oud.",
      },
      {
        title: "Ontkenning",
        description: "nemam, nemaš, nema, nemamo, nemate, nemaju",
        example: "Nemam auto. = Ik heb geen auto.",
      },
    ],
    examples: [
      { croatian: "Imam sestru.", dutch: "Ik heb een zus." },
      { croatian: "Ima 30 godina.", dutch: "Hij/zij is 30 jaar oud." },
      { croatian: "Nemamo novca.", dutch: "Wij hebben geen geld." },
      { croatian: "Imaš li psa?", dutch: "Heb jij een hond?" },
    ],
    cheatSheet: [
      "imam = ik heb",
      "imaš = jij hebt",
      "ima = hij/zij heeft",
      "imamo = wij hebben",
      "imate = jullie hebben",
      "imaju = zij hebben",
      "nemam = ik heb niet",
    ],
    exercises: [
      {
        id: "g004e1",
        type: "fill_blank",
        question: "___ 25 godina. (ik ben 25 jaar oud)",
        correctAnswer: "Imam",
      },
      {
        id: "g004e2",
        type: "translate",
        question: "Vertaal: 'Wij hebben een auto.'",
        correctAnswer: "Imamo auto.",
      },
      {
        id: "g004e3",
        type: "multiple_choice",
        question: "Hoe zeg je 'Zij hebben geen geld'?",
        options: ["Nemaju novca.", "Imaju novca.", "Nema novca.", "Nemam novca."],
        correctAnswer: "Nemaju novca.",
      },
    ],
  },
  {
    id: "g005",
    slug: "noun-gender",
    title: "Geslacht van Zelfstandige Naamwoorden",
    subtitle: "Mannelijk, vrouwelijk, onzijdig",
    dayUnlock: 4,
    order: 5,
    explanation:
      "In het Kroatisch heeft elk zelfstandig naamwoord een grammaticaal geslacht. Gelukkig zijn er duidelijke patronen die je helpen!",
    rules: [
      {
        title: "Mannelijk (muški rod)",
        description:
          "Eindigt meestal op een medeklinker. Bijv: brat (broer), grad (stad), stol (tafel)",
        example: "brat (m), dan (m), vlak (m)",
      },
      {
        title: "Vrouwelijk (ženski rod)",
        description:
          "Eindigt meestal op -a. Bijv: žena (vrouw), sestra (zus), kava (koffie)",
        example: "žena (v), majka (v), rijeka (v)",
      },
      {
        title: "Onzijdig (srednji rod)",
        description: "Eindigt op -o of -e. Bijv: more (zee), dijete (kind), jutro (ochtend)",
        example: "more (o), piće (o), jutro (o)",
      },
    ],
    examples: [
      { croatian: "brat (m)", dutch: "broer (mannelijk)" },
      { croatian: "sestra (ž)", dutch: "zus (vrouwelijk)" },
      { croatian: "more (s)", dutch: "zee (onzijdig)" },
      { croatian: "kava (ž)", dutch: "koffie (vrouwelijk)" },
    ],
    cheatSheet: [
      "medeklinker einde → mannelijk",
      "-a einde → vrouwelijk",
      "-o/-e einde → onzijdig",
      "Uitzonderingen bestaan, maar dit geldt voor 80%+",
    ],
    exercises: [
      {
        id: "g005e1",
        type: "multiple_choice",
        question: "Welk geslacht heeft 'more' (zee)?",
        options: ["mannelijk", "vrouwelijk", "onzijdig"],
        correctAnswer: "onzijdig",
        explanation: "more eindigt op -e → onzijdig",
      },
      {
        id: "g005e2",
        type: "multiple_choice",
        question: "Welk geslacht heeft 'brat' (broer)?",
        options: ["mannelijk", "vrouwelijk", "onzijdig"],
        correctAnswer: "mannelijk",
        explanation: "brat eindigt op een medeklinker → mannelijk",
      },
    ],
  },
  {
    id: "g006",
    slug: "plural-basics",
    title: "Meervoud Basis",
    subtitle: "Van één naar meer",
    dayUnlock: 5,
    order: 6,
    explanation:
      "Het Kroatische meervoud heeft patronen, maar ook uitzonderingen. De meest voorkomende zijn hier.",
    rules: [
      {
        title: "Mannelijk meervoud",
        description: "Voeg -i toe aan de stam. Soms kleine verandering in de stam.",
        example: "brat → braća (onregelmatig), grad → gradovi",
      },
      {
        title: "Vrouwelijk meervoud",
        description: "-a verandert in -e",
        example: "žena → žene, sestra → sestre, kava → kave",
      },
      {
        title: "Onzijdig meervoud",
        description: "-o verandert in -a, -e verandert in -a",
        example: "more → mora, jutro → jutra",
      },
    ],
    examples: [
      { croatian: "žena → žene", dutch: "vrouw → vrouwen" },
      { croatian: "grad → gradovi", dutch: "stad → steden" },
      { croatian: "auto → auti", dutch: "auto → auto's" },
    ],
    cheatSheet: [
      "vrouwelijk: -a → -e",
      "onzijdig: -o/-e → -a",
      "mannelijk: +(ov)i",
      "Leer meervoud per woord!",
    ],
    exercises: [
      {
        id: "g006e1",
        type: "fill_blank",
        question: "Meervoud van 'žena' (vrouw) is...",
        correctAnswer: "žene",
      },
      {
        id: "g006e2",
        type: "multiple_choice",
        question: "Meervoud van 'sestra' (zus)?",
        options: ["sestri", "sestre", "sestra", "sestru"],
        correctAnswer: "sestre",
      },
    ],
  },
  {
    id: "g007",
    slug: "present-tense",
    title: "Tegenwoordige Tijd",
    subtitle: "Wat doe je nu of altijd",
    dayUnlock: 6,
    order: 7,
    explanation:
      "Kroatische werkwoorden worden vervoegd naar persoon. De eindingen zijn consistent per werkwoordgroep. Leer de patronen van de meest gebruikte werkwoorden.",
    rules: [
      {
        title: "-ati werkwoorden (type 1)",
        description: "govoriti, raditi, spavati → -im, -iš, -i, -imo, -ite, -e/-u",
        example: "raditi: radim, radiš, radi, radimo, radite, rade",
      },
      {
        title: "Onregelmatige werkwoorden",
        description: "biti (zijn) en imati (hebben) zijn onregelmatig. Leer ze apart.",
        example: "ići (gaan): idem, ideš, ide, idemo, idete, idu",
      },
      {
        title: "Ontkenning",
        description: "Voeg 'ne' toe vóór het werkwoord.",
        example: "Ne radim danas. = Ik werk vandaag niet.",
      },
    ],
    examples: [
      { croatian: "Radim svaki dan.", dutch: "Ik werk elke dag." },
      { croatian: "Govorimo hrvatski.", dutch: "Wij spreken Kroatisch." },
      { croatian: "Ne spava dobro.", dutch: "Hij/zij slaapt niet goed." },
      { croatian: "Idemo na more!", dutch: "We gaan naar zee!" },
    ],
    cheatSheet: [
      "-im = ik",
      "-iš = jij",
      "-i = hij/zij",
      "-imo = wij",
      "-ite = jullie",
      "-e/-u = zij",
      "ne + werkwoord = ontkenning",
    ],
    exercises: [
      {
        id: "g007e1",
        type: "fill_blank",
        question: "Ja ___ (raditi) svaki dan.",
        correctAnswer: "radim",
      },
      {
        id: "g007e2",
        type: "multiple_choice",
        question: "Hoe zeg je 'Zij spreken Kroatisch' (meervoud)?",
        options: ["Govore hrvatski.", "Govori hrvatski.", "Govorimo hrvatski.", "Govorite hrvatski."],
        correctAnswer: "Govore hrvatski.",
      },
    ],
  },
  {
    id: "g008",
    slug: "question-words",
    title: "Vraagwoorden",
    subtitle: "Wie, wat, waar, wanneer...",
    dayUnlock: 7,
    order: 8,
    explanation:
      "Kroatische vraagwoorden zijn essentieel voor communicatie. Gelukkig lijken veel op andere talen!",
    rules: [
      {
        title: "De basis vraagwoorden",
        description:
          "što (wat), tko (wie), gdje (waar), kada (wanneer), zašto (waarom), kako (hoe), koliko (hoeveel)",
        example: "Što to je? = Wat is dat?",
      },
      {
        title: "Vraagzin vormen",
        description: "Zet het vraagwoord vooraan. Of gebruik stijging in intonatie zonder vraagwoord.",
        example: "Kada ideš? = Wanneer ga je?",
      },
    ],
    examples: [
      { croatian: "Što je to?", dutch: "Wat is dat?" },
      { croatian: "Tko si ti?", dutch: "Wie ben jij?" },
      { croatian: "Gdje je hotel?", dutch: "Waar is het hotel?" },
      { croatian: "Kada dolazite?", dutch: "Wanneer komen jullie?" },
      { croatian: "Zašto ne ideš?", dutch: "Waarom ga je niet?" },
      { croatian: "Kako se kaže?", dutch: "Hoe zeg je dat?" },
      { croatian: "Koliko košta?", dutch: "Hoeveel kost het?" },
    ],
    cheatSheet: [
      "što = wat",
      "tko = wie",
      "gdje = waar",
      "kada = wanneer",
      "zašto = waarom",
      "kako = hoe",
      "koliko = hoeveel",
      "koji/koja/koje = welk/welke",
    ],
    exercises: [
      {
        id: "g008e1",
        type: "multiple_choice",
        question: "Hoe zeg je 'Waar is het strand?'",
        options: ["Što je plaža?", "Gdje je plaža?", "Kada je plaža?", "Tko je plaža?"],
        correctAnswer: "Gdje je plaža?",
      },
      {
        id: "g008e2",
        type: "translate",
        question: "Vertaal: 'Hoeveel kost dat?'",
        correctAnswer: "Koliko to košta?",
      },
    ],
  },
  {
    id: "g009",
    slug: "negation",
    title: "Ontkenning",
    subtitle: "Nee zeggen in het Kroatisch",
    dayUnlock: 8,
    order: 9,
    explanation:
      "Ontkenning in het Kroatisch is eenvoudig: voeg 'ne' toe vóór het werkwoord. Voor zijn/hebben zijn er speciale vormen.",
    rules: [
      {
        title: "ne + werkwoord",
        description: "Voor de meeste werkwoorden: voeg 'ne' toe.",
        example: "Ne govorim engleski. = Ik spreek geen Engels.",
      },
      {
        title: "Ontkenning van 'biti'",
        description: "nisam, nisi, nije, nismo, niste, nisu",
        example: "Nisam umoran. = Ik ben niet moe.",
      },
      {
        title: "Ontkenning van 'imati'",
        description: "nemam, nemaš, nema, nemamo, nemate, nemaju",
        example: "Nema problema! = Geen probleem!",
      },
    ],
    examples: [
      { croatian: "Ne znam.", dutch: "Ik weet het niet." },
      { croatian: "Nisam gladan.", dutch: "Ik ben niet hongerig." },
      { croatian: "Nema problema.", dutch: "Geen probleem." },
      { croatian: "Ne razumijem.", dutch: "Ik begrijp het niet." },
    ],
    cheatSheet: [
      "ne + werkwoord = ontkenning",
      "nisam = ik ben niet",
      "nije = hij/zij is niet",
      "nemam = ik heb niet",
      "nema = er is geen / hij/zij heeft niet",
    ],
    exercises: [
      {
        id: "g009e1",
        type: "fill_blank",
        question: "___ govorim engleski. (ik spreek geen Engels)",
        correctAnswer: "Ne",
      },
      {
        id: "g009e2",
        type: "translate",
        question: "Vertaal: 'Zij is niet hier.'",
        correctAnswer: "Ona nije ovdje.",
      },
    ],
  },
  {
    id: "g010",
    slug: "basic-prepositions",
    title: "Veelgebruikte Voorzetsels",
    subtitle: "In, op, bij, naar...",
    dayUnlock: 9,
    order: 10,
    explanation:
      "Voorzetsels geven aan waar iets is of naar waar iets gaat. Kroatische voorzetsels veranderen de naamval van het zelfstandig naamwoord — begin met de meestgebruikte.",
    rules: [
      {
        title: "Locatie: u (in), na (op/naar), kod (bij)",
        description: "u + locatief voor locatie, na + accusatief voor beweging ernaar toe",
        example: "Živim u Zagrebu. = Ik woon in Zagreb.",
      },
      {
        title: "Richting: u, na, do (naar/tot)",
        description: "do = tot, naar (met genief)",
        example: "Idem u Zagreb. = Ik ga naar Zagreb.",
      },
      {
        title: "Van: iz, od",
        description: "iz = uit (een plek), od = van (persoon of punt)",
        example: "Dolazim iz Nizozemske. = Ik kom uit Nederland.",
      },
    ],
    examples: [
      { croatian: "Stanujemo u gradu.", dutch: "Wij wonen in de stad." },
      { croatian: "Idem na plažu.", dutch: "Ik ga naar het strand." },
      { croatian: "Dolazim iz Amsterdama.", dutch: "Ik kom uit Amsterdam." },
      { croatian: "Sjedi kod mene.", dutch: "Zit bij mij." },
      { croatian: "Idemo do mora.", dutch: "We gaan tot aan de zee." },
    ],
    cheatSheet: [
      "u = in / naar (locatie/richting)",
      "na = op / naar (oppervlak/richting)",
      "iz = uit",
      "od = van / af",
      "kod = bij",
      "do = tot / naar",
      "s/sa = met",
      "bez = zonder",
    ],
    exercises: [
      {
        id: "g010e1",
        type: "fill_blank",
        question: "Dolazim ___ Nizozemske. (Ik kom uit Nederland)",
        correctAnswer: "iz",
      },
      {
        id: "g010e2",
        type: "multiple_choice",
        question: "Hoe zeg je 'We gaan naar het strand'?",
        options: ["Idemo iz plaže.", "Idemo na plažu.", "Idemo u plaža.", "Idemo kod plaže."],
        correctAnswer: "Idemo na plažu.",
      },
    ],
  },
  {
    id: "g011",
    slug: "nominative-accusative",
    title: "Nominatief & Accusatief",
    subtitle: "De twee meest gebruikte naamvallen",
    dayUnlock: 10,
    order: 11,
    explanation:
      "Kroatisch heeft 7 naamvallen — klinkt eng, maar begin met de 2 meest gebruikte. De nominatief is het onderwerp, de accusatief is het direct object.",
    rules: [
      {
        title: "Nominatief = onderwerp",
        description: "Wie of wat doet de actie? Dat is de nominatief.",
        example: "Brat jede kruh. = Broer eet brood. (brat is nominatief)",
      },
      {
        title: "Accusatief = lijdend voorwerp",
        description: "Wie of wat ondergaat de actie? Dat is de accusatief.",
        example: "Jedem kruh. = Ik eet brood. (kruh is accusatief)",
      },
      {
        title: "Accusatief vormen",
        description:
          "Mannelijk → +a (onbezield) of geen verandering, Vrouwelijk: -a → -u, Onzijdig: geen verandering",
        example: "žena → ženu, brat → brata, more → more",
      },
    ],
    examples: [
      { croatian: "Vidim more.", dutch: "Ik zie de zee. (more = accusatief)" },
      { croatian: "Volim kavu.", dutch: "Ik hou van koffie. (kava → kavu)" },
      { croatian: "Čitam knjigu.", dutch: "Ik lees een boek. (knjiga → knjigu)" },
    ],
    cheatSheet: [
      "onderwerp → nominatief (basisvorm)",
      "direct object → accusatief",
      "vrouwelijk -a → -u in accusatief",
      "onzijdig → geen verandering",
      "mannelijk bezield → +a",
    ],
    exercises: [
      {
        id: "g011e1",
        type: "fill_blank",
        question: "Volim kav___ (ik hou van koffie — kava is vrouwelijk)",
        correctAnswer: "kavu",
      },
      {
        id: "g011e2",
        type: "multiple_choice",
        question: "Welke naamval gebruik je voor het onderwerp?",
        options: ["Accusatief", "Nominatief", "Genief", "Datief"],
        correctAnswer: "Nominatief",
      },
    ],
  },
  {
    id: "g012",
    slug: "word-order",
    title: "Woordvolgorde",
    subtitle: "Hoe bouw je een Kroatische zin?",
    dayUnlock: 11,
    order: 12,
    explanation:
      "Kroatisch heeft een vrij vrije woordvolgorde door naamvallen, maar de meest neutrale volgorde is onderwerp-werkwoord-object (SVO), net als het Nederlands.",
    rules: [
      {
        title: "Basis: S-W-O",
        description: "Onderwerp (Subject) + Werkwoord (Verb) + Object. Net als Nederlands.",
        example: "Ja pijem kavu. = Ik drink koffie.",
      },
      {
        title: "Clitici: kleine woorden op vaste plek",
        description:
          "Korte vormen van werkwoorden (sam, si, je) staan op de TWEEDE plek in de zin.",
        example: "Ja sam gladan. / Gladan sam. (beiden correct)",
      },
      {
        title: "Vraagzin",
        description: "Zet vraagwoord vooraan. Ja/nee vragen: gebruik intonatie of li.",
        example: "Ideš li? = Ga jij? / Jesi li gladan? = Ben jij hongerig?",
      },
    ],
    examples: [
      { croatian: "Pijem kavu svako jutro.", dutch: "Ik drink elke ochtend koffie." },
      { croatian: "Svako jutro pijem kavu.", dutch: "Elke ochtend drink ik koffie." },
      { croatian: "Kavu pijem svako jutro.", dutch: "Koffie drink ik elke ochtend. (nadruk)" },
    ],
    cheatSheet: [
      "Standaard: onderwerp → werkwoord → object",
      "Volgorde kan variëren voor nadruk",
      "Clitici (sam/si/je) → altijd op positie 2",
      "Vraagwoord → altijd vooraan",
    ],
    exercises: [
      {
        id: "g012e1",
        type: "multiple_choice",
        question: "Welke zin is grammaticaal correct?",
        options: [
          "Kavu ja pijem.",
          "Pijem kavu ja.",
          "Ja pijem kavu.",
          "Pijem ja kavu.",
        ],
        correctAnswer: "Ja pijem kavu.",
        explanation: "Standaard volgorde is S-W-O",
      },
    ],
  },
  {
    id: "g013",
    slug: "past-tense",
    title: "Verleden Tijd",
    subtitle: "Wat er gisteren is gebeurd",
    dayUnlock: 14,
    order: 13,
    explanation:
      "De Kroatische verleden tijd (perfekt) is eigenlijk vrij eenvoudig: gebruik de hulpwerkwoorden van 'biti' + het perfectum participium van het werkwoord.",
    rules: [
      {
        title: "Vorming",
        description: "werkwoord + 'sam/si/je/smo/ste/su' als hulpwerkwoord + participium (-ao/-la/-lo)",
        example: "Radio sam. = Ik werkte / Ik heb gewerkt.",
      },
      {
        title: "Participium vormen",
        description:
          "mannelijk: -ao (radio, jeo), vrouwelijk: -la (radila, jela), onzijdig: -lo",
        example: "On je radio. / Ona je radila. / Dijete je radilo.",
      },
      {
        title: "Ontkenning verleden tijd",
        description: "Gebruik 'nisam/nisi/nije' ipv 'sam/si/je'",
        example: "Nisam spavao. = Ik heb niet geslapen.",
      },
    ],
    examples: [
      { croatian: "Jeo sam picu.", dutch: "Ik heb pizza gegeten." },
      { croatian: "Išla je na plažu.", dutch: "Zij ging naar het strand." },
      { croatian: "Nismo spavali.", dutch: "Wij hebben niet geslapen." },
      { croatian: "Jeste li vidjeli?", dutch: "Hebben jullie gezien?" },
    ],
    cheatSheet: [
      "mannelijk: -ao (radio, jeo, išao)",
      "vrouwelijk: -la (radila, jela, išla)",
      "onzijdig: -lo (radilo, jelo, išlo)",
      "hulpwerkwoord biti: sam/si/je/smo/ste/su",
      "ontkenning: nisam/nisi/nije",
    ],
    exercises: [
      {
        id: "g013e1",
        type: "multiple_choice",
        question: "Hoe zeg je 'Zij (vrouwelijk) heeft gewerkt'?",
        options: ["Ona je radio.", "Ona je radila.", "Ona sam radila.", "Ona je radili."],
        correctAnswer: "Ona je radila.",
      },
      {
        id: "g013e2",
        type: "fill_blank",
        question: "Nisam ___ dobro. (Ik heb niet goed geslapen — msc.)",
        correctAnswer: "spavao",
      },
    ],
  },
  {
    id: "g014",
    slug: "future-tense",
    title: "Toekomende Tijd",
    subtitle: "Wat er morgen gaat gebeuren",
    dayUnlock: 16,
    order: 14,
    explanation:
      "De toekomende tijd is eenvoudig: gebruik 'ću/ćeš/će/ćemo/ćete/će' + infinitief van het werkwoord.",
    rules: [
      {
        title: "Vorming",
        description: "ću/ćeš/će/ćemo/ćete/će + infinitief",
        example: "Ću ići na more. = Ik zal naar zee gaan.",
      },
      {
        title: "Kortere vorm",
        description: "In de spreektaal gebruik je vaak: werkwoord + -ću, werkwoord + -ćeš etc.",
        example: "Ići ću. = Ik zal gaan.",
      },
      {
        title: "Ontkenning",
        description: "Gebruik 'neću/nećeš/neće' + infinitief",
        example: "Neću ići. = Ik zal niet gaan.",
      },
    ],
    examples: [
      { croatian: "Sutra ću ići na plažu.", dutch: "Morgen ga ik naar het strand." },
      { croatian: "Ona će doći večeras.", dutch: "Zij komt vanavond." },
      { croatian: "Nećemo raditi.", dutch: "We zullen niet werken." },
    ],
    cheatSheet: [
      "ću = ik zal",
      "ćeš = jij zult",
      "će = hij/zij zal",
      "ćemo = wij zullen",
      "ćete = jullie zullen",
      "će = zij zullen",
      "neću = ik zal niet",
    ],
    exercises: [
      {
        id: "g014e1",
        type: "fill_blank",
        question: "Sutra ___ ići u Zagreb. (Morgen ga ik naar Zagreb — ik)",
        correctAnswer: "ću",
      },
      {
        id: "g014e2",
        type: "translate",
        question: "Vertaal: 'Zij zal niet komen.'",
        correctAnswer: "Ona neće doći.",
      },
    ],
  },
  {
    id: "g015",
    slug: "adjectives",
    title: "Bijvoeglijke Naamwoorden",
    subtitle: "Beschrijvingen toevoegen",
    dayUnlock: 12,
    order: 15,
    explanation:
      "Bijvoeglijke naamwoorden in het Kroatisch passen zich aan naar geslacht, getal en naamval. Start met de nominatief vormen.",
    rules: [
      {
        title: "Aanpassing aan geslacht",
        description: "mannelijk: basis, vrouwelijk: +a, onzijdig: +o/-e",
        example: "dobar (m) / dobra (ž) / dobro (s) = goed",
      },
      {
        title: "Bijvoeglijk naamwoord staat vóór",
        description: "Net als in het Nederlands staat het bijvoeglijk naamwoord vóór het zelfstandig naamwoord.",
        example: "lijep grad = mooie stad",
      },
    ],
    examples: [
      { croatian: "lijepa žena", dutch: "mooie vrouw (vrouwelijk)" },
      { croatian: "lijep grad", dutch: "mooie stad (mannelijk)" },
      { croatian: "lijepo jutro", dutch: "mooie ochtend (onzijdig)" },
      { croatian: "hladno piće", dutch: "koud drankje" },
      { croatian: "vruća kava", dutch: "warme koffie" },
    ],
    cheatSheet: [
      "mannelijk: geen extra uitgang (dobar)",
      "vrouwelijk: +a (dobra)",
      "onzijdig: +o of +e (dobro)",
      "staat altijd vóór het zelfstandig naamwoord",
    ],
    exercises: [
      {
        id: "g015e1",
        type: "fill_blank",
        question: "Vruć___ kava. (warme koffie — kava is vrouwelijk)",
        correctAnswer: "Vruća",
      },
      {
        id: "g015e2",
        type: "multiple_choice",
        question: "Hoe zeg je 'mooi eiland' (otok = mannelijk)?",
        options: ["lijepa otok", "lijepo otok", "lijep otok", "lijepe otok"],
        correctAnswer: "lijep otok",
      },
    ],
  },
  {
    id: "g016",
    slug: "formal-informal",
    title: "Formeel vs Informeel",
    subtitle: "Wanneer gebruik je Vi of ti?",
    dayUnlock: 13,
    order: 16,
    explanation:
      "Net als in het Frans (vous/tu) en Duits (Sie/du) heeft het Kroatisch een formeel en informeel 'jij'. Informeel gebruik 'ti', formeel 'Vi' (met hoofdletter).",
    rules: [
      {
        title: "Ti (informeel)",
        description:
          "Gebruik met vrienden, familie, leeftijdsgenoten, kinderen. Jonge mensen gebruiken onderling altijd 'ti'.",
        example: "Kako si? = Hoe gaat het? (informeel)",
      },
      {
        title: "Vi (formeel)",
        description: "Gebruik voor ouderen, vreemden, autoriteitspersonen, zakelijk contact.",
        example: "Kako ste? = Hoe gaat het? (formeel)",
      },
    ],
    examples: [
      { croatian: "Kako si? (informeel)", dutch: "Hoe gaat het? (vrienden)" },
      { croatian: "Kako ste? (formeel)", dutch: "Hoe gaat het? (meneer/mevrouw)" },
      { croatian: "Gdje si? (informeel)", dutch: "Waar ben je?" },
      { croatian: "Gdje ste? (formeel)", dutch: "Waar bent u?" },
    ],
    cheatSheet: [
      "ti = informeel (vrienden, familie)",
      "Vi = formeel (vreemden, ouderen, baas)",
      "si → werkwoordsvorm bij ti",
      "ste → werkwoordsvorm bij Vi",
      "In twijfel: gebruik formeel",
    ],
    exercises: [
      {
        id: "g016e1",
        type: "multiple_choice",
        question: "Je spreekt een oudere meneer aan. Welke vorm gebruik je?",
        options: ["Kako si?", "Kako ste?", "Kako je?", "Kako smo?"],
        correctAnswer: "Kako ste?",
      },
    ],
  },
  {
    id: "g017",
    slug: "common-phrases",
    title: "Handige Zinsconstructies",
    subtitle: "Zinnen die je overal kunt gebruiken",
    dayUnlock: 3,
    order: 17,
    explanation:
      "Sommige zinnen kun je als bouwstenen gebruiken. Leer deze structuren en pas ze toe op nieuwe situaties.",
    rules: [
      {
        title: "Ja volim + [zelfstandig naamwoord]",
        description: "Uitdrukken wat je lekker vindt / graag doet",
        example: "Volim kavu. / Volim plivati. = Ik hou van koffie. / Ik zwem graag.",
      },
      {
        title: "Mogu li + infinitief?",
        description: "Beleefd om iets vragen",
        example: "Mogu li dobiti račun? = Mag ik de rekening?",
      },
      {
        title: "Trebam + zelfstandig naamwoord",
        description: "Uitdrukken dat je iets nodig hebt",
        example: "Trebam pomoć. = Ik heb hulp nodig.",
      },
      {
        title: "Gdje je + zelfstandig naamwoord?",
        description: "Vragen waar iets is",
        example: "Gdje je WC? = Waar is het toilet?",
      },
    ],
    examples: [
      { croatian: "Mogu li platiti karticom?", dutch: "Mag ik met kaart betalen?" },
      { croatian: "Gdje je najbliži bankomat?", dutch: "Waar is de dichtstbijzijnde geldautomaat?" },
      { croatian: "Volim dalmatinsku kuhinju.", dutch: "Ik hou van Dalmatische keuken." },
      { croatian: "Trebam sobu za dvije noći.", dutch: "Ik heb een kamer voor twee nachten nodig." },
    ],
    cheatSheet: [
      "Volim + [woord] = Ik hou van...",
      "Mogu li + [werkwoord]? = Mag ik...?",
      "Trebam + [woord] = Ik heb ... nodig",
      "Gdje je + [woord]? = Waar is...?",
      "Koliko košta + [woord]? = Hoeveel kost...?",
    ],
    exercises: [
      {
        id: "g017e1",
        type: "translate",
        question: "Vertaal: 'Mag ik de rekening?'",
        correctAnswer: "Mogu li dobiti račun?",
      },
      {
        id: "g017e2",
        type: "translate",
        question: "Vertaal: 'Waar is het strand?'",
        correctAnswer: "Gdje je plaža?",
      },
    ],
  },
  {
    id: "g018",
    slug: "genitive-case",
    title: "Genief — Bezit en hoeveelheid",
    subtitle: "Van wie, hoeveel",
    dayUnlock: 18,
    order: 18,
    explanation:
      "De genief geeft bezit aan ('van X') en wordt ook gebruikt na hoeveelheidwoorden en bepaalde voorzetsels.",
    rules: [
      {
        title: "Bezit",
        description: "De genief = 'van'. Achteraan de bezitter, geen apart 's.",
        example: "kuća prijatelja = het huis van de vriend",
      },
      {
        title: "Na hoeveelheden",
        description: "Na 2-4 + genief enkelvoud, na 5+ + genief meervoud",
        example: "dva brata (2 broers), pet braće (5 broers)",
      },
      {
        title: "Na voorzetsels",
        description: "iz, od, bez, do, kod, za (in sommige betekenissen) → genief",
        example: "bez kave = zonder koffie",
      },
    ],
    examples: [
      { croatian: "bez šećera", dutch: "zonder suiker" },
      { croatian: "iz Zagreba", dutch: "uit Zagreb" },
      { croatian: "puno ljudi", dutch: "veel mensen" },
    ],
    cheatSheet: [
      "bezit: X van Y = X + Y (genief)",
      "vrouwelijk: -a → -e of verandering",
      "mannelijk: + -a",
      "iz = uit (+ genief)",
      "bez = zonder (+ genief)",
    ],
    exercises: [
      {
        id: "g018e1",
        type: "fill_blank",
        question: "Dolazim iz Zagreba = ik kom ___ Zagreb",
        correctAnswer: "uit",
      },
    ],
  },
  {
    id: "g019",
    slug: "useful-verbs",
    title: "Meest Gebruikte Werkwoorden",
    subtitle: "De 15 werkwoorden die je overal nodig hebt",
    dayUnlock: 5,
    order: 19,
    explanation:
      "Deze 15 werkwoorden gebruik je in bijna elk gesprek. Leer de vervoeging in de tegenwoordige tijd.",
    rules: [
      {
        title: "biti (zijn) — onregelmatig",
        description: "sam, si, je, smo, ste, su",
        example: "Ja sam student.",
      },
      {
        title: "imati (hebben) — regelmatig",
        description: "imam, imaš, ima, imamo, imate, imaju",
        example: "Ima dobar posao.",
      },
      {
        title: "ići (gaan) — onregelmatig",
        description: "idem, ideš, ide, idemo, idete, idu",
        example: "Idemo na more!",
      },
    ],
    examples: [
      { croatian: "Kako se zoveš?", dutch: "Hoe heet je? (zvati se)" },
      { croatian: "Mogu li platiti?", dutch: "Mag ik betalen? (moći, platiti)" },
      { croatian: "Znam gdje je.", dutch: "Ik weet waar het is. (znati)" },
      { croatian: "Hoću kavu, molim.", dutch: "Ik wil koffie, alsjeblieft. (htjeti)" },
    ],
    cheatSheet: [
      "biti: sam/si/je/smo/ste/su",
      "imati: imam/imaš/ima",
      "ići: idem/ideš/ide",
      "govoriti: govorim/govoriš/govori",
      "raditi: radim/radiš/radi",
      "jesti: jedem/jedeš/jede",
      "piti: pijem/piješ/pije",
      "voljeti: volim/voliš/voli",
      "znati: znam/znaš/zna",
      "moći: mogu/možeš/može",
    ],
    exercises: [
      {
        id: "g019e1",
        type: "fill_blank",
        question: "Ja ___ (jesti) kruh. (ik eet brood)",
        correctAnswer: "jedem",
      },
      {
        id: "g019e2",
        type: "multiple_choice",
        question: "Vervoeging van 'voljeti' (houden van) voor 'ja'?",
        options: ["volim", "voliš", "voli", "vole"],
        correctAnswer: "volim",
      },
    ],
  },
  {
    id: "g020",
    slug: "numbers-time",
    title: "Nummers & Tijd",
    subtitle: "Zeggen hoe laat het is",
    dayUnlock: 8,
    order: 20,
    explanation:
      "Nummers in het Kroatisch veranderen naar geslacht (1-4). Tijd zeg je met 'koliko je sati?' (hoe laat is het).",
    rules: [
      {
        title: "Hoe laat is het?",
        description: "Koliko je sati? — Formal: je + ordinal + sati",
        example: "Dva su sata. = Het is 2 uur. / Pola tri. = Half drie.",
      },
      {
        title: "Nummers 1-4 met geslacht",
        description: "1: jedan/jedna/jedno, 2: dva/dvije, 3: tri, 4: četiri",
        example: "jedna žena, dva muška, dvije žene",
      },
      {
        title: "Datums",
        description: "datum = ordinal + maand in genief",
        example: "Petog lipnja. = 5 juni.",
      },
    ],
    examples: [
      { croatian: "Koliko je sati?", dutch: "Hoe laat is het?" },
      { croatian: "Tri su sata.", dutch: "Het is 3 uur." },
      { croatian: "Pola osam.", dutch: "Half acht." },
      { croatian: "Dvadeset i pet do devet.", dutch: "Vijf over half negen." },
    ],
    cheatSheet: [
      "Koliko je sati? = Hoe laat?",
      "U + tijdstip = om ... uur",
      "pola = half",
      "četvrt = kwart",
      "do = voor",
      "i = over (na het hele uur)",
    ],
    exercises: [
      {
        id: "g020e1",
        type: "translate",
        question: "Vertaal: 'Hoe laat is het?'",
        correctAnswer: "Koliko je sati?",
      },
    ],
  },
];
