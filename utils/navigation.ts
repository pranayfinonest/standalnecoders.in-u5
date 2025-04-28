/**
 * Opens a URL in the same tab by default, or in a new tab if specified
 * @param url The URL to open
 * @param newTab Whether to open in a new tab
 */
export const openUrl = (url: string, newTab = false): void => {
  if (newTab) {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer")
    if (newWindow) newWindow.opener = null
  } else {
    window.location.href = url
  }
}

/**
 * Creates a function that opens a URL when called
 * @param url The URL to open
 * @param newTab Whether to open in a new tab
 * @returns A function that opens the URL when called
 */
export const createUrlHandler =
  (url: string, newTab = false) =>
  () =>
    openUrl(url, newTab)

/**
 * Submits a form
 * @param formId The ID of the form to submit
 * @param newTab Whether to submit in a new tab
 */
export const submitForm = (formId: string, newTab = false): void => {
  const form = document.getElementById(formId) as HTMLFormElement
  if (form) {
    if (newTab) {
      form.target = "_blank"
    } else {
      form.target = "_self"
    }
    form.submit()
  }
}
