// Get a JSON response from the Mistral API.

import MistralClient from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new MistralClient(apiKey);

const chatResponse = await client.chat({
  model: 'open-mixtral-8x22b',
  messages: [
      { role: 'system', content: 'Reply with JSON' },
      { role: 'user', content: 'What is the best French cheese?' }
  ],
  response_format: {
      types: 'json_object'
  }  
});

console.log(chatResponse.choices[0].message.content);
