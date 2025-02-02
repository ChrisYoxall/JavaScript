
-- Create database
CREATE DATABASE embeddemo;

-- Create new user rather than use the speruser password
CREATE ROLE embeduser WITH LOGIN PASSWORD 'pa55w0rd';

-- Change to the 'embeddemo' database (this is a psql command)
 \c embeddemo

-- Enable the pgvector extension. Once enabled you can confirm its enabled by doing '\dx'
CREATE EXTENSION vector;

-- Create a table to store the handbook documents. The number after Vector is the number of dimensions
-- in the generated vector which may change if using a different model to generate the vectors
CREATE TABLE handbook_docs (id bigserial primary key, content text, embedding vector(1024));

-- Grant the 'embeduser' user access to the table:
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE handbook_docs TO embeduser;

-- When using serial type (i.e. id column) need to grant sequence permissions
 GRANT USAGE, SELECT ON SEQUENCE handbook_docs_id_seq TO embeduser;
