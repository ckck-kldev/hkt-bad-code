CREATE USER memo_demo_admin WITH PASSWORD 'admin' SUPERUSER;
CREATE DATABASE memo_demo;
\ c memo_demo;
ALTER USER memo_demo_admin WITH LOGIN;
CREATE TABLE "staff"(
    "id" serial PRIMARY KEY,
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(40) NOT NULL
);
INSERT INTO staff (username, password)
VALUES ('admin', '123456');