// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar")
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    }
  })
  
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const navLinks = document.getElementById("navLinks")
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      if (!navLinks) return
      navLinks.classList.toggle("active")
      const icon = mobileMenuBtn.querySelector("i")
      if (!icon) return
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }
  
  // Smooth scrolling
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    if (!section) return
    section.scrollIntoView({ behavior: "smooth" })
    if (navLinks) navLinks.classList.remove("active")
  }
  
  // Eligibility Form Submission
  const eligibilityForm = document.getElementById("eligibilityForm")
  const eligibilityResult = document.getElementById("eligibilityResult")
  
  if (eligibilityForm) {
    eligibilityForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const profession = document.getElementById("profession")?.value
      const experience = document.getElementById("experience")?.value
  
      if (eligibilityResult) {
        eligibilityResult.innerHTML =
          '<p style="text-align: center; color: var(--text-secondary);"><i class="fas fa-spinner fa-spin"></i> Analyzing your profile with AI...</p>'
        eligibilityResult.classList.add("show")
      }
  
      setTimeout(() => {
        const countries = [
          { name: "United States", match: "95%", visa: "H-1B" },
          { name: "Canada", match: "92%", visa: "Express Entry" },
          { name: "Australia", match: "90%", visa: "Skilled Independent" },
          { name: "Germany", match: "88%", visa: "EU Blue Card" },
        ]
  
        if (!eligibilityResult) return
        let resultHTML = `
                <h4 style="margin-bottom: 1rem; color: var(--secondary);"><i class="fas fa-check-circle"></i> Your Best Matches</h4>
                <div style="display: grid; gap: 1rem;">
            `
        countries.forEach((country) => {
          resultHTML += `
                    <div style="background: rgba(15, 23, 42, 0.5); padding: 1rem; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong style="color: var(--text-primary);">${country.name}</strong>
                            <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0.3rem 0;">Visa: ${country.visa}</p>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--secondary); font-weight: 700; font-size: 1.2rem;">${country.match}</div>
                            <div style="color: var(--text-secondary); font-size: 0.85rem;">Match</div>
                        </div>
                    </div>
                `
        })
        resultHTML += "</div>"
        eligibilityResult.innerHTML = resultHTML
      }, 2000)
    })
  }
  
  // Map hotspot interactions
  const hotspots = document.querySelectorAll(".hotspot")
  hotspots.forEach((hotspot) => {
    hotspot.addEventListener("click", function () {
      showLocationDetails(this)
    })
  })
  
  function showLocationDetails(element) {
    if (!element) return
    const country = element.getAttribute("data-country")
    const jobs = element.getAttribute("data-jobs")
    const visa = element.getAttribute("data-top-visa")
  
    const locationName = document.getElementById("locationName")
    const locationJobs = document.getElementById("locationJobs")
    const locationVisa = document.getElementById("locationVisa")
    const locationMatch = document.getElementById("locationMatch")
    const locationDetails = document.getElementById("locationDetails")
  
    if (locationName) locationName.textContent = country
    if (locationJobs) locationJobs.textContent = jobs
    if (locationVisa) locationVisa.textContent = visa
    if (locationMatch) locationMatch.textContent = Math.floor(Math.random() * 15 + 80) + "%"
    if (locationDetails) locationDetails.classList.add("show")
  }
  
  function closeLocationDetails() {
    const locationDetails = document.getElementById("locationDetails")
    if (locationDetails) locationDetails.classList.remove("show")
  }
  
  function applyToLocation() {
    const locationName = document.getElementById("locationName")?.textContent
    if (!locationName) return
    alert(
      `Great choice! Let's start your application process for ${locationName}.\n\nYou'll be redirected to the Employers section.`
    )
    closeLocationDetails()
    closeTab("opportunities")
    setTimeout(() => openTab("employers"), 300)
  }
  
  // Employer Form Submission
  const employerForm = document.getElementById("employerForm")
  const resumeInput = document.getElementById("resume")
  const fileLabel = document.getElementById("fileLabel")
  
  if (resumeInput) {
    resumeInput.addEventListener("change", function () {
      if (this.files && this.files[0] && fileLabel) {
        fileLabel.innerHTML = `<i class="fas fa-check-circle"></i> ${this.files[0].name}`
        fileLabel.style.color = "var(--secondary)"
      }
    })
  }
  
  if (employerForm) {
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
          if (fileLabel) {
            fileLabel.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Upload Resume (PDF, DOC)'
            fileLabel.style.color = ""
          }
          submitButton.innerHTML = originalText
          submitButton.disabled = false
          alert("Your application has been submitted successfully! Our AI will match you with suitable employers.")
        }, 2000)
      }, 2000)
    })
  }
  
  // Download Resources
  function downloadResource(resourceType) {
    const resources = {
      "visa-guide": "Visa_Guide_2024.pdf",
      "resume-templates": "Resume_Templates.zip",
      "interview-guide": "Interview_Guide.pdf",
      checklist: "Relocation_Checklist.pdf",
    }
  
    alert(
      `Downloading ${resources[resourceType]}...\n\nNote: This is a demo. In production, this would trigger an actual file download.`
    )
  }
  
  // Login Modal
  const loginBtn = document.getElementById("loginBtn")
  const loginModal = document.getElementById("loginModal")
  if (loginBtn) loginBtn.addEventListener("click", openLoginModal)
  function openLoginModal() { if (loginModal) loginModal.classList.add("show") }
  function closeLoginModal() { if (loginModal) loginModal.classList.remove("show") }
  if (loginModal) {
    loginModal.addEventListener("click", (e) => {
      if (e.target === loginModal) closeLoginModal()
    })
  }
  
  // Switch auth tabs
  function switchAuthTab(tab) {
    const tabs = document.querySelectorAll(".auth-tab")
    const loginForm = document.getElementById("loginForm")
    const signupForm = document.getElementById("signupForm")
    tabs.forEach((t) => t.classList.remove("active"))
    if (tab === "login") {
      tabs[0]?.classList.add("active")
      if (loginForm) loginForm.style.display = "block"
      if (signupForm) signupForm.style.display = "none"
    } else {
      tabs[1]?.classList.add("active")
      if (loginForm) loginForm.style.display = "none"
      if (signupForm) signupForm.style.display = "block"
    }
  }
  
  // Handle login
  function handleLogin(e) {
    e.preventDefault()
    const email = document.getElementById("loginEmail")?.value
    if (!email) return
    alert(`Login successful for ${email}!\n\nNote: This is a demo. In production, this would authenticate the user.`)
    closeLoginModal()
    if (document.querySelector(".dashboard-notice")) document.querySelector(".dashboard-notice").style.display = "none"
    if ($("dashboardContent")) $("dashboardContent").style.display = "block"
  }
  
  // Handle signup
  function handleSignup(e) {
    e.preventDefault()
    const name = document.getElementById("signupName")?.value
    const email = document.getElementById("signupEmail")?.value
    if (!name || !email) return
    alert(`Account created successfully for ${name} (${email})!\n\nNote: This is a demo. In production, this would create an account.`)
    closeLoginModal()
  }
  
  // ==============================
  // Chatbot Elements
  // ==============================
  const chatbotBubble = document.getElementById("chatbotBubble")
  const chatbotWindow = document.getElementById("chatbotWindow")
  const chatbotMessages = document.getElementById("chatbotMessages")
  const chatInput = document.getElementById("chatInput")
  const closeBtn = document.querySelector(".chatbot-close-btn")
  const sendBtn = document.querySelector(".send-btn")
  
  if (chatbotBubble) chatbotBubble.addEventListener("click", toggleChatbot)
  if (closeBtn) closeBtn.addEventListener("click", toggleChatbot)
  if (sendBtn) sendBtn.addEventListener("click", sendMessage)
  if (chatInput) chatInput.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage() })
  
  // Quick actions
  document.querySelectorAll(".quick-action-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      handleQuickAction(btn.dataset.action)
    })
  })
  
  // Quick questions
  document.querySelectorAll(".quick-question").forEach(btn => {
    btn.addEventListener("click", () => {
      askQuickQuestion(btn)
    })
  })
  
  // ==============================
  // Chatbot core functions
  // ==============================
  function toggleChatbot() {
    if (!chatbotWindow) return
    chatbotWindow.classList.toggle("show")
    if (chatInput) chatInput.focus()
  }
  
  function showChatArea() {
    if (chatbotMessages) chatbotMessages.style.display = "block"
    const welcome = document.querySelector(".chatbot-welcome")
    const quickActions = document.querySelector(".chatbot-quick-actions")
    const quickQuestions = document.querySelector(".chatbot-quick-questions")
    if (welcome) welcome.style.display = "none"
    if (quickActions) quickActions.style.display = "none"
    if (quickQuestions) quickQuestions.style.display = "none"
  }
  
  function addChatMessage(message, type) {
    if (!chatbotMessages) return
    const avatar = type === "bot" ? "🤖" : "👤"
    const messageClass = type === "bot" ? "bot-message" : "user-message"
    chatbotMessages.insertAdjacentHTML("beforeend", `
      <div class="${messageClass}">
        <div class="message-avatar">${avatar}</div>
        <div class="message-bubble">${message}</div>
      </div>
    `)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  }
  
  function sendMessage() {
    if (!chatInput) return
    const message = chatInput.value.trim()
    if (!message) return
    showChatArea()
    addChatMessage(message, "user")
    chatInput.value = ""
  
    setTimeout(() => {
      const responses = [
        "I can help you assess visa eligibility.",
        "Based on your skills, international roles may be a great fit.",
        "Would you like guidance on the application process?",
        "Let me analyze your profile for better recommendations.",
      ]
      addChatMessage(responses[Math.floor(Math.random() * responses.length)], "bot")
    }, 1000)
  }
  
  function handleQuickAction(action) {
    const actions = {
      hiring: "I'm looking to hire talent for my company.",
      seeking: "I'm looking for job opportunities internationally.",
      visa: "I need help with visa requirements and applications.",
      demo: "I'd like to book a demo to learn more about your services.",
    }
    const message = actions[action]
    if (!message) return
    showChatArea()
    addChatMessage(message, "user")
    setTimeout(() => {
      let response = ""
      switch (action) {
        case "hiring":
          response = "Great! I can help you find the perfect talent. What positions are you looking to fill?"
          break
        case "seeking":
          response = "Awesome! I’ll help you find international opportunities. What’s your current profession?"
          break
        case "visa":
          response = "Happy to help with visas! Which country are you interested in?"
          break
        case "demo":
          response = "Nice! What’s the best email to reach you for the demo?"
          break
      }
      addChatMessage(response, "bot")
    }, 800)
  }
  
  function askQuickQuestion(button) {
    const question = button?.textContent.trim()
    if (!question) return
    showChatArea()
    addChatMessage(question, "user")
    setTimeout(() => {
      const responses = {
        "How quickly can you help me hire skilled professionals?":
          "We typically match employers with candidates within 48–72 hours.",
        "What visa options are available for tech workers?":
          "Popular options include H-1B (USA), Express Entry (Canada), and EU Blue Card.",
        "How does the matching process work?":
          "Our AI analyzes your skills, experience, and preferences to find the best matches.",
      }
      addChatMessage(responses[question] || "That’s a great question! Let me help you with that.", "bot")
    }, 1000)
  }
  
  // ==============================
  // Intersection Observer Animations
  // ==============================
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)
  
  qsa(".floating-card, .resource-card, .review-card, .opportunity-card").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "all 0.6s ease"
    observer.observe(card)
  })
  
  // ==============================
  // Dashboard link functionality
  // ==============================
  document.querySelector(".dashboard-btn")?.addEventListener("click", (e) => {
    e.preventDefault()
    showPage("dashboard")
  })
  
  // Page navigation system
  function showPage(pageId) {
    const allPages = document.querySelectorAll(".page-content")
    allPages.forEach((page) => page.classList.remove("active"))
    const selectedPage = document.getElementById(`page-${pageId}`)
    if (selectedPage) selectedPage.classList.add("active")
  
    const navLinksAll = document.querySelectorAll(".nav-link, .dashboard-btn")
    navLinksAll.forEach((link) => link.classList.remove("active"))
  
    const activeLink = document.querySelector(`[data-page="${pageId}"]`)
    if (activeLink) activeLink.classList.add("active")
  
    document.getElementById("navLinks")?.classList.remove("active")
    const icon = document.getElementById("mobileMenuBtn")?.querySelector("i")
    if (icon) {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  
  function openTab(tabName) {
    const tab = document.getElementById(`tab-${tabName}`)
    if (tab) {
      tab.classList.add("active")
      document.body.style.overflow = "hidden"
      document.getElementById("navLinks")?.classList.remove("active")
      const icon = document.getElementById("mobileMenuBtn")?.querySelector("i")
      if (icon) {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    }
  }
  
  function closeTab(tabName) {
    const tab = document.getElementById(`tab-${tabName}`)
    if (tab) {
      tab.classList.remove("active")
      document.body.style.overflow = ""
    }
  }
  
  // Close tab on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeTabs = document.querySelectorAll(".tab-overlay.active")
      activeTabs.forEach((tab) => {
        tab.classList.remove("active")
        document.body.style.overflow = ""
      })
    }
  })
  
  // Close tab on overlay click
  document.querySelectorAll(".tab-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  })
  
  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    console.log("GlobalCareer Connect initialized")
    showPage("home")
    const hero = document.querySelector(".hero")
    if (hero) setTimeout(() => { hero.style.opacity = "1" }, 100)
  })
  