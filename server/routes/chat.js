import express from "express"
import fetch from "node-fetch"

const router = express.Router()

// Simple lists for basic keyword detection
const locationsList = ["nairobi", "mombasa", "kisumu", "remote", "kenya"]
const rolesList = ["developer", "designer", "engineer", "marketing", "manager", "teacher"]

router.post("/", async (req, res) => {
  const { message } = req.body

  if (!message) {
    return res.status(400).json({ reply: "Please enter a message." })
  }

  const msg = message.toLowerCase()

  // Detect location
  let where = locationsList.find(loc => msg.includes(loc)) || null

  // Detect role
  let what = rolesList.find(role => msg.includes(role)) || null

  // Check for combined pattern "role in location"
  const combinedMatch = msg.match(/(.+) in (.+)/i)
  if (combinedMatch) {
    what = combinedMatch[1].trim()
    where = combinedMatch[2].trim()
  }

  // Prompt for missing info
  if (!what && !where) {
    return res.json({ reply: "Which job role and location are you interested in? (e.g., Developer in Nairobi)" })
  }
  if (!what) {
    return res.json({ reply: "What kind of job are you looking for? (e.g., Developer, Designer, Engineer)" })
  }
  if (!where) {
    return res.json({ reply: `Which location are you interested in for ${what} jobs?` })
  }

  // Call Adzuna API
  try {
    const url = `https://api.adzuna.com/v1/api/jobs/ke/search/1?app_id=${process.env.ADZUNA_ID}&app_key=${process.env.ADZUNA_KEY}&what=${encodeURIComponent(what)}&where=${encodeURIComponent(where)}`

    const response = await fetch(url)
    const data = await response.json()

    if (!data.results || data.results.length === 0) {
      return res.json({
        reply: `I couldn’t find any ${what} jobs in ${where}. Try another role or location.`
      })
    }

    // Format top 3 jobs nicely
    const jobs = data.results.slice(0, 3).map(job =>
      `• ${job.title} at ${job.company.display_name} (${job.location.display_name})`
    )

    return res.json({
      reply: `Here are some ${what} jobs in ${where}:\n\n${jobs.join("\n")}`
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ reply: "Sorry, something went wrong while fetching jobs." })
  }
})

export default router
