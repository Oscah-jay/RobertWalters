console.log("initMobileMenu called")


function toggleChatbot() {
  const chatbotWindow = document.getElementById("chatbotWindow")
  const chatbotBubble = document.getElementById("chatbotBubble")
  const chatInput = document.getElementById("chatInput")

  if (!chatbotWindow) return

  const isOpen = chatbotWindow.classList.contains("show")

  if (isOpen) {
    chatbotWindow.classList.remove("show")
    if (chatbotBubble) chatbotBubble.style.display = "flex"
  } else {
    chatbotWindow.classList.add("show")
    if (chatbotBubble) chatbotBubble.style.display = "none"
    if (chatInput) chatInput.focus()
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("chatbotBubble")
    ?.addEventListener("click", toggleChatbot)

  document.querySelector(".chatbot-close-btn")
    ?.addEventListener("click", toggleChatbot)
})


// GlobalCareer Connect initialized
document.addEventListener("DOMContentLoaded", () => {
  console.log("GlobalCareer Connect initialized")

  // Show home page by default
  showPage("home")

  // Add smooth reveal animations on load
  const hero = document.querySelector(".hero")
  setTimeout(() => {
    hero.style.opacity = "1"
  }, 100)
})

// Global App Controller
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing Independent Components...")
  initNavbar()
  initMobileMenu()
  initEligibilityChecker()
  initWorldMap()
  initEmployerPortal()
  initResources()
  initAuthSystem()
  initChatbot()
  initAnimations()
  initNavigation()
  initSearchModal() // Initializing search modal handlers
})

function initNavbar() {
  const navbar = document.getElementById("navbar")
  if (!navbar) return

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
}

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const navLinks = document.getElementById("navLinks")
  if (!mobileMenuBtn || !navLinks) return

  // Remove previous listener to prevent duplicates
  mobileMenuBtn.replaceWith(mobileMenuBtn.cloneNode(true))
  const newBtn = document.getElementById("mobileMenuBtn")

  newBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    const icon = newBtn.querySelector("i")
    if (!icon) return
    icon.classList.toggle("fa-times")
    icon.classList.toggle("fa-bars")
  })
}


function initEligibilityChecker() {
  const eligibilityForm = document.getElementById("eligibilityForm")
  const eligibilityResult = document.getElementById("eligibilityResult")
  if (!eligibilityForm || !eligibilityResult) return

  eligibilityForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const profession = document.getElementById("profession")?.value
    const experience = document.getElementById("experience")?.value

    eligibilityResult.innerHTML =
      '<p class="loading-state"><i class="fas fa-spinner fa-spin"></i> Analyzing with AI...</p>'
    eligibilityResult.classList.add("show")

    setTimeout(() => {
      // Result generation logic (remains independent)
      let resultHTML = `<h4 class="match-title"><i class="fas fa-check-circle"></i> AI Recommended Matches</h4>`
      // ... result logic ...
      resultHTML += `<button onclick="resetEligibilityChecker()" class="btn btn-secondary btn-full"><i class="fas fa-redo"></i> Check Another Path</button>`
      eligibilityResult.innerHTML = resultHTML
    }, 1500)
  })
}

window.resetEligibilityChecker = () => {
  const res = document.getElementById("eligibilityResult")
  const form = document.getElementById("eligibilityForm")
  if (res) {
    res.classList.remove("show")
    res.innerHTML = ""
  }
  if (form) form.reset()
}

function initWorldMap() {
  const hotspots = document.querySelectorAll(".hotspot")
  const details = document.getElementById("locationDetails")
  if (hotspots.length === 0 || !details) return

  hotspots.forEach((hotspot) => {
    hotspot.addEventListener("click", () => {
      const country = hotspot.getAttribute("data-country")
      const jobs = hotspot.getAttribute("data-jobs")

      const nameEl = document.getElementById("locationName")
      const jobsEl = document.getElementById("locationJobs")

      if (nameEl) nameEl.textContent = country
      if (jobsEl) jobsEl.textContent = jobs
      // ... other fields with checks ...

      details.classList.add("show")
    })
  })
}

window.closeLocationDetails = () => {
  const details = document.getElementById("locationDetails")
  if (details) details.classList.remove("show")
}

