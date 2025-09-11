// import express from "express";
// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@as-integrations/express5";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import { typeDefs, resolvers } from "./graphql/schema.js";
// import accountRoutes from "./routes/accountRoutes.js";
// import jwt from "jsonwebtoken";

// dotenv.config();

// const app = express();

// // Middleware for REST routes
// app.use(cors());
// app.use(express.json());
// app.use("/api/accounts", accountRoutes);

// // Apollo Server setup
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// const startServer = async () => {
//   await server.start();

//   // GraphQL route with context reading token from header
//   app.use(
//     "/graphql",
//     expressMiddleware(server, {
//       context: async ({ req }) => {
//         const authHeader = req.headers.authorization; // get header
//         let user = null;

//         if (authHeader?.startsWith("Bearer ")) {
//           const token = authHeader.split(" ")[1];
//           try {
//             const payload = jwt.verify(token, process.env.JWT_SECRET);
//             user = payload; // payload contains userId, role, etc.
//           } catch (err) {
//             user = null; // invalid token
//           }
//         }

//         return { user }; // will be available in resolvers
//       },
//     })
//   );

//   // MongoDB connection and server start
//   mongoose
//     .connect(process.env.MONGO_URL)
//     .then(() => {
//       console.log("MongoDB connected");
//       const PORT = process.env.PORT || 4000;
//       app.listen(PORT, () => {
//         console.log(`Server ready at http://localhost:${PORT}/graphql`);
//       });
//     })
//     .catch((err) => console.error("MongoDB error:", err));
// };

// startServer();


import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { typeDefs, resolvers } from "./graphql/schema.js";
import { authMiddleware } from './middleware/auth.js';
import accountRoutes from "./routes/accountRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
 
 
dotenv.config();
 
const app = express();
 
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
 
const startServer = async () => {
  await server.start();
 
  app.use(cors());
  app.use(express.json());
  app.use("/api/accounts", accountRoutes);
  app.use("/api/loans",loanRoutes);
  app.use("/api/auth", authRoutes);
 
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        authMiddleware(req, res, () => {});
        return { user: req.user };
      },
    })
  );
 
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDB connected");
 
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}/graphql`);
      });
    })
    .catch(err => console.error("MongoDB connection error:", err));
};

 
startServer();