const express = require('express');
const router = express.Router();
const OpenAi = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
});


/**
 * @route GET /start
 */

router.get('/start', async (req, res) => {
    try {
        const openaiResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": `Du är spelledaren i ett en-spelar skräckspel. Spelaren vaknar i ett kusligt spökhus utan att veta var hen är. Beskriv situationen och den skrämmande händelse spelaren möter i du-form, som om spelaren själv är karaktären i spelet. 

                    Begränsa scenariots längd till max 50 ord och gör beskrivningen fokuserad och intensiv. Avsluta med tre tydliga val som spelaren kan göra. Varje val ska vara max 20 ord långt.
                    
                    Svara i ett JSON-format enligt följande struktur:
                    {
                        "scenario": "[beskrivning av situation och skrämmande händelse]",
                        "options": [
                            "[val 1]",
                            "[val 2]",
                            "[val 3]"
                        ]
                    }`
                }
            ],
            max_tokens: 300,
        });

        const content = openaiResponse.choices[0].message.content;
        
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(content);
        } catch (parseError) {
            return res.status(500).json({ error: "Misslyckades med att parsa JSON-svaret från AI:n." });
        }

        if (!parsedResponse.scenario || !Array.isArray(parsedResponse.options) || parsedResponse.options.length !== 3) {
            return res.status(500).json({ error: "Ogiltig struktur på svaret. Förväntat format: { scenario: '', options: ['', '', ''] }" });
        }

        res.json({
            scenario: parsedResponse.scenario.trim(),
            options: parsedResponse.options.map(option => option.trim())
        });

    } catch (error) {
        console.error("Error fetching story:", error);
        res.status(500).json({ error: "Något gick fel.", details: error.message });
    }
});

router.post('/choice', async (req, res) => {
    const { currentStory, playerChoice } = req.body;

    try {
        const openaiResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": `Du är spelledaren i ett en-spelar skräckspel. Spelaren vaknar i ett kusligt spökhus utan att veta var hen är. 
                    
                    Här är berättelsen så långt: "${currentStory}" 
                    Spelaren har gjort följande val: "${playerChoice}". 

                    Beskriv situationen och den skrämmande händelse spelaren möter i du-form, som om spelaren själv är karaktären i spelet. 

                    Begränsa scenariots längd till max 50 ord och gör beskrivningen fokuserad och intensiv. Avsluta med tre tydliga val som spelaren kan göra. Varje val ska vara max 20 ord långt.
                    
                    Svara i ett JSON-format enligt följande struktur:
                    {
                        "scenario": "[beskrivning av situation och skrämmande händelse]",
                        "options": [
                            "[val 1]",
                            "[val 2]",
                            "[val 3]"
                        ]
                    }`
                }
            ],
            max_tokens: 300,
        });

        const responseContent = openaiResponse.choices[0].message.content;

        const jsonResponse = JSON.parse(responseContent);

        res.json(jsonResponse);
        
    } catch (error) {
        console.error('Error in OpenAI API call:', error);
        res.status(500).send('Internal Server Error');
    }
});


 
module.exports = router;
