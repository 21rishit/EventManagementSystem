// // import jwt from "jsonwebtoken";

// // export const protect = (req, res, next) => {
// //   const token = req.header("Authorization");
// //   if (!token) return res.status(401).json({ message: "Access Denied" });

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded;
// //     next();
// //   } catch (err) {
// //     res.status(401).json({ message: "Invalid Token" });
// //   }
// // };
// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1]; // Extract token from Bearer <token>
//   if (!token) return res.status(401).json({ message: "Access Denied: No Token" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid Token" });
//   }
// };

import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
   const token = req.cookies.token;
   if (!token) return res.status(401).json({ message: "Unauthorized" });

   jwt.verify(token, jwtSecret, (err, userData) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      req.user = userData;
      next();
   });
};
