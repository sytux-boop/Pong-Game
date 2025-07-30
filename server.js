const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, "public/statics")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/index.html'))
})

app.listen(PORT, () => console.log(`Server running! http://localhost:${PORT}`))