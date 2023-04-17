/*
 create postgresql database
 
 user
 ----
 id fk
 username varchar(30) unique not null
 password_hash varchar(60) not null
 nickname varchar(30) not null
 avatar varchar(30) 
 email varchar(30) not null
 
 
 memo
 ----
 id fk
 content varchar(255) not null
 user_id integer >-0 user.id not null
 image
 */
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password_hash VARCHAR(60) NOT NULL,
    nickname VARCHAR(30) NOT NULL,
    avatar VARCHAR(30),
    email VARCHAR(30) NOT NULL
);
CREATE TABLE memo (
    id SERIAL PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL REFERENCES "user" (id),
    image VARCHAR(30)
);