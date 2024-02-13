# Chas News

## Nyhetssida byggd med JavaScript, TypeScript, HTML och CSS, med integrerad användning av Firebase för autentisering och databasfunktionalitet.

Gruppuppgift från Chas Academy.

- Besök live-sidan: https://nyhetssida.netlify.app/

Hemsidan är byggd av:

- William Bostrom: https://github.com/WilliamBostrom
- Luay Asadsson: https://github.com/Luayasaadsson
- Dennis Nilsson: https://github.com/dens0n
- Simon Klaussen: https://github.com/Simon-jmk

## Beskrivning:

Projektet utfördes mellan 17 januari och 15 februari i grupper om 4-5 personer och var obligatoriskt för att bedömas på följande kursmål:

- Bygga frontend för webbapplikationer med JavaScript utan ramverk/bibliotek (vanilla JS)
- Implementera spårningskoder, händelsepårning och metadata för externa tjänster
- Använda TypeScript i frontendapplikationer med JavaScript utan ramverk

  Projektet fokuserade på att bygga en frontend för en nyhetssida och tillämpade agila metoder för systemutveckling och grupparbete.

## Om tjänsten:

Uppgiften var att utveckla en nyhetssida inspirerad av Omnis nyhetsjänst. Projektet skulle genomföras i flera steg, och målet var att ta fram den första betaversionen av tjänsten.

_Bild på Omnis hemsida_
![Omnis hemsida](/src/img/omni.png)

_Bild på Omnis sida för mobil_
![Omnis hemsida](/src/img/omni-mobil.png)

- Besök Omnis hemsida: https://www.omni.se/

### Funktionalitet:

Den första betaversionen av tjänsten skulle inkludera följande grundläggande funktioner:

1. Användaren ska kunna läsa nyheter som hämtats från ett öppet nyhets-API.

2. Användaren ska kunna sortera nyheter efter datum.

3. Användaren ska kunna filtrera nyheter utifrån något kriterium, exempelvis kategori.

4. Användaren ska kunna markera nyheter som favoriter och spara dem i sin personliga lista.

5. Användaren ska kunna hitta nyheter baserat på sökord som exempelvis datum, författare eller kategori.

### Kravlista:

Följande punkter var absoluta krav som måste genomsyra och uppfyllas i projektet:

- Responsiv design med mobile-first-metoden.
- Användning av HTML5 och CSS3.
- Inga stora JS-ramverk fick användas, såsom jQuery, React, Angular m.fl.
- Semantisk HTML för grundläggande tillgänglighetsanpassning.
- Användning av Vite som modulbundler.
- Minst en användarinteraktion som kan spåras och analyseras i Google Analytics.
- Projektet skulle till viss del skrivas i TypeScript.

### Backlog / "Extra krav":

Följande punkter var extra krav som inte var absoluta, men som man skulle sträva efter att implementera:

1. Användaren ska kunna läsa innehåll från flera olika nyhetskällor via öppna API:er.

2. Användarna ska kunna registrera sig och logga in för att spara sina inställningar och favoritnyheter, med användning av Firebase.

3. Användaren ska ha möjlighet till offline läsning av sina nyheter med hjälp av en Service Worker.

## Ytterligare funktionalitet på sidan

Vi har genomfört samtliga obligatoriska krav och bonuskrav i uppgiften för att förbättra användarupplevelsen och tillhandahålla ett mer omfattande tjänsteutbud. För att ytterligare förbättra sidans funktionalitet har vi inkluderat flera extrafunktioner:

- Yahoo Finance API integration: Vi har integrerat Yahoo Finance API för att visa OMXS30-börsdata på sidan, vilket ger användarna aktuella och relevanta ekonomiska uppgifter.

- Namnsdagsfunktion med daglig uppdatering: Vi har inkluderat en omfattande JSON-fil med alla namnsdagar, vilken uppdateras dagligen för att säkerställa korrekt information.

- Väder-API med geolokalisering: Vi har integrerat en väder-API för att ge användarna aktuell väderinformation för deras aktuella plats med hjälp av geolokaliseringsteknik.

- Klocka och datum: För att ytterligare förbättra användarupplevelsen har vi inkluderat en klocka och datumfunktion på sidan, vilket ger användarna snabb och enkel tillgång till aktuellt tid och datum.

Dessa extrafunktioner bidrar till en mer omfattande och engagerande användarupplevelse på sidan.

## Vårt slutresultat

_Bild på vårt slutresultat för dator_
![Omnis hemsida](/src/img/chasnews.png)

_Bild på vårt slutresultat för mobil_
![Omnis hemsida](/src/img/chasnews-mobil.png)

## Installation

För att köra detta projekt lokalt, följ stegen nedan:

1.  **Klona detta repository till din lokala maskin:**

```bash
git clone https://github.com/WilliamBostrom/Nyhetsida.git
```

2.  **Gå in i den klonade mappen::**

```bash
cd ditt-repo

```

3.**Installera projektets beroenden:**

```bash
npm install

```

4.**Öppna sidan:**

```bash
npm run dev
```
