# Mistral #

Links:
- Documentation: https://docs.mistral.ai/
- Usage/Billing: https://console.mistral.ai/
- Pricing: https://mistral.ai/technology/#pricing

Set the API key in the environment variable `MISTRAL_API_KEY` before running the code:

    export MISTRAL_API_KEY=xxxxxxx

    or 

    $Env:MISTRAL_API_KEY = "xxxxxxxx"


## Tutorial ##

Much of this was taken from a Scrimba course https://v2.scrimba.com/intro-to-mistral-ai-c035


## To Do ##

Instead of calling the API, try running a model locally. For example https://ollama.com/library/mixtral:8x7b

Not just the LLM model, but also use a model from Hugging Space to generate the embeddings.

Elasticsearch has some interesting RAG / LLM articles: https://www.elastic.co/what-is/vector-embedding#get-started-with-vector-embedding-with-elasticsearch

Learn about LLaMA (llama.cpp) and Ollama. Think Ollama is built on top of llama.cpp, using it as its inference backend and adding a user friendly
layer that makes it much easier to use:

    - https://github.com/ggerganov/llama.cpp
    - https://namrata23.medium.com/run-llms-locally-or-in-docker-with-ollama-ollama-webui-379029060324  Am interested in running it in Docker if possible

Some RAG examples using Postgres & the Llama model to generate embeddings:

    - https://pgdash.io/blog/rag-with-postgresql.html
    - https://www.enterprisedb.com/blog/rag-app-postgres-and-pgvector
    - https://www.enterprisedb.com/blog/what-is-pgvector


Think I'd much rather write this in Python rather than JavaScript / Node



## Retrieval-Augmented Generation (RAG) ##

RAG is used to enhance AI language models by combining specified knowledge with external knowledge retrieval.

Embeddings are a way to represent words, sentences, or documents as vectors in a high-dimensional space. The purpose of embeddings
is to capture the semantic meaning of text, such that words or phrases so that similar meanings are located close to each other in this
vector space. For example 'dog' and 'puppy' should be closer together than 'dog' and 'cat', which in turn should be closer together
than 'dog' and 'spaceship'.

Embedding is a mathematical concept that refers to placing one object into a different space. The vectors used for embeddings often
have hundreds or thousands of dimensions, each referring to a different semantic or contextual meaning of the word/phrase.

You need to split larger pieces of text into smaller chunks as a large number of words (i.e. a full book) doesn't have a specific
semantic meaning.


## Function Calling ##

Function calling tells a LLM about that additional functions that are available to interact with the outside world to
get more information. The LLM can then decide if one of these functions should be used to help respond to the current
prompt. This opens the door to a wide range of possibilities, such as calling APIs, databases, or even running code on
the local machine. This is the basis for AI agents to enable them to interact with the outside world on behalf of
a user.

See https://docs.mistral.ai/capabilities/function_calling/

This is an interesting read: https://medium.com/binome/ai-agent-function-calling-what-really-matters-bfda0cb7cbe7



## Postgres ##

Run Postgres in Docker:

    docker run --name embeddings --rm -e POSTGRES_PASSWORD=secretpassword -d -p 5432:5432 postgres

Copy in scripts to configure the database:

    docker cp DB_config/. embeddings:/

Shell into Postgres container:

    docker exec -it embeddings /bin/bash

Set execute permission on vector_extension.sh file

    chmod +x vector_extension.sh

[Optional] Check Postgres version

    psql --version

Run the setup_db.sql script

    psql -h localhost -p 5432 -U postgres -f ./setup_db.sql

[Optional] Connect to the databases to check. Probably won't be prompted for password inside container

    psql -h localhost -p 5432 -U postgres
