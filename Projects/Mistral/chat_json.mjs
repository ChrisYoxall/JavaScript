// Get a JSON response from the Mistral API.

import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({apiKey: apiKey});

const chatResponse = await client.chat.complete({
  model: 'ministral-8b-latest',
  messages: [
      { role: 'system', content: 'Reply with JSON' },
      { role: 'user', content: 'What is the best French cheese?' }
  ],
    responseFormat: {
      types: 'json_object'
  }  
});

//console.log(chatResponse);
console.log(chatResponse.choices[0].message.content);
