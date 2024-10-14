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
                    "content": `Du är spelledaren i ett en-spelar skräckspel. Spelaren vaknar i ett kusligt spökhus utan att veta var hen är. Beskriv situationen och den skrämmande händelse spelaren möter i du-form, som om spelaren själv är karaktären i spelet. Avsluta med att ge tre tydliga val som spelaren kan göra. Strukturera svaret så här: 'scenario: [beskrivning av situation och skrämmande händelse], options: [val1, val2, val3]'.`
                }
            ],
            max_tokens: 300,
        });

        const content = openaiResponse.choices[0].message.content;
        const [scenarioPart, optionsPart] = content.split('options:');
        const options = optionsPart ? optionsPart.trim().split('\n').filter(option => option) : [];

        res.json({
            scenario: scenarioPart.replace('scenario: ', '').trim(),
            options: options.map(option => option.trim())
        });
    } catch (error) {
        console.error("Error fetching story:", error);
        res.status(500).json({ error: "Något gick fel.", details: error.message });
    }
});

module.exports = router;
