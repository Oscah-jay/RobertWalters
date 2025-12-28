// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar")
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
  
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const navLinks = document.getElementById("navLinks")
  
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    const icon = mobileMenuBtn.querySelector("i")
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars")
      icon.classList.add("fa-times")
    } else {
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })
  
  // Smooth scrolling
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    section.scrollIntoView({ behavior: "smooth" })
    navLinks.classList.remove("active")
  }
  
  // Eligibility Form Submission
  const eligibilityForm = document.getElementById("eligibilityForm")
  const eligibilityResult = document.getElementById("eligibilityResult")
  
  eligibilityForm.addEventListener("submit", (e) => {
    e.preventDefault()
  
    const profession = document.getElementById("profession").value
    const experience = document.getElementById("experience").value
  
    // Simulate AI processing
    eligibilityResult.innerHTML =
      '<p style="text-align: center; color: var(--text-secondary);"><i class="fas fa-spinner fa-spin"></i> Analyzing your profile with AI...</p>'
    eligibilityResult.classList.add("show")
  
    setTimeout(() => {
      const countries = [
        { name: "United States", match: "95%", visa: "H-1B" },
        { name: "Canada", match: "92%", visa: "Express Entry" },
        { name: "Australia", match: "90%", visa: "Skilled Independent" },
        { name: "Germany", match: "88%", visa: "EU Blue Card" },
      ]
  
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
  
      resultHTML += `
              </div>
              <button onclick="resetEligibilityChecker()" class="btn btn-secondary btn-full" style="margin-top: 1.5rem;">
                  <i class="fas fa-redo"></i> Check Another Path
              </button>
          `
      eligibilityResult.innerHTML = resultHTML
    }, 2000)
  })
  
  function resetEligibilityChecker() {
    const eligibilityResult = document.getElementById("eligibilityResult")
    const eligibilityForm = document.getElementById("eligibilityForm")
  
    // Hide results
    eligibilityResult.classList.remove("show")
    eligibilityResult.innerHTML = ""
  
    // Reset form
    eligibilityForm.reset()
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
    const originalText = submitButton.innerHTML
  
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...'
    submitButton.disabled = true
  
    setTimeout(() => {
      submitButton.innerHTML = '<i class="fas fa-check"></i> Submitted Successfully!'
      setTimeout(() => {
        employerForm.reset()
        fileLabel.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> Upload Resume (PDF, DOC)'
        fileLabel.style.color = ""
        submitButton.innerHTML = originalText
        submitButton.disabled = false
        alert("Your application has been submitted successfully! The recruiter will contact you soon.")
        closeRecruiterModal()
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
  
    alert(`Login successful for ${email}!\n\nNote: This is a demo. In production, this would authenticate the user.`)
    closeLoginModal()
  
    // Show dashboard content
    document.querySelector(".dashboard-notice").style.display = "none"
    document.getElementById("dashboardContent").style.display = "block"
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
  const chatbotBubble = document.getElementById("chatbotBubble")
  const chatbotWindow = document.getElementById("chatbotWindow")
  const chatbotMessages = document.getElementById("chatbotMessages")
  const chatInput = document.getElementById("chatInput")
  
  function toggleChatbot() {
    chatbotWindow.classList.toggle("show")
    if (chatbotWindow.classList.contains("show")) {
      chatInput.focus()
    }
  }
  
  function handleQuickAction(action) {
    const actions = {
      hiring: "I'm looking to hire talent for my company.",
      seeking: "I'm looking for job opportunities internationally.",
      visa: "I need help with visa requirements and applications.",
      demo: "I'd like to book a demo to learn more about your services.",
    }
  
    const message = actions[action]
    if (message) {
      // Show chat messages area
      chatbotMessages.style.display = "block"
      document.querySelector(".chatbot-welcome").style.display = "none"
      document.querySelector(".chatbot-quick-actions").style.display = "none"
      document.querySelector(".chatbot-quick-questions").style.display = "none"
  
      // Add user message
      addChatMessage(message, "user")
  
      // Add bot response based on action
      setTimeout(() => {
        let response = ""
        switch (action) {
          case "hiring":
            response =
              "Great! I can help you find the perfect talent. Let me guide you through our employer matching service. What positions are you looking to fill?"
            break
          case "seeking":
            response =
              "Excellent! I'll help you find international opportunities that match your skills. First, let me check your eligibility. What's your current profession?"
            break
          case "visa":
            response =
              "I'd be happy to help with visa information! Our AI-powered system can check your eligibility for various countries. Which country are you interested in?"
            break
          case "demo":
            response =
              "Perfect! I can connect you with our team for a personalized demo. What's the best email to reach you at?"
            break
        }
        addChatMessage(response, "bot")
      }, 800)
    }
  }
  
  function askQuickQuestion(button) {
    const question = button.textContent
  
    // Show chat messages area
    chatbotMessages.style.display = "block"
    document.querySelector(".chatbot-welcome").style.display = "none"
    document.querySelector(".chatbot-quick-actions").style.display = "none"
    document.querySelector(".chatbot-quick-questions").style.display = "none"
  
    // Add user message
    addChatMessage(question, "user")
  
    // Add bot response
    setTimeout(() => {
      const responses = {
        "How quickly can you help me hire skilled professionals?":
          "We can typically match you with qualified candidates within 48-72 hours! Our AI analyzes your requirements and connects you with pre-vetted professionals who match your criteria. Would you like to start the process?",
        "What visa options are available for tech workers?":
          "Tech workers have several great options including H-1B (USA), Express Entry (Canada), Skilled Independent visa (Australia), and EU Blue Card (Germany). Each has different requirements. Would you like me to check which ones you're eligible for?",
        "How does the matching process work?":
          "Our AI-powered system analyzes your skills, experience, and preferences, then matches you with opportunities across 50+ countries. We consider visa eligibility, salary expectations, and career goals to find your perfect match. Want to get started?",
      }
  
      const response = responses[question] || "That's a great question! Let me help you with that..."
      addChatMessage(response, "bot")
    }, 1000)
  }
  
  function addChatMessage(message, type) {
    const avatar = type === "bot" ? "🤖" : "👤"
    const messageClass = type === "bot" ? "bot-message" : "user-message"
  
    const messageHTML = `
          <div class="${messageClass}">
              <div class="message-avatar">${avatar}</div>
              <div class="message-bubble">${message}</div>
          </div>
      `
    chatbotMessages.insertAdjacentHTML("beforeend", messageHTML)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  }
  
  function sendMessage() {
    const message = chatInput.value.trim()
    if (!message) return
  
    // Show chat messages area if hidden
    if (chatbotMessages.style.display === "none") {
      chatbotMessages.style.display = "block"
      document.querySelector(".chatbot-welcome").style.display = "none"
      document.querySelector(".chatbot-quick-actions").style.display = "none"
      document.querySelector(".chatbot-quick-questions").style.display = "none"
    }
  
    // Add user message
    addChatMessage(message, "user")
    chatInput.value = ""
  
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you check your visa eligibility. Would you like to start the assessment?",
        "Based on your profession, I recommend exploring opportunities in the United States, Canada, and Australia. Would you like detailed information?",
        "I can guide you through the application process step by step. What would you like to know?",
        "Let me connect you with our resources. What specific area do you need help with?",
        "I'll analyze your profile and provide personalized recommendations. Please give me a moment.",
      ]
  
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      addChatMessage(randomResponse, "bot")
    }, 1000)
  }
  
  function handleChatKeypress(e) {
    if (e.key === "Enter") {
      sendMessage()
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
  
  function openTab(tabName) {
    const tab = document.getElementById(`tab-${tabName}`)
    if (tab) {
      tab.classList.add("active")
      document.body.style.overflow = "hidden"
  
      // Close mobile menu if open
      const navLinks = document.getElementById("navLinks")
      const mobileMenuBtn = document.getElementById("mobileMenuBtn")
      navLinks.classList.remove("active")
      const icon = mobileMenuBtn.querySelector("i")
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
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
  