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
    console.log("[v0] Initializing Independent Components...")
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
  
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      const icon = mobileMenuBtn.querySelector("i")
      if (icon) {
        icon.classList.toggle("fa-bars", !navLinks.classList.contains("active"))
        icon.classList.toggle("fa-times", navLinks.classList.contains("active"))
      }
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
  
    // Exposed to window for inline quick action buttons
    window.handleQuickAction = (action) => {
      if (!chatbotMessages) return
  
      const actions = {
        hiring: "I'm looking to hire talent for my company.",
        seeking: "I'm looking for job opportunities internationally.",
        visa: "I need help with visa requirements and applications.",
        demo: "I'd like to book a demo to learn more about your services.",
      }
  
      const message = actions[action]
      if (message) {
        chatbotMessages.style.display = "block"
        document.querySelector(".chatbot-welcome").style.display = "none"
        document.querySelector(".chatbot-quick-actions").style.display = "none"
        document.querySelector(".chatbot-quick-questions").style.display = "none"
  
        addChatMessage(message, "user")
        // ... existing response logic ...
      }
    }
  
    console.log("Chatbot initialized")
  }
  
  window.toggleChatbot = () => {
    const chatbotWindow = document.getElementById("chatbotWindow")
    const chatInput = document.getElementById("chatInput")
    if (chatbotWindow) {
      chatbotWindow.classList.toggle("show")
      if (chatbotWindow.classList.contains("show") && chatInput) {
        chatInput.focus()
      }
    }
  }
  
  function handleQuickQuestion(button) {
    const question = button.textContent
  
    // Show chat messages area
    document.getElementById("chatbotMessages").style.display = "block"
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
    document.getElementById("chatbotMessages").insertAdjacentHTML("beforeend", messageHTML)
    document.getElementById("chatbotMessages").scrollTop = document.getElementById("chatbotMessages").scrollHeight
  }
  
  function sendMessage() {
    const message = document.getElementById("chatInput").value.trim()
    if (!message) return
  
    // Show chat messages area if hidden
    if (document.getElementById("chatbotMessages").style.display === "none") {
      document.getElementById("chatbotMessages").style.display = "block"
      document.querySelector(".chatbot-welcome").style.display = "none"
      document.querySelector(".chatbot-quick-actions").style.display = "none"
      document.querySelector(".chatbot-quick-questions").style.display = "none"
    }
  
    // Add user message
    addChatMessage(message, "user")
    document.getElementById("chatInput").value = ""
  
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
    console.log("[v0] Auth moved to external page (auth.html)")
  }
  
  function initEmployerPortal() {
    console.log("Employer Portal initialized")
  }
  
  function initResources() {
    console.log("Resources initialized")
  }
  
  

  // Check for "authentication"
  document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        alert('Please sign in to access your dashboard.');
        window.location.href = 'auth.html';
    }
});

// Mobile menu toggle functionality
document.getElementById('mobileToggle').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
});



/**
 * GlobalCareer Connect - Dashboard Controller
 * Handles application tracking, visa progress, and user stats
 */

document.addEventListener("DOMContentLoaded", () => {
    const mobileToggle = document.getElementById("mobileToggle")
    const sidebar = document.querySelector(".sidebar")
  
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active")
        const icon = mobileToggle.querySelector("i")
        if (sidebar.classList.contains("active")) {
          icon.classList.replace("fa-bars", "fa-times")
        } else {
          icon.classList.replace("fa-times", "fa-bars")
        }
      })
    }
  
    const sidebarLinks = document.querySelectorAll(".sidebar-link")
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 992) {
          sidebar.classList.remove("active")
          const icon = mobileToggle.querySelector("i")
          icon.classList.replace("fa-times", "fa-bars")
        }
      })
    })
  
    console.log("[v0] Initializing Dashboard System...")
  
    // Security Check: Ensure user is logged in
    checkAuth()
  
    // Initialize all dashboard components
    initUserStats()
    initApplicationTracker()
    initVisaProgress()
    initDashboardNavigation()
  })
  
  /**
   * Verifies authentication state
   */
  function checkAuth() {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      console.log("[v0] Unauthorized access - redirecting to login")
      window.location.href = "auth.html"
    }
  }
  
  /**
   * Populates user stats and welcome message
   */
  function initUserStats() {
    const welcomeTitle = document.querySelector(".welcome-text h1")
    const userData = JSON.parse(localStorage.getItem("userData") || '{"name": "John Doe"}')
  
    if (welcomeTitle) {
      welcomeTitle.textContent = `Welcome back, ${userData.name.split(" ")[0]}!`
    }
  }
  
  /**
   * Handles application tracker interactions
   */
  function initApplicationTracker() {
    const applicationItems = document.querySelectorAll(".application-item")
  
    applicationItems.forEach((item) => {
      item.addEventListener("click", () => {
        const company = item.querySelector("h4")?.textContent
        console.log(`[v0] Viewing details for: ${company}`)
        // In a real app, this would open a detailed view or modal
      })
    })
  }
  
  /**
   * Initializes visa progress tracking
   */
  function initVisaProgress() {
    const visaSection = document.querySelector(".glass-card h3")
    if (visaSection && visaSection.textContent.includes("Visa Progress")) {
      console.log("[v0] Visa tracking initialized")
    }
  }
  
  /**
   * Handles dashboard sidebar navigation
   */
  function initDashboardNavigation() {
    const navLinks = document.querySelectorAll(".sidebar-link")
  
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Prevent default for demo purposes if it's just a hash
        if (link.getAttribute("href") === "#") {
          e.preventDefault()
          navLinks.forEach((l) => l.classList.remove("active"))
          link.classList.add("active")
          console.log(`[v0] Navigating to: ${link.querySelector("span")?.textContent}`)
        }
      })
    })
  
    // Logout functionality
    const logoutBtn = document.querySelector(".fas.fa-sign-out-alt")?.parentElement
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.removeItem("isLoggedIn")
        window.location.href = "index.html"
      })
    }
  }
  
  /**
   * Helper to add new application (Demo functionality)
   */
  window.addNewApplication = () => {
    alert("This would open a form to manually add or sync a new job application.")
  }
  