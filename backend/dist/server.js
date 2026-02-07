import app from './app.js';
const PORT = process.env.PORT;
app.listen(PORT || 4000, () => {
    console.log(`The server is started at ${PORT}`);
});
/////  "dev": "nodemon --watch src --exec tsx src/server.ts"
///  "dev": "nodemon --watch src --exec node --loader ts-node/esm src/server.ts",
