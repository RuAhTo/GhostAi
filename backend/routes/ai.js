const express = require('express');
const router = express.Router();
const OpenAi = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
});

const storyGenerator = () => {
    const villains = ['A shadowy figure', 'A cursed spirit', 'An ancient demon', 'A malevolent entity'];
    const themes = ['Desperation', 'Betrayal', 'Fear of the unknown', 'Isolation'];
    const inspirations = ['A forgotten diary', 'A strange painting', 'An old artifact', 'A haunted house', 'Scandinavian folklore'];
  
    const villain = villains[Math.floor(Math.random() * villains.length)];
    const theme = themes[Math.floor(Math.random() * themes.length)];
    const inspiration = inspirations[Math.floor(Math.random() * inspirations.length)];
  
    return { villain, theme, inspiration };
  };


/**
 * @route GET /start
 */

router.get('/start', async (req, res) => {
  try {
    // Generate keywords for the story
    const { villain, theme, inspiration } = storyGenerator();
    console.log(villain, theme, inspiration)

    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are the game master in a single-player horror game, inspired by H.P. Lovecraft and Stephen King. The player wakes up without knowing where they are. Guide the player through 5 stages of increasing intensity:

            Villain: ${villain}.
            Theme: ${theme}.
            Source of inspiration: ${inspiration}.

            Intensity Scale:
            1 - Low tension: Beginning of the story, mild eerie occurrences.
            2 - Rising tension: The player senses danger, events start to feel unsettling.
            3 - Moderate tension: Strange and eerie occurrences intensify. This is halfway through the story.
            4 - High tension: The player is close to facing the villain or horror.
            5 - Climax: Ultimate horror confrontation. This will be the last choice the player to makes.

            The current intensity level is 1. Adjust the tension accordingly.

            Describe the situation and terrifying event in the second person, as if the player is the character.

            Write in Swedish. Limit the scenario to 50 words, and provide three clear choices. Each choice should be a maximum of 20 words long.

            Respond in JSON format:
            {
              "scenario": "[description of the situation and terrifying event]",
              "options": [
                "[choice 1]",
                "[choice 2]",
                "[choice 3]"
              ]
            }`,
        },
      ],
      max_tokens: 300,
    });

    const content = openaiResponse.choices[0].message.content;

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(content);
    } catch (parseError) {
      return res.status(500).json({ error: 'Failed to parse JSON response from the AI.' });
    }

    if (!parsedResponse.scenario || !Array.isArray(parsedResponse.options) || parsedResponse.options.length !== 3) {
      return res.status(500).json({ error: 'Invalid response structure. Expected format: { scenario: "", options: ["", "", ""] }' });
    }

    res.json({
      scenario: parsedResponse.scenario.trim(),
      options: parsedResponse.options.map(option => option.trim()),
      villain,  // Include the generated keywords
      theme,
      inspiration,
    });

  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ error: 'Something went wrong.', details: error.message });
  }
});


/**
 * @route POST /choice
 */

router.post('/choice', async (req, res) => {
    const { currentStory, playerChoice, intensity } = req.body;
    console.log(currentStory, playerChoice, intensity);

    try {
        // Check if it's the final stage
        if (intensity >= 6) {
            // Generate the final story and conclusion with no further choices
            const openaiResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "system",
                        "content": `You are the game master in a Swedish single-player horror game. The player wakes up with no memory of where they are. The game has six intensity levels, ending in a definitive conclusion at level 6. There are no further events or choices.
                      
                        Intensity level 6: This is the final stage of the game.
                      
                        Story so far: "${currentStory}".
                        Player's choice: "${playerChoice}".
                        Current intensity: 6 (Final stage).
                      
                        Based on the player's previous choices, conclude the story definitively. The player either escapes or meets their demise.
                      
                        Write the ending in Swedish (max 150 words). Do not leave any loose ends. This is the final part of the game.
                      
                        Respond in JSON format:
                        {
                        "scenario": "[final story conclusion]"
                        }
                        `
                      }
                ],
                max_tokens: 200,
            });

            const responseContent = openaiResponse.choices[0].message.content;
            const jsonResponse = JSON.parse(responseContent);

            res.json(jsonResponse); // Return the final story without options
        } else {
            // Continue the story with new choices if intensity is less than 6
            const openaiResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "system",
                        "content": `You are the game master in a Swedish single-player horror game. The player wakes up with no memory of where they are. You will build tension through five intensity levels:

                        Intensity Scale:
                        1 - Low tension: Beginning of the story, mild eerie occurrences.
                        2 - Rising tension: The player senses danger, events start to feel unsettling.
                        3 - Moderate tension: Strange and eerie occurrences intensify. This is halfway through the story.
                        4 - High tension: The player is close to facing the villain or horror.
                        5 - Climax: Ultimate horror confrontation. This will be the last choice the player to makes.

                        Story so far: "${currentStory}".
                        Player's choice: "${playerChoice}".
                        Current intensity: ${intensity}.

                        Describe the consequence of the player's choice in detail. Then, continue the story in the second person as if the player is the character.

                        Write the scenario in Swedish (max 50 words), and provide three clear choices (each max 20 words).

                        Respond in JSON format:
                        {
                        "scenario": "[detailed description of the situation and event]",
                        "options": [
                            "[choice 1]",
                            "[choice 2]",
                            "[choice 3]"
                        ]
                        }
                        `
                    }
                ],
                max_tokens: 300,
            });

            const responseContent = openaiResponse.choices[0].message.content;
            const jsonResponse = JSON.parse(responseContent);

            res.json(jsonResponse); // Return the story with choices
        }

    } catch (error) {
        console.error('Error in OpenAI API call:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
