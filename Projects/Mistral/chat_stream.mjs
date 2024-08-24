// Print out the response from the Mistral chat stream API as its received

import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({apiKey: apiKey});

const chatResponse = await client.chat.stream({
  model: 'open-mixtral-8x7b',
  messages: [
      { role: 'user', content: 'What is the best French cheese?' }
  ],
});

for await (const chunk of chatResponse) {
  console.log(chunk.data.choices[0].delta.content);
}
