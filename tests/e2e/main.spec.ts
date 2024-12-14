/* eslint-disable playwright/no-conditional-in-test */
import { expect, type Locator, type Page, test } from "@playwright/test"

let page: Page

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext()
  page = await context.newPage()
  await page.goto("http://localhost:3000")
})

/**
|--------------------------------------------------
| Dark Mode
|--------------------------------------------------
*/

test.describe("Dark Mode", () => {
  let html: Locator
  let darkModeButton: Locator
  let toggleMenu: Locator

  test.beforeEach(async () => {
    html = page.locator("html")
    darkModeButton = page.getByRole("button", { name: "Toggle theme" })
    toggleMenu = page.getByTestId("mode-toggle-menu")
  })

  test("should toggle dark mode to on", async () => {
    await expect(html).toHaveClass(/light/)

    await page.getByRole("button", { name: "Toggle theme" }).click()
    await page.getByRole("menuitem", { name: "Dark" }).click()

    await expect(html).toHaveClass(/dark/)

    const theme = await page.evaluate(() => localStorage.getItem("theme"))

    expect(theme).toBe("dark")
  })

  test("should toggle dark mode back to off", async () => {
    await expect(html).toHaveClass(/dark/)

    await darkModeButton.click()
    await page.getByRole("menuitem", { name: "Light" }).click()

    await expect(html).toHaveClass(/light/)

    const theme = await page.evaluate(() => localStorage.getItem("theme"))

    expect(theme).toBe("light")
  })

  test("should toggle dark mode to system", async () => {
    await expect(html).toHaveClass(/light/)

    await darkModeButton.click()
    await page.getByRole("menuitem", { name: "System" }).click()

    await expect(html).toHaveClass(/light/)

    const theme = await page.evaluate(() => localStorage.getItem("theme"))

    expect(theme).toBe("system")
  })

  test.afterEach("should toggle dark mode to system", async () => {
    await expect(toggleMenu).toBeHidden()
  })
})

/**
|--------------------------------------------------
| Editor
|--------------------------------------------------
*/

test.describe("Editor", () => {
  let editor: Locator
  let tabNameInput: Locator
  let tabs: Locator
  let deleteTabButton: Locator
  let editorTabIcon: Locator
  let addTabButton: Locator

  test.beforeEach(async () => {
    editor = page.getByTestId("editor")
    tabNameInput = page.locator('[data-testid="editor-tab-name"]')
    tabs = page.locator('[data-testid="editor-tab"]')
    deleteTabButton = page.locator('[data-testid="editor-tab-delete"]')
    editorTabIcon = tabs.locator('[data-testid="editor-tab-icon"]')
    addTabButton = page.locator("[data-testid='add-new-tab-button']")

    await editor.waitFor({ state: "visible" })
  })

  test("should be able to type in the editor", async () => {
    await editor.click()

    await page.keyboard.press("Control+A")
    await page.keyboard.press("Delete")
    await page.keyboard.type("const a = 5;", { delay: 100 })

    const editorContent = editor.locator(".cm-content")

    await expect(editorContent).toContainText("const")
  })

  test("should rename the tab", async () => {
    await tabNameInput.click()
    await tabNameInput.fill("New Tab Name")
    await tabNameInput.blur()

    await expect(tabNameInput).toHaveValue("New Tab Name")
  })

  test("should change the tab icon", async () => {
    await editorTabIcon.click()
    const iconList = page.getByTestId("editor-tab-icon-dropdown")
    await iconList.getByRole("menuitem", { name: ".jsx", exact: true }).click()
    const selectedIcon = await page.getByTestId("editor-tab-icon").getByRole("img").getAttribute("alt")

    expect(selectedIcon).toContain(".jsx")
  })

  test("should add a new tab and switch to it", async () => {
    await expect(tabs).toHaveAttribute("data-active", "true")

    await addTabButton.click()

    await expect(tabs.nth(0)).toHaveAttribute("data-active", "false")
    await expect(tabs.nth(1)).toHaveAttribute("data-active", "true")
  })

  test("should delete a tab", async () => {
    const tabElements = await tabs.elementHandles()
    if (tabElements.length === 1) {
      await addTabButton.click()
    }

    expect(tabElements.length).toBe(2)

    await deleteTabButton.click()

    const tabElementsAfterDelete = await tabs.elementHandles()

    expect(tabElementsAfterDelete.length).toBe(1)
  })
})

/**
|--------------------------------------------------
| Toolbox
|--------------------------------------------------
*/

test.describe("Toolbox", () => {
  let formatterButton: Locator
  let toast: Locator
  let exportPopoverButton: Locator
  let exportPopover: Locator
  let exportNameInput: Locator
  let extensionToggleGroup: Locator
  let qualitySlider: Locator
  let scaleToggleGroup: Locator
  let exportButton: Locator

  test.beforeEach(async () => {
    formatterButton = page.getByRole("button", { name: "Format" })
    toast = page.getByText("Code formatted successfully")

    exportPopoverButton = page.getByTestId("export-image-popover-button")
    exportPopover = page.getByTestId("export-image-popover")
    exportNameInput = exportPopover.getByRole("textbox")
    extensionToggleGroup = exportPopover.getByTestId("export-image-extension")
    qualitySlider = exportPopover.getByTestId("quality-slider")
    scaleToggleGroup = exportPopover.getByTestId("export-image-scale")
    exportButton = page.locator("button", { hasText: "Export" })
  })

  test("should show toast after successful formatting", async () => {
    await formatterButton.click()

    await expect(toast).toBeVisible()
  })

  test("should allow configuring export options and exporting an image", async () => {
    await exportPopoverButton.click()

    await expect(exportPopover).toBeVisible()

    await exportNameInput.fill("My Image")

    await expect(exportNameInput).toHaveValue("My Image")

    const jpgOption = extensionToggleGroup.getByRole("radio", { name: "Jpg" })
    await jpgOption.click()

    await expect(jpgOption).toHaveAttribute("aria-checked", "true")

    await expect(qualitySlider).toBeVisible()

    const qualityLabel = exportPopover.getByText("quality 100%")

    await expect(qualityLabel).toContainText("100")

    const sliderButton = qualitySlider.getByRole("slider")

    await sliderButton.click()
    await sliderButton.press("Shift+ArrowLeft")

    const updatedOpacity = await sliderButton.getAttribute("aria-valuenow")

    expect(Number.parseFloat(updatedOpacity!)).toBe(0.9)

    const scaleOption2X = scaleToggleGroup.getByText("2x")

    await expect(scaleOption2X).toHaveAttribute("aria-checked", "true")

    const scaleOptionOrig = scaleToggleGroup.getByText("Original")

    await scaleOptionOrig.click()

    await expect(scaleOptionOrig).toHaveAttribute("aria-checked", "true")

    await exportButton.click()

    const toast = page.getByText("Image exported successfully")

    await expect(toast).toBeVisible()
  })
})
