/**
 * GlobalCareer Connect - Dashboard Controller
 * Handles application tracking, visa progress, and user stats
 */

document.addEventListener("DOMContentLoaded", () => {
    const mobileToggle = document.getElementById("mobileToggle")
    const sidebar = document.querySelector(".sidebar")
    const overlay = document.getElementById("sidebarOverlay")
  
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active")
        if (overlay) overlay.style.display = sidebar.classList.contains("active") ? "block" : "none"
  
        const icon = mobileToggle.querySelector("i")
        if (sidebar.classList.contains("active")) {
          icon.classList.replace("fa-times", "fa-bars")
        } else {
          icon.classList.replace("fa-bars", "fa-times")
        }
      })
    }
  
    if (overlay) {
      overlay.addEventListener("click", () => {
        sidebar.classList.remove("active")
        overlay.style.display = "none"
        const icon = mobileToggle.querySelector("i")
        icon.classList.replace("fa-bars", "fa-times")
      })
    }
  
    const sidebarLinks = document.querySelectorAll(".sidebar-link")
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 992) {
          sidebar.classList.remove("active")
          const icon = mobileToggle.querySelector("i")
          icon.classList.replace("fa-bars", "fa-times")
        }
      })
    })
  
    console.log("[v0] Initializing Dashboard System...")
  
    // checkAuth()
  
    // Initialize all dashboard components
  initUserStats()
  initApplicationTracker()
  initVisaProgress()
  initDashboardNavigation()
  initResumeUpload() // Initialized new features
  })
  
  /**
   * Verifies authentication state
   */
  function checkAuth() {
    /*
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      console.log("[v0] Unauthorized access - redirecting to login")
      window.location.href = "auth.html"
    }
    */
  }
  
  /**
   * Populates user stats and welcome message
   */
  function initUserStats() {
    const welcomeTitle = document.querySelector(".welcome-text h1")
    const userData = JSON.parse(localStorage.getItem("userData") || '{"name": "Ossy"}')
  
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

    // Mobile menu toggle functionality
    document.getElementById('mobileToggle').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
        document.getElementById('sidebarOverlay').style.display = document.querySelector('.sidebar').classList.contains('active') ? 'block' : 'none';
    });

    document.getElementById('sidebarOverlay').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.remove('active');
        document.getElementById('sidebarOverlay').style.display = 'none';
    });
  
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
 * Handles Resume Upload functionality
 */
function initResumeUpload() {
  const dropZone = document.getElementById("dropZone")
  const fileInput = document.getElementById("resumeUpload")

  if (dropZone && fileInput) {
    dropZone.addEventListener("click", () => fileInput.click())

    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault()
      dropZone.style.borderColor = "#38bdf8"
      dropZone.style.background = "rgba(56, 189, 248, 0.05)"
    })

    dropZone.addEventListener("dragleave", () => {
      dropZone.style.borderColor = "rgba(255, 255, 255, 0.1)"
      dropZone.style.background = "transparent"
    })

    dropZone.addEventListener("drop", (e) => {
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length) {
        handleFileUpload(files[0])
      }
    })

    fileInput.addEventListener("change", (e) => {
      if (e.target.files.length) {
        handleFileUpload(e.target.files[0])
      }
    })
  }
}

function handleFileUpload(file) {
  console.log(`[v0] Uploading file: ${file.name}`)
  alert(`Successfully uploaded: ${file.name}. In a real app, this would be stored in the database.`)
}

/**
 * Helper to add new application (Demo functionality)
 */
window.addNewApplication = () => {
  alert("This would open a form to manually add or sync a new job application.")
}
  