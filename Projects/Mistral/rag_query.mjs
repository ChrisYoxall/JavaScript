import { Mistral } from '@mistralai/mistralai';
import pg from 'pg';

/*

Note that this requires the handbook to be chunked and added to the database. This is done
by the split_handbook.mjs script.

*/


// 1. Getting the user input
const input = "December 25th is on a Sunday, do I get any extra time off to account for that?";

const apiKey = process.env.MISTRAL_API_KEY || "xxxxxxxx";
const mistralClient = new Mistral({apiKey: apiKey});

// 2. Creating an embedding of the input
const embedding = await createEmbedding(input);


const { Pool } = pg

const pool = new Pool({
    user: 'embeduser',
    host: 'localhost',
    database: 'embeddemo',
    password: 'pa55w0rd',
    port: 5432,
    idleTimeoutMillis: 300
});


// 3. Retrieving similar embeddings / text chunks (aka "context")
const context = await retrieveMatches(embedding);

// 4. Combining the input and the context in a prompt
// and using the chat API to generate a response
const response = await generateChatResponse(context, input);

console.log('Response:', response);


async function createEmbedding(input) {

    const embeddings = await mistralClient.embeddings.create({
        model: 'mistral-embed',
        inputs: [input]
    });
    return embeddings.data[0].embedding;
}

async function retrieveMatches(embedding) {

    try {

        // Find the closest content by searching the vectors.  The '<->' does a L2 distance
        // search.  See the documentation at https://github.com/pgvector/pgvector?tab=readme-ov-file#querying
        const query = `
            SELECT content FROM handbook_docs ORDER BY embedding <-> $1 LIMIT 5;
        `;

        // Need to format vector as string that starts with '[' and ends with ']'.
        const vectorString = `[${embedding.join(',')}]`
        const result = await pool.query(query, [vectorString]);

        // Result is a list of objects with a 'content' key. Just return the content values (i.e. the values
        // saved in the database) combined into a single string.
        return result.rows.map(row => row.content).join(" ");


    } catch (err) {
        console.error('Failed to execute query:', err);
    }

}


async function generateChatResponse(context, query) {

    const chatResponse = await mistralClient.chat.complete({
        model: 'ministral-8b-latest',
        messages: [{
            role: 'user',
            content: `Employee Handbook: "${context}".  Question: "${query}"`
        }],
        //temperature: 0.7 // A value between 0 (deterministic) & 1 (creative/random). 0.7 is the default.
    });

    return chatResponse.choices[0].message.content;

}