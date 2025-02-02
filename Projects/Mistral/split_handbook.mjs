// Example of using langchain to split a text file into smaller chunks

import fs from 'node:fs/promises';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Mistral } from '@mistralai/mistralai';
import pg from 'pg';

async function readTextFile(filePath) {
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (err) {
        console.error('Failed to read file:', err);
    }
}

// Simplest method to split text is CharacterTextSplitter https://js.langchain.com/v0.1/docs/modules/data_connection/document_transformers/character_text_splitter/
// The recommended text splitter for general text is RecursiveCharacterTextSplitter https://js.langchain.com/v0.1/docs/modules/data_connection/document_transformers/recursive_text_splitter/

const doc = await readTextFile(`handbook.txt`);

/* Want to split the source into chunks where each chunk deals with a single topic as it will create better
embeddings (better vectors). In general:

    - shorter chunks capture precise meanings but miss wider context
    - longer chunks capture wider context but produce too broad a scope

This means you often ideally want the smallest size without loosing context. Can only work out the 'best' option
through experimentation, and it will vary between different underlying data being chunked. 

Note: Do any of the splitters break up text by sentence or paragraph? That seems more logical than guessing length of characters. */

async function splitDocument(doc) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 250,
        chunkOverlap: 40
    });

    const output = await splitter.createDocuments([doc]);
    const txtArray = output.map(chunk => chunk.pageContent);
    return txtArray;
}

const docChunks = await splitDocument(doc);

//console.log(docChunks);

async function createEmbeddings(chunks){

    const apiKey = process.env.MISTRAL_API_KEY || "xxxxxxxx";
    const client = new Mistral({apiKey: apiKey});
    
    const embeddings = await client.embeddings.create({
        model: 'mistral-embed',
        inputs: chunks
    });

    // Create a new array where each item is the chunk and its calculated embedding
    const result = chunks.map((chunk, i) => {
        return {
            content: chunk,
            embedding: embeddings.data[i].embedding
        }
    });

    return result;
}

const embeddings = await createEmbeddings(docChunks);

// const embeddings = [
//     { content: 'This is the first chunk of text.', embedding: [0.1, 0.2, 0.3] },
//     { content: 'This is the second chunk of text.', embedding: [0.4, 0.5, 0.6] },
//     { content: 'This is the third chunk of text.', embedding: [0.7, 0.8, 0.9] },
//     { content: 'This is the fourth chunk of text.', embedding: [0.10, 0.11, 0.12] },
//     { content: 'This is the fifth chunk of text.', embedding: [0.13, 0.14, 0.15] },
//     { content: 'This is the sixth chunk of text.', embedding: [0.16, 0.17, 0.18] },
// ]

// Display one item from result
console.log(embeddings[5]);

// Connect to a PostgreSQL database to store the embeddings. Ensure the settings
// here match the settings for your PostgreSQL database. See the 'readme'.

const { Pool } = pg

const pool = new Pool({
    user: 'embeduser',
    host: 'localhost',
    database: 'embeddemo',
    password: 'pa55w0rd',
    port: 5432,
    idleTimeoutMillis: 300
});


async function storeEmbeddings(embeddings) {

    const client = await pool.connect();

    try {

        await client.query('BEGIN');

        const insertQuery = `
            INSERT INTO handbook_docs (content, embedding)
            VALUES ($1, $2)
        `;

        for (const { content, embedding } of embeddings) {
            // Need to format vector as string that starts with '[' and ends with ']'.
            const vectorString = `[${embedding.join(',')}]`
            // console.log("Inserting:", content);
            await client.query(insertQuery, [content, vectorString]);
        }

        await client.query('COMMIT');

    } catch (err) {
        
        await client.query('ROLLBACK');
        console.error('Failed to store embeddings:', err);

    } finally {
        client.release();
    }
}


await storeEmbeddings(embeddings);

console.log("Done!")
