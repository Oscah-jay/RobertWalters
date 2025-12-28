import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "../")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"))
})


// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running 🚀" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

import jobsRoute from "./routes/jobs.js"

app.use("/api/jobs", jobsRoute)

import chatRoute from "./routes/chat.js"

app.use("/api/chat", chatRoute)
