/**
 * Scrolls the window to the top of the page
 * @param smooth Whether to use smooth scrolling
 */
export const scrollToTop = (smooth = false) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? "smooth" : "auto",
  })
}

/**
 * Scrolls the window to a specific element
 * @param elementId The ID of the element to scroll to
 * @param offset Optional offset from the top of the element
 * @param smooth Whether to use smooth scrolling
 */
export const scrollToElement = (elementId: string, offset = 0, smooth = true) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: smooth ? "smooth" : "auto",
    })
  }
}
