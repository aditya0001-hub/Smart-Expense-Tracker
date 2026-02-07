import app from './app.js'


// app.use(cors({
//   origin: ["http://localhost:5173", "https://expense-tracker-frontend-nine-rho.vercel.app"],
// }));
// import cors from "cors";




const PORT=process.env.PORT
app.listen(PORT||4000,()=>{
   console.log(`The server is started at ${PORT}`)
})
/////  "dev": "nodemon --watch src --exec tsx src/server.ts"
///  "dev": "nodemon --watch src --exec node --loader ts-node/esm src/server.ts",