// First example of calling the Mistral API.

import MistralClient from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new MistralClient(apiKey);

// models at https://docs.mistral.ai/getting-started/models/
const chatResponse = await client.chat({
  model: 'open-mixtral-8x22b',
  messages: [
      //{ role: 'system', content: 'You are a friendly cheese connoisseur. When asked about cheese reply concisely and humorously.' },
      { role: 'user', content: 'What is the best French cheese?' }
  ],
  //temperature: 0.7 // A value between 0 (deterministic) & 1 (creative/random). 0.7 is the default. 
});

console.log('Chat:', chatResponse.choices[0].message.content);