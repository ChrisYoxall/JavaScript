// Example of using langchain to split a text file into smaller chunks

import fs from 'node:fs/promises';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import MistralClient from '@mistralai/mistralai';

async function readTextFile(filePath) {
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (err) {
        console.error('Failed to read file:', err);
    }
}

// Simplest method to split text is CharacterTextSplitter https://js.langchain.com/v0.1/docs/modules/data_connection/document_transformers/character_text_splitter/
// The recommended text splitter for general text is RecursiveCharacterTextSplitter https://js.langchain.com/v0.1/docs/modules/data_connection/document_transformers/recursive_text_splitter/

const data = await readTextFile(`handbook.txt`);

/* Want to split the source into chunks where each chunk deals with a single topic as it will create better
embeddings (better vectors). In general:

    - shorter chunks capture precise meanings but miss wider context
    - longer chunks capture wider context but produce too broad a scope

This means you often ideally want the smallest size without loosing context. Can only work out the 'best' option
through experimentation, and it will vary between different underlying data being chunked. */

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 250,
    chunkOverlap: 40
});

const output = await splitter.createDocuments([data]);

// Output is an array of objects, each object is a chunk of text
const index = 35;
//console.log(output[index]);
//console.log(output[index].metadata);

// Only need the pageContent field
const txtArray = output.map(chunk => chunk.pageContent);
console.log(txtArray[index]);

const client = new MistralClient(process.env.MISTRAL_API_KEY);

// Get the embeddings for one chunk
const embeddingsResponse = await client.embeddings({
    model: 'mistral-embed',
    input: [txtArray[index]]
});

console.log(embeddingsResponse);
console.log(embeddingsResponse.data[0].embedding);

// Create a new array where each item is the chunk and its calculated embedding