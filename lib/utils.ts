/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Merge classnames (alternative to clsx)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter((cls) => typeof cls === 'string')
    .join(' ')
    .trim()
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return function (...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0

  return function (...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastCall >= delay) {
      func(...args)
      lastCall = now
    }
  }
}

/**
 * Sleep/delay promise
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Get scroll position
 */
export function getScrollProgress(): number {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return docHeight > 0 ? scrollTop / docHeight : 0
}

/**
 * Check if element in viewport
 */
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  )
}