function initNavigation() {
  // Tab handling
  window.openTab = (tabId) => {
    if (tabId === "dashboard") {
      window.location.href = "dashboard.html"
      return
    }
    const tab = document.getElementById(`tab-${tabId}`)
    if (tab) {
      tab.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  }

  window.closeTab = (tabId) => {
    const tab = document.getElementById(`tab-${tabId}`)
    if (tab) {
      tab.classList.remove("active")
      document.body.style.overflow = ""
    }
  }

  // Close overlays on outside click
  const navLinks = document.getElementById("navLinks") // Declare navLinks here
  document.querySelectorAll(".tab-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) window.closeTab(overlay.id.replace("tab-", "")) // Use window.closeTab here
    })
  })

  // Global escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".tab-overlay.active").forEach((t) => t.classList.remove("active"))
      document.body.style.overflow = ""
    }
  })
}

// Smooth scrolling
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  const navLinks = document.getElementById("navLinks") // Declare navLinks here
  section.scrollIntoView({ behavior: "smooth" })
  navLinks.classList.remove("active")
}

// Map hotspot interactions
const hotspots = document.querySelectorAll(".hotspot")
hotspots.forEach((hotspot) => {
  hotspot.addEventListener("click", function () {
    showLocationDetails(this)
  })
})

function showLocationDetails(element) {
  const country = element.getAttribute("data-country")
  const jobs = element.getAttribute("data-jobs")
  const visa = element.getAttribute("data-top-visa")
  const salary = element.getAttribute("data-salary")
  const demand = element.getAttribute("data-demand")

  document.getElementById("locationName").textContent = country
  document.getElementById("locationJobs").textContent = jobs
  document.getElementById("locationVisa").textContent = visa
  document.getElementById("locationSalary").textContent = salary
  document.getElementById("locationDemand").textContent = demand

  document.getElementById("locationDetails").classList.add("show")
}

function closeLocationDetails() {
  document.getElementById("locationDetails").classList.remove("show")
}

function applyToLocation() {
  const locationName = document.getElementById("locationName").textContent
  alert(
    `Great choice! Let's start your application process for ${locationName}.\n\nYou'll be redirected to the Employers section.`,
  )
  closeLocationDetails()
  closeTab("opportunities")
  setTimeout(() => openTab("employers"), 300)
}


// Employer Form Submission
const employerForm = document.getElementById("employerForm")
const resumeInput = document.getElementById("resume")
const fileLabel = document.getElementById("fileLabel")

resumeInput.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    fileLabel.innerHTML = `<i class="fas fa-check-circle"></i> ${this.files[0].name}`
    fileLabel.style.color = "var(--secondary)"
  }
})

employerForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const submitButton = employerForm.querySelector('button[type="submit"]')
  if (!submitButton) return

  const originalText = submitButton.innerHTML

  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...'
  submitButton.disabled = true

  setTimeout(() => {
    submitButton.innerHTML = '<i class="fas fa-check"></i> Submitted Successfully!'
    setTimeout(() => {
      employerForm.reset()
      const fileLabel = document.getElementById("fileLabel")
      if (fileLabel) {
        fileLabel.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Upload Resume (PDF, DOC)'
        fileLabel.style.color = ""
      }
      submitButton.innerHTML = originalText
      submitButton.disabled = false
      alert("Your application has been submitted successfully! The recruiter will contact you soon.")
      if (typeof closeRecruiterModal === "function") closeRecruiterModal()
    }, 2000)
  }, 2000)
})

// Download Resources
function downloadResource(resourceType) {
  const resources = {
    "visa-guide": "Visa_Guide_2024.pdf",
    "resume-templates": "Resume_Templates.zip",
    "interview-guide": "Interview_Guide.pdf",
    checklist: "Relocation_Checklist.pdf",
  }

  alert(
    `Downloading ${resources[resourceType]}...\n\nNote: This is a demo. In production, this would trigger an actual file download.`,
  )
}

// Login Modal
const loginBtn = document.getElementById("loginBtn")
const loginModal = document.getElementById("loginModal")

loginBtn.addEventListener("click", openLoginModal)

function openLoginModal() {
  loginModal.classList.add("show")
}

function closeLoginModal() {
  loginModal.classList.remove("show")
}

