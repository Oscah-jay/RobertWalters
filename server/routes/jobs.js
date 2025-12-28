import express from "express"
import fetch from "node-fetch"

const router = express.Router()

router.get("/", async (req, res) => {
  const { q, location } = req.query

  if (!q || !location) {
    return res.status(400).json({ error: "Missing query params" })
  }

  try {
    const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1
      ?app_id=${process.env.ADZUNA_ID}
      &app_key=${process.env.ADZUNA_KEY}
      &what=${q}
      &where=${location}`

    const response = await fetch(url)
    const data = await response.json()

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" })
  }
})

export default router
