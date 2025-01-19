# Mistral #

Links:
- Documentation: https://docs.mistral.ai/
- Usage/Billing: https://console.mistral.ai/
- Pricing: https://mistral.ai/technology/#pricing

Set the API key in the environment variable `MISTRAL_API_KEY` before running the code:

    export MISTRAL_API_KEY=xxxxxxxx

    or 

    $Env:MISTRAL_API_KEY = "xxxxxxxx"


## Tutorial ##

Much of this was taken from a Scrimba course https://v2.scrimba.com/intro-to-mistral-ai-c035


## To Do ##

Instead of calling the API, try running the a model locally. For example https://ollama.com/library/mixtral:8x7b

Not just the LLM model, but also use a model from Hugging Space to generate the embeddings.


Look into Dev Containers. They are a VS Code thing but I think the Jetbrains tools all support them:

    - https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/adding-a-dev-container-configuration/introduction-to-dev-containers
    - https://code.visualstudio.com/docs/devcontainers/containers
    - https://www.mikekasberg.com/blog/2021/11/06/what-are-dev-containers.html

Elasticsearch has some interesting RAG / LLM articles: https://www.elastic.co/what-is/vector-embedding#get-started-with-vector-embedding-with-elasticsearch

Learn about LLaMA (llama.cpp) and Ollama. Think Ollama is built on top of llama.cpp, using it as its inference backend and adding a user friendly
layer that makes it much easier to use:

    - https://github.com/ggerganov/llama.cpp
    - https://namrata23.medium.com/run-llms-locally-or-in-docker-with-ollama-ollama-webui-379029060324  Am interested in running it in Docker if possible

Some RAG examples using Postgress & the Llama model to generate embeddings:

    - https://pgdash.io/blog/rag-with-postgresql.html
    - https://www.enterprisedb.com/blog/rag-app-postgres-and-pgvector
    - https://www.enterprisedb.com/blog/what-is-pgvector
    - https://www.enterprisedb.com/blog/what-is-pgvector


Think I'd much rather write this in Python rather than JavaScript / Node



## Retrieval-Augmented Generation (RAG) ##

RAG is used to enhance AI language models by combining specified knowledge with external knowledge retrieval.

Embeddings are a way to represent words, sentences, or documents as vectors in a high-dimensional space. The purpose of embeddings
is to capture the semantic meaning of text, such that words or phrases so that similar meanings are located close to each other in this
vector space. For example 'dog' and 'puppy' should be closer together than 'dog' and 'cat', which in turn should be closer together
than 'dog' and 'spaceship'.

Embedding is a mathematical concept that refers to placing one object into a different space. The vectors used for embeddings often
have hundreds or thousands of dimensions, each refering to a different semantic or contextual meaning of the word/phrase.

You need to split larger pieces of text into smaller chunks as a large number of words (i.e. a full book) doesn't have a specific
semantic meaning.


## Postgress ##

Run Postgres in Docker:

    docker run --name embeddings --rm -e POSTGRES_PASSWORD=secretpassword -d -p 5432:5432 postgres

Shell into Postgres container:

    docker exec -it embeddings /bin/bash

Check Postgress version:

    psql --version

Install Git & tools to build pgvector (note version number for Postress development files):

    apt-get update && apt-get install git build-essential postgresql-server-dev-17

Compile & install the pgvector Postress extension (as per https://github.com/pgvector/pgvector):

    cd /tmp
    git clone --branch v0.8.0 https://github.com/pgvector/pgvector.git # note version number
    cd pgvector
    make
    make install

Connect to Postgress instance using 'psql' (likely not prompted for password inside container):

    psql -h localhost -p 5432 -U postgres

Create database:

    CREATE DATABASE embeddemo;

Create new user so don't need superuser password:

    CREATE ROLE embeduser WITH LOGIN PASSWORD 'pa55w0rd';

Change to the 'embeddemo' database:

    \c embeddemo

Enable the pgvector extension. Once enabled you can confirm its enabled by doing '\dx':

    CREATE EXTENSION vector;

Create a table to store the handbook documents. The number after Vector is the number of dimensions in the generated vector which may change
if using a different model to generate the vectors:

    CREATE TABLE handbook_docs (id bigserial primary key, content text, embedding vector(1024));

Grant the 'embeduser' user access to the table:

    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE handbook_docs TO embeduser;

As using 'bigserial' type for 'id' need sequence permissions:

    GRANT USAGE, SELECT ON SEQUENCE handbook_docs_id_seq TO embeduser;