// Close modal on outside click
loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    closeLoginModal()
  }
})

// Switch auth tabs
function switchAuthTab(tab) {
  const tabs = document.querySelectorAll(".auth-tab")
  const loginForm = document.getElementById("loginForm")
  const signupForm = document.getElementById("signupForm")

  tabs.forEach((t) => t.classList.remove("active"))

  if (tab === "login") {
    tabs[0].classList.add("active")
    loginForm.style.display = "block"
    signupForm.style.display = "none"
  } else {
    tabs[1].classList.add("active")
    loginForm.style.display = "none"
    signupForm.style.display = "block"
  }
}

// Handle login
function handleLogin(e) {
  e.preventDefault()
  const email = document.getElementById("loginEmail").value

  alert(`Login successful for ${email}! Redirecting to dashboard...`)

  localStorage.setItem("isLoggedIn", "true")
  localStorage.setItem(
    "userData",
    JSON.stringify({
      name: "John Doe",
      email: email,
      role: "Software Engineer",
    }),
  )

  window.location.href = "dashboard.html"
}

// Handle signup
function handleSignup(e) {
  e.preventDefault()
  const name = document.getElementById("signupName").value
  const email = document.getElementById("signupEmail").value

  alert(
    `Account created successfully for ${name} (${email})!\n\nNote: This is a demo. In production, this would create an account.`,
  )
  closeLoginModal()
}

// Chatbot
function initChatbot() {
  const chatbotBubble = document.getElementById("chatbotBubble")
  const chatbotWindow = document.getElementById("chatbotWindow")
  const chatbotMessages = document.getElementById("chatbotMessages")
  const chatInput = document.getElementById("chatInput")

  if (chatbotBubble && chatbotWindow) {
    chatbotBubble.addEventListener("click", () => {
      chatbotWindow.classList.toggle("show")
      if (chatbotWindow.classList.contains("show") && chatInput) {
        chatInput.focus()
      }
    })
  }

  // Exposed to window for inline quick action buttons and resilience
  window.handleQuickAction = (action) => {
    const messages = document.getElementById("chatbotMessages")
    const welcome = document.querySelector(".chatbot-welcome")
    const actionsContainer = document.querySelector(".chatbot-quick-actions")
    const questionsContainer = document.querySelector(".chatbot-quick-questions")

    if (!messages) return

    const actions = {
      hiring: "I'm looking to hire talent for my company.",
      seeking: "I'm looking for job opportunities internationally.",
      visa: "I need help with visa requirements and applications.",
      demo: "I'd like to book a demo to learn more about your services.",
    }

    const message = actions[action]
    if (message) {
      messages.style.display = "block"
      if (welcome) welcome.style.display = "none"
      if (actionsContainer) actionsContainer.style.display = "none"
      if (questionsContainer) questionsContainer.style.display = "none"

      addChatMessage(message, "user")

      setTimeout(async () => {
        const reply = await getBotReply(message)
        addChatMessage(reply, "bot")
      }, 500)
    }
  }
}

function handleChatKeypress(event) {
  if (event.key === "Enter") {
    sendMessage()
  }
}


function handleQuickQuestion(button) {
  const question = button.textContent
  const messages = document.getElementById("chatbotMessages")
  const welcome = document.querySelector(".chatbot-welcome")
  const actions = document.querySelector(".chatbot-quick-actions")
  const questions = document.querySelector(".chatbot-quick-questions")

  if (!messages) return

  // Show chat messages area
  messages.style.display = "block"
  if (welcome) welcome.style.display = "none"
  if (actions) actions.style.display = "none"
  if (questions) questions.style.display = "none"

  // Add user message
  addChatMessage(question, "user")

  // Add bot response
  setTimeout(async () => {
    const reply = await getBotReply(question)
    addChatMessage(reply, "bot")
  }, 500)
  
}

function addChatMessage(message, type) {
  const messages = document.getElementById("chatbotMessages")
  if (!messages) return

  const msg = document.createElement("div")
  msg.className = `chat-message ${type}`

  msg.innerText = message

  messages.appendChild(msg)
  messages.scrollTop = messages.scrollHeight
}




