// Print out the response from the Mistral chat stream API as its received

import MistralClient from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new MistralClient(apiKey);

const chatResponse = await client.chatStream({
  model: 'open-mixtral-8x22b',
  messages: [
      { role: 'user', content: 'What is the best French cheese?' }
  ],
});

for await (const chunk of chatResponse) {
  console.log(chunk.choices[0].delta.content);
}
