// Date formatting utilities
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch (error) {
    return "Invalid Date"
  }
}

export function formatDateShort(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch (error) {
    return "Invalid Date"
  }
}

export function formatTime(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch (error) {
    return "Invalid Time"
  }
}

// Urgency and status color utilities
export function getUrgencyColor(urgency: string): string {
  switch (urgency.toLowerCase()) {
    case "critical":
      return "bg-red-100 text-red-800"
    case "high":
      return "bg-orange-100 text-orange-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-green-100 text-green-800"
    case "resolved":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "in-progress":
      return "bg-blue-100 text-blue-800"
    case "unread":
      return "bg-red-100 text-red-800"
    case "read":
      return "bg-blue-100 text-blue-800"
    case "responded":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function getStatusIcon(status: string): string {
  switch (status.toLowerCase()) {
    case "critical":
      return "🚨"
    case "high":
      return "⚠️"
    case "medium":
      return "📋"
    case "low":
      return "📝"
    case "resolved":
      return "✅"
    case "pending":
      return "⏳"
    case "in-progress":
      return "🔄"
    case "unread":
      return "📧"
    case "read":
      return "👁️"
    case "responded":
      return "✉️"
    default:
      return "📄"
  }
}

// Text utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  // Kenyan phone number validation
  const phoneRegex = /^(\+254|0)[17]\d{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

export function formatPhoneNumber(phone: string): string {
  // Format Kenyan phone numbers
  const cleaned = phone.replace(/\D/g, "")

  if (cleaned.startsWith("254")) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`
  } else if (cleaned.startsWith("0")) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
  }

  return phone
}

// Array utilities
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const group = String(item[key])
      groups[group] = groups[group] || []
      groups[group].push(item)
      return groups
    },
    {} as Record<string, T[]>,
  )
}

export function sortBy<T>(array: T[], key: keyof T, direction: "asc" | "desc" = "asc"): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]

    if (aVal < bVal) return direction === "asc" ? -1 : 1
    if (aVal > bVal) return direction === "asc" ? 1 : -1
    return 0
  })
}

// URL utilities
export function buildQueryString(params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value))
    }
  })

  return searchParams.toString()
}

export function parseQueryString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString)
  const result: Record<string, string> = {}

  params.forEach((value, key) => {
    result[key] = value
  })

  return result
}

// Storage utilities
export function setLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn("Failed to save to localStorage:", error)
  }
}

export function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn("Failed to read from localStorage:", error)
    return defaultValue
  }
}

export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.warn("Failed to remove from localStorage:", error)
  }
}

// Performance utilities
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Device detection utilities
export function isMobile(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth < 768
}

export function isTablet(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

export function isDesktop(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth >= 1024
}

export function getTouchDevice(): boolean {
  if (typeof window === "undefined") return false
  return "ontouchstart" in window || navigator.maxTouchPoints > 0
}

// Error handling utilities
export function handleError(error: any, context?: string): void {
  console.error(`Error${context ? ` in ${context}` : ""}:`, error)

  // In production, you might want to send errors to a logging service
  if (process.env.NODE_ENV === "production") {
    // Send to error tracking service
    // Example: Sentry.captureException(error)
  }
}

export function createErrorMessage(error: any): string {
  if (error?.message) return error.message
  if (typeof error === "string") return error
  return "An unexpected error occurred"
}

// Analytics utilities
export function trackEvent(eventName: string, properties?: Record<string, any>): void {
  // In production, integrate with analytics service
  if (process.env.NODE_ENV === "development") {
    console.log("Analytics Event:", eventName, properties)
  }

  // Example: analytics.track(eventName, properties)
}

export function trackPageView(pageName: string, properties?: Record<string, any>): void {
  // In production, integrate with analytics service
  if (process.env.NODE_ENV === "development") {
    console.log("Page View:", pageName, properties)
  }

  // Example: analytics.page(pageName, properties)
}

// Accessibility utilities
export function announceToScreenReader(message: string): void {
  const announcement = document.createElement("div")
  announcement.setAttribute("aria-live", "polite")
  announcement.setAttribute("aria-atomic", "true")
  announcement.className = "sr-only"
  announcement.textContent = message

  document.body.appendChild(announcement)

  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  ) as NodeListOf<HTMLElement>

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  function handleTabKey(e: KeyboardEvent) {
    if (e.key !== "Tab") return

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }

  element.addEventListener("keydown", handleTabKey)
  firstElement?.focus()

  return () => {
    element.removeEventListener("keydown", handleTabKey)
  }
}
