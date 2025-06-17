import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" }); // ✅ Load config first

import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

// ✅ Get env variables after dotenv.config()
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

console.log("✅ Loaded Mongo URI:", mongoURI);

// ✅ Connect to MongoDB once
connectDB(mongoURI).catch((err) =>
  console.error("❌ Failed to connect to MongoDB:", err.message)
);

const app = express();
// app.options("*", cors()); // allow preflight requests globally

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("🔥 Request received:", req.method, req.originalUrl);
  next();
});

// const allowedOrigins = ["http://localhost:3000"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // Required if you want to use cookies or authorization headers
//   })
// );
// const allowedOrigins = ["http://localhost:3000"];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // Needed for cookies/auth headers
// }));

// // Preflight requests for all routes
// app.options("*", cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));


// app.options("*", cors());

const allowedOrigins = ["http://localhost:3000"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));

// app.options("*", cors()); // Allow preflight for all routes

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));

// ✅ Then routers
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});

