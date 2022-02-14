import express from "express"
import dotenv from "dotenv"
import colors from "colors"

import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import chatMessageRoutes from "./routes/chatMessageRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running")
})

app.use("/api/user", userRoutes)
app.use("/api/post", postRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", chatMessageRoutes)
//app.use("api/chatMessage", chatMessageRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
)
