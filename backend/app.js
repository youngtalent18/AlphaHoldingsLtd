import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';


const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({extended: true}));

app.use(morgan("dev"));

// app.use(
//   "/api/payment/webhook",
//   express.raw({ type: "*/*" })
// );

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Welcome to Alpha Holdings LTD API" });
});

export default app;