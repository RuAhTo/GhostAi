# **Skräckspel med OpenAI - Dokumentation**

Detta är ett interaktivt textbaserat skräckspel där spelaren gör val baserade på scenarier som genereras av OpenAI:s GPT-3.5. Spelaren tas igenom en serie händelser i en skrämmande miljö, och varje val påverkar hur berättelsen utvecklas. Målgruppen är nästan vem som helst som är intresserad av skräck och rollspel eller bara nyfiken, däremot kan det nog anses olämpligt för barn. 

## **Krav och Förberedelser**
För att köra projektet behöver du:
- **Node.js** installerat på din maskin.
- **OpenAI API-nyckel**.
- En **MongoDB-databas** där spelets data lagras.

## **Installation och Setup**

1. **Klona projektet:**  
   Börja med att klona projektet från GitHub eller den plats där det lagras.

2. **Installera nödvändiga beroenden:**  
   Gå in i både **frontend**- och **backend**-mappen och kör kommandot:

   ```bash
   npm install
   ```

 ## **Konfiguration av miljövariabler:**

I backend-mappen behöver du skapa en `.env`-fil som innehåller följande variabler:

```plaintext
OPENAI_API_KEY=din-openai-api-nyckel
MONGODB_URI=din-mongodb-anslutningssträng
```

## **Starta applikationen:**

Öppna två terminaler:

- I den första terminalen, navigera till backend-mappen och kör:

  ```bash
  npm run dev

- I den andra terminalen, navigera till frontend-mappen och kör:

  ```bash
  npm run dev

## **Hur spelet fungerar**

### **Start av spelet:**
När både frontend och backend körs, öppna webbläsaren och gå till adressen som visas i terminalen (vanligtvis http://localhost:3000).

Du kommer att välkomnas med en startknapp. Klicka på "Börja" för att starta spelet.

### **Spelmekanik:**
- När du startar spelet, skapar du en karaktär genom att ange ett namn.
- Därefter presenteras du för olika scenarier. Varje scenario genereras av OpenAI och kommer att sluta med tre val.
- Beroende på dina val förändras intensiteten och berättelsen utvecklas i olika riktningar.
- När spelets intensitet når en viss nivå, kommer du att tas till spelets slut.

### **Återstart av spelet:**
När spelet är slut kan du välja att spela om genom att klicka på "Spela igen"-knappen.

### **Sammanfattning**
- **Frontend:** Vite + React för användargränssnittet.
- **Backend:** Node.js + Express som hanterar API-förfrågningar och kommunikation med OpenAI och MongoDB.
- **Databas:** MongoDB används för att lagra spelets data.
- **OpenAI:** GPT-3.5 används för att generera skräckscenarier och valmöjligheter.

### **Etisk & säker anvädning**
Det finns en hel del diskussioner kring om OpenAI och andra AI-modeller använder etiskt korrekt träningsdata. En stor fråga handlar om upphovsrätt – många verk som AI tränats på, som böcker och artiklar, har använts utan tillstånd från upphovsmännen. Är det rättvist att kreatörernas arbete används på det sättet? Eller är det en del av den tekniska utvecklingen?

Eftersom spelet kan innehålla skrämmande eller olämpligt innehåll för barn, kan det vara bra att ha en rekommenderad åldersgräns eller varna för känsliga spelare.
