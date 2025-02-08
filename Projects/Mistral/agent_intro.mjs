import {Mistral} from '@mistralai/mistralai';
import { availableTools } from "./agent_tools.js";

const apiKey = process.env.MISTRAL_API_KEY || "xxxxxxxx";
const mistralClient = new Mistral({apiKey: apiKey});


// This is mostly a standard chat request, except for the 'tools' field in the request. Refer to
// the documentation at https://docs.mistral.ai/capabilities/function_calling/
async function agent(query) {

    const messages = [
        { role: "user", content: query }
    ];

    return await mistralClient.chat.complete({
        model: 'ministral-8b-latest',
        messages: messages,
        tools: availableTools
    });
}



// Just run one of these requests. They are examples of requests to a chatbot or similar.
//const response = await agent("Is the transaction T1001 paid?");
const response = await agent("When was transaction T1001 paid?");


console.log(JSON.stringify(response, null, 2));

/* Returns the following. Note tha the choices[0].response.content that we have used so far is empty, but the
toolCalls array is suggesting that the getPaymentStatus function be called.  Additionally, the finishReason is
"tool_calls" rather than "stop" which means that it's waiting for the response from that tool call to be sent back.

    {
      "id": "894597ed66724cfea51f4d0f987f8395",
      "object": "chat.completion",
      "model": "ministral-8b-latest",
      "usage": {
        "promptTokens": 84,
        "completionTokens": 25,
        "totalTokens": 109
      },
      "created": 1738972111,
      "choices": [
        {
          "index": 0,
          "message": {
            "content": "",
            "toolCalls": [
              {
                "id": "YUYprNUBG",
                "function": {
                  "name": "getPaymentStatus",
                  "arguments": "{\"transactionId\": \"T1001\"}"
                }
              }
            ],
            "prefix": false,
            "role": "assistant"
          },
          "finishReason": "tool_calls"
        }
      ]
    }

*/
