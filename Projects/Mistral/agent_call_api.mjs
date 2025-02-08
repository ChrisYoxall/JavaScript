import {Mistral} from '@mistralai/mistralai';
import { availableTools, getPaymentStatus, getPaymentDate } from "./agent_tools.js";

const apiKey = process.env.MISTRAL_API_KEY || "xxxxxxxx";
const mistralClient = new Mistral({apiKey: apiKey});

// Have a string returned from the LLM to say which function to call.
const availableFunctionsWrapper = {
    getPaymentDate,
    getPaymentStatus
};


async function agent(query) {

    const messages = [
        { role: "user", content: query }
    ];

    // Loop here as each request to Mistral may result in a tool call
    for (let i = 0; i < 5; i++) {

        const response = await mistralClient.chat.complete({
            model: 'ministral-8b-latest',
            messages: messages,
            tools: availableTools
        });

        // Need to keep track of the entire conversation when interacting with the LLM
        messages.push(response.choices[0].message);

        // if the finishReason is 'stop' return the response
        // if it's 'tool_calls' then call the suggested function
        if (response.choices[0].finishReason === 'stop') {

            return response.choices[0].message.content;

        } else if (response.choices[0].finishReason === 'tool_calls') {

            const toolObject = response.choices[0].message.toolCalls[0];
            const functionName = toolObject.function.name;
            const functionArgs = JSON.parse(toolObject.function.arguments);
            const functionResponse = availableFunctionsWrapper[functionName](functionArgs);

            // This doesn't work currently as the response. The error message is:
            //  "Tool call id has to be defined."  However, this seems correct according
            // to https://docs.mistral.ai/capabilities/function_calling/
            messages.push({
                role: 'tool',
                tool_call_id: toolObject.id,
                name: functionName,
                content: functionResponse
            });

            console.log(messages[2]);

        }
    }
}

const response = await agent("Is the transaction T1001 paid?");
//await agent("When was transaction T1001 paid?");

console.log(response);