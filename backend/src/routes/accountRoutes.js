// import express from "express";
// import {
//   createAccount,
//   getAccounts,
//   deposit,
//   withdraw,
//   transfer,
// } from "../controllers/accountController.js";
// import { authMiddleware } from "../middleware/auth.js";

// const router = express.Router();

// // @route POST /api/accounts
// // @desc Create a new account
// // @access Private
// router.post("/", authMiddleware, createAccount);

// // @route GET /api/accounts
// // @desc Get all accounts for authenticated user
// // @access Private
// router.get("/", authMiddleware, getAccounts);

// // @route POST /api/accounts/:id/deposit
// // @desc Deposit funds into account
// // @access Private
// router.post("/:id/deposit", authMiddleware, deposit);

// // @route POST /api/accounts/:id/withdraw
// // @desc Withdraw funds from account
// // @access Private
// router.post("/:id/withdraw", authMiddleware, withdraw);

// // @route POST /api/accounts/transfer
// // @desc Transfer funds between accounts
// // @access Private
// router.post("/transfer", authMiddleware, transfer);

// export default router;



import express from "express";
import { createAccount, getAccounts, deposit, withdraw, transfer } from "../controllers/accountController.js";
import { authMiddleware } from "../middleware/auth.js";
 
const router = express.Router();
 
// Apply authMiddleware to all routes to ensure they are protected
router.use(authMiddleware);
 
// Create a new account
router.post("/", createAccount);
 
// Get all accounts of the authenticated user
router.get("/", getAccounts);
 
// Deposit into an account
router.post("/:id/deposit", deposit);
 
// Withdraw from an account
router.post("/:id/withdraw", withdraw);
 
// Transfer between accounts
router.post("/transfer", transfer);
 
export default router;