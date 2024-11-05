import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import movies from "./routes/movies.js";


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 3000

app.use('/movies', movies)

app.listen(PORT, () => {
    console.log('server running on port', PORT)
})