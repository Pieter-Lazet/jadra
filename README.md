# Jadra 🇭🇷
### Govori kao lokalni — Spreek als een local

Een volledige mobile-first Kroatisch leer-webapp, gebouwd voor dagelijkse 60-minuten sessies. Geïnspireerd op Duolingo maar speciaal voor Kroatisch, met ADHD-vriendelijke UX, spaced repetition en gamification.

---

## 🚀 Lokaal draaien

### 1. Installeer dependencies
```bash
npm install
```

### 2. Start de dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

---

## 📁 Structuur

```
src/
├── app/                    # Next.js App Router pagina's
│   ├── page.tsx            # Root → redirect naar onboarding of dashboard
│   ├── onboarding/         # Onboarding flow (4 stappen)
│   ├── dashboard/          # Hoofddashboard
│   ├── learn/              # Leerpad overzicht
│   │   └── day/[day]/      # Dagles met blokken
│   ├── vocabulary/         # Woordenschat
│   │   └── [category]/     # Per categorie
│   ├── grammar/            # Grammatica lessen
│   │   └── [lesson]/       # Per les
│   ├── scenarios/          # Gespreksscenario's
│   │   └── [scenario]/     # Per scenario
│   ├── review/             # Spaced repetition review
│   ├── progress/           # Statistieken & badges
│   └── settings/           # Instellingen
│
├── components/
│   ├── layout/             # AppShell, BottomNavigation, MobileHeader
│   ├── ui/                 # ProgressRing, XPBar, StreakCard, etc.
│   └── learning/           # Flashcard, MultipleChoice, TypingChallenge, etc.
│
├── data/
│   ├── vocabulary.ts       # 205+ Kroatische woorden
│   ├── grammar-lessons.ts  # 20 grammatica lessen
│   ├── lesson-days.ts      # 60 dagen lesplan (20 volledig uitgewerkt)
│   └── scenarios.ts        # 10 gespreksscenario's
│
└── lib/
    ├── store/              # Zustand state management + localStorage
    ├── types/              # TypeScript types
    └── utils/              # Spaced repetition, XP, formatting
```

---

## 🗄️ Supabase instellen (optioneel)

De app werkt **volledig lokaal** zonder Supabase. Voortgang wordt opgeslagen in `localStorage`.

### Voor synchronisatie tussen apparaten:

1. Maak een project op [supabase.com](https://supabase.com)
2. Kopieer `.env.local.example` naar `.env.local`
3. Vul je Supabase URL en anon key in
4. Voer het migratiescript uit in je Supabase SQL editor:
   ```
   supabase/migrations/001_initial_schema.sql
   ```

---

## 📚 Content toevoegen

### Nieuwe woorden toevoegen
Voeg toe aan `src/data/vocabulary.ts`:
```typescript
{
  id: "w206",                        // uniek ID
  croatian: "knjiga",                // Kroatisch woord
  dutch: "boek",                     // Nederlandse vertaling
  english: "book",                   // Engelse vertaling
  pronunciation: "KNjee-ga",         // uitspraakhint
  exampleCroatian: "Čitam dobru knjigu.", 
  exampleDutch: "Ik lees een goed boek.",
  category: "school",                // zie VOCAB_CATEGORIES
  difficulty: "beginner",            // beginner | intermediate | advanced
  gender: "f",                       // m | f | n (optioneel)
}
```

### Nieuwe grammatica les toevoegen
Voeg toe aan `src/data/grammar-lessons.ts` — zie de bestaande lessen voor de structuur.

### Nieuwe scenario toevoegen
Voeg toe aan `src/data/scenarios.ts` — zie de bestaande scenario's voor de structuur.

---

## 🎵 Audio/TTS toevoegen (toekomstig)

De app is klaar voor audio. Voeg toe:

1. **Web Speech API** (gratis, ingebouwd in browsers):
   ```typescript
   const utterance = new SpeechSynthesisUtterance(word.croatian);
   utterance.lang = 'hr-HR';
   speechSynthesis.speak(utterance);
   ```

2. **ElevenLabs of Google TTS** voor betere kwaliteit:
   - Genereer audio-bestanden voor elk woord
   - Sla op in `/public/audio/[word-id].mp3`
   - Voeg `audioUrl` toe aan het `VocabWord` type

---

## 🎮 Design System (Jadra)

| Token | Kleur | Gebruik |
|-------|-------|---------|
| `brand-coral` | `#FF6B4A` | Primaire actie, CTA, accent |
| `brand-teal` | `#00D4B8` | Tweede accent, succesindicator |
| `brand-gold` | `#FFD166` | XP, beloningen, badges |
| `brand-green` | `#06FFA5` | Correct antwoord, beheerst |
| `brand-red` | `#FF4E6A` | Fout antwoord, gevaar |
| `bg-primary` | `#0D0F14` | Pagina-achtergrond |
| `bg-card` | `#1E2230` | Kaartachtergrond |

---

## 📊 Spaced Repetition

Implementatie gebaseerd op het **SM-2 algoritme**:
- Kwaliteit 0-2: fout → interval reset naar 1 dag
- Kwaliteit 3-5: correct → interval vermenigvuldigd met ease factor
- Ease factor start op 2.5, past aan op basis van prestatie
- Minimum interval: 1 dag, daarna 6 dagen, dan exponentieel

Zie `src/lib/utils/spaced-repetition.ts` voor de implementatie.

---

## 📈 Toekomstplan

- [ ] Audio/TTS uitspraak per woord
- [ ] Supabase auth + cloud sync
- [ ] Meer woorden (richting 5000)
- [ ] Luisteroefeningen
- [ ] Dagelijkse herinnering (PWA push)
- [ ] Leaderboard met vrienden
- [ ] Officieel Kroatisch toetsingsmateriaal
- [ ] Meervoudige taalrichting (ook NL→HR)
- [ ] Export voortgang als PDF
- [ ] Offline PWA modus

---

## 🇭🇷 Over de taal

Kroatisch is een Zuid-Slavische taal die gesproken wordt door ~6 miljoen mensen. Het gebruikt het Latijnse alfabet met speciale letters: **č, ć, đ, š, ž**. 

Kroatisch heeft 7 naamvallen, maar met de basis (nominatief + accusatief) en de meest gebruikte werkwoorden red je je uitstekend in dagelijkse gesprekken.

---

*Jadra betekent letterlijk "zeilen" (mv.) — een verwijzing naar het Adriatische avontuur dat je gaat beginnen.*
