# questions

- server
- middleware
- form submission

# steps

1. `npm init --yes`
2. `npm install -D typescript ts-node-dev ts-node @types/node`
3. setup `tsconfig.json`
4. `npm install express`
5. `npm install -D @types/express`
6. setup `server.ts`
7. setup `ts-node-dev server.ts` in `package.json` `start` script
8. start the server with `npm start`

For `server.ts`, apply below list of middlewares:

- `express.static('public')`
- `express.json()`
- `express.urlencoded()`

9. setup routes
10. `npm install express-session`
11. `npm install -D @types/express-session`
12. setup the session middleware

13. `npm install formidable`
14. `npm install -D @types/formidable`
