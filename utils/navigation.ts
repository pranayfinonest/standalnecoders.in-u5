/**
 * Opens a URL in a new browser tab
 * @param url The URL to open
 */
export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer")
  if (newWindow) newWindow.opener = null
}

/**
 * Creates a function that opens a URL in a new tab when called
 * @param url The URL to open
 * @returns A function that opens the URL in a new tab when called
 */
export const createNewTabHandler = (url: string) => () => openInNewTab(url)

/**
 * Submits a form in a new tab
 * @param formId The ID of the form to submit
 */
export const submitFormInNewTab = (formId: string): void => {
  const form = document.getElementById(formId) as HTMLFormElement
  if (form) {
    form.target = "_blank"
    form.submit()
  }
}