async function sendMessage() {
  const input = document.getElementById("chatInput")
  const messages = document.getElementById("chatbotMessages")
  const welcome = document.querySelector(".chatbot-welcome")
  const actions = document.querySelector(".chatbot-quick-actions")
  const questions = document.querySelector(".chatbot-quick-questions")

  if (!input || !messages) return

  const message = input.value.trim()
  if (!message) return

  // Show chat messages area
  if (messages.style.display === "none") {
    messages.style.display = "block"
    if (welcome) welcome.style.display = "none"
    if (actions) actions.style.display = "none"
    if (questions) questions.style.display = "none"
  }

  // Add user message
  addChatMessage(message, "user")
  input.value = ""

  // Fetch backend response
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    })

    const data = await res.json()
    addChatMessage(data.reply || "Sorry, I couldn't find an answer.", "bot")
  } catch (err) {
    console.error(err)
    addChatMessage("Something went wrong. Please try again later.", "bot")
  }
}


// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all floating cards
document.querySelectorAll(".floating-card, .resource-card, .review-card, .opportunity-card").forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = "all 0.6s ease"
  observer.observe(card)
})

// Dashboard link functionality
document.querySelector(".dashboard-btn").addEventListener("click", (e) => {
  e.preventDefault()
  showPage("dashboard")
})

// Page navigation system
function showPage(pageId) {
  // Hide all pages
  const allPages = document.querySelectorAll(".page-content")
  allPages.forEach((page) => page.classList.remove("active"))

  // Show selected page
  const selectedPage = document.getElementById(`page-${pageId}`)
  if (selectedPage) {
    selectedPage.classList.add("active")
  }

  // Update active nav link
  const navLinks = document.querySelectorAll(".nav-link, .dashboard-btn")
  navLinks.forEach((link) => link.classList.remove("active"))

  const activeLink = document.querySelector(`[data-page="${pageId}"]`)
  if (activeLink) {
    activeLink.classList.add("active")
  }

  // Close mobile menu if open
  document.getElementById("navLinks").classList.remove("active")
  const icon = document.getElementById("mobileMenuBtn").querySelector("i")
  icon.classList.remove("fa-times")
  icon.classList.add("fa-bars")

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function openRecruiterForm(jobTitle, company) {
  const modal = document.getElementById("recruiterModal")
  document.getElementById("modalJobTitle").textContent = jobTitle
  document.getElementById("modalCompany").textContent = company
  modal.classList.add("show")
  document.body.style.overflow = "hidden"
}

function closeRecruiterModal() {
  const modal = document.getElementById("recruiterModal")
  modal.classList.remove("show")
  // Only restore overflow if no other tab is active
  if (!document.querySelector(".tab-overlay.active")) {
    document.body.style.overflow = ""
  }
}

// Initialize
function initAnimations() {
  console.log("Animations initialized")
}

function initAuthSystem() {
  console.log("Auth moved to external page (auth.html)")
}

function initEmployerPortal() {
  console.log("Employer Portal initialized")
}

function initResources() {
  console.log("Resources initialized")
}

function initSearchModal() {
  const searchModal = document.getElementById("searchModal")
  const searchForm = document.getElementById("advancedSearchForm")

  if (!searchModal || !searchForm) return

  window.openSearchModal = () => {
    searchModal.classList.add("show")
    document.body.style.overflow = "hidden"
  }

  window.closeSearchModal = () => {
    searchModal.classList.remove("show")
    document.body.style.overflow = ""
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(" Executing job search with filters...")
    window.closeSearchModal()

    // Smooth transition to opportunities tab
    setTimeout(() => {
      if (typeof window.openTab === "function") {
        window.openTab("opportunities")
      }
    }, 300)
  })

  // Close on outside click
  searchModal.addEventListener("click", (e) => {
    if (e.target === searchModal) window.closeSearchModal()
  })
}

async function searchJobs() {
  const res = await fetch("/api/jobs?q=developer&location=nairobi")
  const data = await res.json()
  console.log(data.results)
}

searchJobs()

async function sendMessage() {
  const input = document.getElementById("chatInput")
  const message = input.value

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })

  const data = await res.json()
  console.log("Bot:", data.reply)
}

async function getBotReply(message) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    })

    const data = await res.json()
    return data.reply || "Sorry, I couldn't find an answer."
  } catch (err) {
    console.error(err)
    return "Something went wrong while fetching results."
  }
}




