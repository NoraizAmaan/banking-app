// import jwt from 'jsonwebtoken';

// export const authMiddleware = (req, res, next)=>{
//     const authHeader = req.headers.authorization;
//     const token = authHeader?.split(" ")[1];

//     if(token){
//         try{
//             const payload = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = payload
//         }
//         catch(err){
//             req.user = null;
//         }
//     }else{
//         req.user = null;
//     }
//     if (next){
//         next();
//     }
// };

import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
//   console.log("Auth Header:", authHeader);   // 👀 check if token is coming

  const token = authHeader?.split(" ")[1];

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log("Decoded Payload:", payload); // 👀 check decoded token
      req.user = payload;
    } catch (err) {
    //   console.error("JWT Error:", err.message);
      req.user = null;
    }
  } else {
    req.user = null;
  }

  if (next) next();
};
