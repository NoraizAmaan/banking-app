import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import mongoose from "mongoose";
import dotenv from "dotenv";
//import cors from "cors";
import { typeDefs,resolvers } from "./graphql/schema.js";
import {authMiddleware} from './middleware/auth.js'
//Load env variables
dotenv.config();
           

const app = express();
app.use(express.json())

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startServer = async () =>{
    //Start the Apollo Server
    await server.start();

//use expressMiddleware to integrate apollo server with express 
app.use(
    '/graphql',
    expressMiddleware(server,{
        context: async ({req, res})=>{
            authMiddleware(req, res, ()=>{ });
            // console.log(`${JSON.stringify(req.body)}`);
            
            return {user: req.user};
        },
    })
);
//MongoDB connection and server start;
mongoose.connect(process.env.MONGO_URL)
    .then(()=> {
        console.log("MongoDB connected");
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, ()=>{
            console.log(`Server ready at http://localhost:${PORT}/graphql`);
        })
    })
    .catch(err => console.error("MongoDB error:", err));


};

startServer();

