import { expect, type Locator, type Page, test } from "@playwright/test"

let html: Locator
let page: Page

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext()
  page = await context.newPage()
  await page.goto("http://localhost:3000")
  html = page.locator("html")
  await page.getByRole("button", { name: "Editor" }).click()
  await page.getByRole("button", { name: "Code" }).click()
  await page.getByRole("button", { name: "Font" }).click()
})

/**
|--------------------------------------------------
| Dark Mode
|--------------------------------------------------
*/

test.describe("Dark Mode", () => {
  let darkModeButton: Locator

  test("should toggle dark mode to on", async () => {
    darkModeButton = page.getByRole("button", { name: "Toggle theme" })

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
})

/**
|--------------------------------------------------
| Editor
|--------------------------------------------------
*/

test.describe("Editor", () => {
  let editor: Locator
  let tab: Locator
  let tabNameInput: Locator

  test("should be able to type in the editor", async () => {
    editor = page.getByTestId("editor")
    await editor.click()
    await page.keyboard.press("Control+A")
    await page.keyboard.press("Delete")
    await page.keyboard.type("const a = 5;")

    await expect(editor.getByRole("textbox")).toHaveText("const a = 5;")
  })

  test("should rename the tab", async () => {
    tab = page.getByTestId("editor-tab")
    tabNameInput = tab.getByTestId("editor-tab-name")

    await tabNameInput.click()
    await tabNameInput.fill("New Tab Name")
    await tabNameInput.blur()

    await expect(tabNameInput).toHaveValue("New Tab Name")
  })

  test("should change the tab icon", async () => {
    await page.getByTestId("editor-tab-icon").click()
    const iconList = page.getByTestId("editor-tab-icon-dropdown")
    await iconList.getByRole("menuitem", { name: ".jsx", exact: true }).click()
    const selectedIcon = await page.getByTestId("editor-tab-icon").getByRole("img").getAttribute("alt")

    expect(selectedIcon).toContain(".jsx")
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

    //TODO: add test for quality slider

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

/**
|--------------------------------------------------
| PresetSwitcher
|--------------------------------------------------
*/

test.describe("PresetSwitcher", () => {
  let presetSwitcherButton: Locator
  let presetList: Locator
  let activePresetName: Locator
  let presetName: Locator

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")

    presetSwitcherButton = page.getByTestId("preset-switcher-button")
    presetList = page.getByTestId("preset-switcher-list")
    activePresetName = page.getByTestId("active-preset-name")
    presetName = page.getByTestId("preset-name")

    await presetSwitcherButton.click()

    await expect(presetList).toBeVisible()
  })

  test('should show "No presets found" if there are no presets', async ({ page }) => {
    const noPresetsMessage = page.locator("text=No presets found")

    await expect(noPresetsMessage).toBeVisible()
  })

  test("should add, rename and delete a preset", async ({ page }) => {
    const createPresetButton = page.getByRole("button", { name: "Create preset" })

    await createPresetButton.waitFor({ state: "visible" })

    await createPresetButton.click()
    const addToast = page.locator("text=Preset added")

    await expect(addToast).toBeVisible()
    await expect(presetList).toContainText("New Preset")

    await presetName.click()
    await presetName.fill("Renamed Preset")

    await expect(activePresetName).toHaveText("Renamed Preset")
    await expect(presetList).toContainText("Renamed Preset")

    await createPresetButton.click()

    await expect(presetList).toContainText("New Preset")
    await expect(activePresetName).toHaveText("New Preset")

    const presetCard = page.getByTestId("preset-card").first()

    await expect(presetCard).toBeVisible()

    await presetCard.getByRole("button").click()
    const presetControlMenu = page.getByTestId("preset-control-menu")

    await expect(presetControlMenu).toBeVisible()

    const deleteButton = presetControlMenu.getByRole("button", { name: "Delete" })
    await deleteButton.click()
    const deleteToast = page.locator("text=Preset deleted")

    await expect(deleteToast).toBeVisible()
    await expect(presetList).not.toContainText("Renamed Preset")
  })
})

/**
|--------------------------------------------------
| Container Controls 
|--------------------------------------------------
*/

test.describe("ContainerBg Component", () => {
  let accordionTrigger: Locator
  let accordionContent: Locator

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")

    accordionTrigger = page.locator('[data-testid="container-bg"]')
    accordionContent = page.locator('[data-testid="accordion-content"]')

    await expect(accordionTrigger).toBeVisible()

    await accordionTrigger.click()

    await expect(accordionContent).toBeVisible()
  })

  test("should switch between solid and gradient colors", async () => {
    const solidBUtton = accordionContent.locator("text=Solid")

    await expect(solidBUtton).toBeVisible()

    await solidBUtton.click()

    await expect(solidBUtton).toHaveClass("popup_tabs-header-label popup_tabs-header-label-active")

    const gradientButton = accordionContent.locator("text=Gradient")

    await expect(gradientButton).toBeVisible()

    await gradientButton.click()

    await expect(gradientButton).toHaveClass("popup_tabs-header-label popup_tabs-header-label-active")
  })

  test("should update background on color selection", async ({ page }) => {
    const color = accordionContent.locator(".default-color-panel > div:nth-child(2)")
    await color.click()
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(1000)
    const selectedColor = await color.evaluate((el) => getComputedStyle(el).background)
    const backgroundPreview = page.locator('[data-testid="container-bg-color"]')
    const bgColor = await backgroundPreview.evaluate((el) => getComputedStyle(el).background)

    expect(selectedColor).toBe(bgColor)
  })
})

test.describe("ContainerPadding Component", () => {
  let paddingTrigger: Locator
  let popoverContent: Locator
  let paddingXInput: Locator
  let paddingYInput: Locator
  let containerWrapper: Locator

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")

    paddingTrigger = page.locator('[data-testid="container-padding-trigger"]')
    popoverContent = page.locator('[data-testid="container-padding-popover"]')
    paddingXInput = page.getByPlaceholder("PaddingX Value")
    paddingYInput = page.getByPlaceholder("PaddingY Value")
    containerWrapper = page.locator('[data-testid="container-wrapper"]')

    await expect(paddingTrigger).toBeVisible()

    await paddingTrigger.click()
  })

  test("should display popover with padding options on trigger click", async () => {
    await expect(popoverContent).toBeVisible()
  })

  test("should update padding X when a new value is entered", async () => {
    await paddingXInput.fill("20")

    const triggerText = await paddingTrigger.textContent()

    expect(triggerText).toContain("Custom")
    await expect(containerWrapper).toHaveCSS("padding", "64px 20px")
  })

  test("should update padding Y when a new value is entered", async () => {
    await paddingYInput.fill("15")

    const triggerText = await paddingTrigger.textContent()

    expect(triggerText).toContain("Custom")

    const cssValue = (await containerWrapper.evaluate((el) => getComputedStyle(el).padding)).split(" ")[0]

    expect(cssValue).toBe("15px")
  })

  test("should select a preset value for padding X", async () => {
    const presetX = popoverContent.getByRole("option", { name: "16" }).first()
    await presetX.click()
    const triggerText = await paddingTrigger.textContent()

    expect(triggerText).toContain("16")
    await expect(containerWrapper).toHaveCSS("padding", "64px 16px")
  })

  test("should select a preset value for padding Y", async () => {
    const presetY = popoverContent.getByRole("option", { name: "128" }).first()
    await presetY.click()
    const triggerText = await paddingTrigger.textContent()

    const cssValue = (await containerWrapper.evaluate((el) => getComputedStyle(el).padding)).split(" ")[1]

    expect(triggerText).toContain("128")
    expect(cssValue).toBe("128px")
  })
})

test.describe("ContainerRadius Component", () => {
  let radiusTrigger: Locator
  let popoverContent: Locator
  let valueInput: Locator
  let containerWrapper: Locator

  test.beforeEach(async () => {
    radiusTrigger = page.locator('[data-testid="container-radius-trigger"]')
    popoverContent = page.locator('[data-testid="container-radius-content"]')
    valueInput = page.getByPlaceholder("Radius Value")
    containerWrapper = page.locator('[data-testid="container-wrapper"]')

    await expect(radiusTrigger).toBeVisible()

    await radiusTrigger.click()
  })

  test("should update radius value when a preset is selected", async () => {
    const mediumOption = popoverContent.getByRole("option", { name: "8" })
    await mediumOption.click()
    const triggerText = radiusTrigger

    await expect(triggerText).toHaveText("8")

    await expect(containerWrapper).toHaveCSS("border-radius", "8px")
  })

  test("should update radius value when a custom value is entered", async () => {
    await valueInput.fill("10")
    const triggerText = radiusTrigger

    await expect(triggerText).toHaveText("Custom")

    await expect(containerWrapper).toHaveCSS("border-radius", "10px")
  })
})

test.describe("ContainerOpacity Component", () => {
  let slider: Locator
  let sliderHandle: Locator
  let containerWrapper: Locator

  test.beforeEach(async () => {
    slider = page.getByTestId("container-opacity-slider")
    sliderHandle = slider.getByRole("slider")
    containerWrapper = page.locator('[data-testid="container-bg-color"]')

    await expect(slider).toBeVisible()
  })

  test("should display slider with correct initial opacity", async () => {
    const initialOpacity = await sliderHandle.getAttribute("aria-valuenow")

    expect(Number.parseFloat(initialOpacity!)).toBe(1)
  })

  test("should update opacity value when slider is moved", async () => {
    await sliderHandle.click()
    await sliderHandle.press("Shift+ArrowLeft")

    const updatedOpacity = await sliderHandle.getAttribute("aria-valuenow")

    expect(Number.parseFloat(updatedOpacity!)).toBe(0.9)

    await expect(containerWrapper).toHaveCSS("opacity", "0.9")
  })
})

/**
|--------------------------------------------------
| Editor Controls
|--------------------------------------------------
*/

test.describe("EditorTransparent Component", () => {
  let switchToggle: Locator
  let editorWrapper: Locator

  test.beforeEach(async () => {
    switchToggle = page.locator('[data-testid="editor-transparent-switch"]')
    editorWrapper = page.locator('[data-testid="editor-wrapper"]')

    await expect(switchToggle).toBeVisible()
  })

  test("should toggle transparency state when clicked", async () => {
    await switchToggle.click()
    let isChecked = switchToggle

    await expect(isChecked).toBeChecked()
    await expect(editorWrapper).toHaveCSS("background-color", "rgba(0, 0, 0, 0.7)")

    await switchToggle.click()
    isChecked = switchToggle

    await expect(isChecked).not.toBeChecked()
    await expect(editorWrapper).not.toHaveCSS("background-color", "rgba(0 ,0 ,0 , 0.7)")
  })
})

test.describe("EditorHeader Component", () => {
  let headerSwitch: Locator
  let headerTypeTrigger: Locator
  let headerTypeContent: Locator
  let editorWrapper: Locator

  test.beforeEach(async () => {
    headerSwitch = page.locator('[data-testid="editor-header-switch"]')
    headerTypeTrigger = page.locator('[data-testid="editor-header-type-trigger"]')
    headerTypeContent = page.locator('[data-testid="editor-header-type-content"]')
    editorWrapper = page.locator('[data-testid="editor-wrapper"]')

    await expect(headerSwitch).toBeVisible()
  })

  test("should toggle header visibility", async () => {
    await headerSwitch.click()
    const isChecked = headerSwitch

    await expect(headerSwitch).not.toBeChecked()
    await expect(headerTypeTrigger).toBeHidden()

    await headerSwitch.click()

    await expect(isChecked).toBeChecked()
    await expect(headerTypeTrigger).toBeVisible()
  })

  test("should display header types when triggered", async () => {
    await headerTypeTrigger.click()

    await expect(headerTypeContent).toBeVisible()
  })

  test("should select a header type and apply active styles", async () => {
    await headerTypeTrigger.click()
    const firstHeaderType = headerTypeContent.locator("button").nth(1)
    await firstHeaderType.click()

    await expect(firstHeaderType).toHaveClass(/ring-2/)

    const macControl = editorWrapper.locator('[data-testid="mac-control"]')

    await expect(macControl).toBeVisible()
  })
})

test.describe("EditorShadow Component", () => {
  let shadowTrigger: Locator
  let shadowContent: Locator
  let inputField: Locator
  let editorWrapper: Locator

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")

    await page.getByRole("button", { name: "Editor" }).click()

    shadowTrigger = page.locator('[data-testid="editor-shadow-trigger"]')
    shadowContent = page.locator('[data-testid="editor-shadow-content"]')
    inputField = page.locator('input[placeholder="Shadow Value"]')
    editorWrapper = page.locator('[data-testid="editor-wrapper"]')

    await expect(shadowTrigger).toBeVisible()
  })

  test("should open shadow options when trigger is clicked", async () => {
    await shadowTrigger.click()

    await expect(shadowContent).toBeVisible()
  })

  test("should select a shadow preset and apply active styles", async () => {
    await shadowTrigger.click()
    const firstShadowItem = shadowContent.getByRole("option", { name: "None" })
    await firstShadowItem.click()

    await expect(shadowTrigger).toHaveText("None")
    await expect(editorWrapper).toHaveCSS("box-shadow", "none")
  })

  test("should update shadow value when typing in the input field", async () => {
    await shadowTrigger.click()
    await inputField.fill("10px 10px 5px rgba(0,0,0,0.3)")
    await inputField.blur()

    await expect(inputField).toHaveValue("10px 10px 5px rgba(0,0,0,0.3)")
    await expect(shadowTrigger).toHaveText("Custom")
    await expect(editorWrapper).toHaveCSS("box-shadow", "rgba(0, 0, 0, 0.3) 10px 10px 5px 0px")
  })

  test("should show error message when invalid shadow value is entered", async ({ page }) => {
    await shadowTrigger.click()
    await inputField.fill("invalid-shadow")
    await inputField.blur()
    const errorToast = page.getByText("Invalid shadow format.")

    await expect(errorToast).toBeVisible()
  })
})

test.describe("EditorBorder Component", () => {
  let borderTrigger: Locator
  let borderContent: Locator
  let inputField: Locator
  let editorWrapper: Locator

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")

    await page.getByRole("button", { name: "Editor" }).click()

    borderTrigger = page.locator('[data-testid="editor-border-trigger"]')
    borderContent = page.locator('[data-testid="editor-border-content"]')
    inputField = page.locator('input[placeholder="Border Value"]')
    editorWrapper = page.locator('[data-testid="editor-wrapper"]')

    await expect(borderTrigger).toBeVisible()
  })

  test("should open border options when trigger is clicked", async () => {
    await borderTrigger.click()

    await expect(borderContent).toBeVisible()
  })

  test("should select a border preset and apply active styles", async () => {
    await borderTrigger.click()
    const firstBorderItem = borderContent.getByRole("option", { name: "Medium Solid" })
    await firstBorderItem.click()

    await expect(borderTrigger).toHaveText("Medium Solid")
    await expect(editorWrapper).toHaveCSS("border", "2px solid rgb(0, 0, 0)")
  })

  test("should update border value when typing in the input field", async () => {
    await borderTrigger.click()
    await inputField.fill("1px solid #000")
    await inputField.blur()

    await expect(inputField).toHaveValue("1px solid #000")
    await expect(borderTrigger).toHaveText("Custom")
    await expect(editorWrapper).toHaveCSS("border", "1px solid rgb(0, 0, 0)")
  })

  test("should show error message when invalid border value is entered", async ({ page }) => {
    await borderTrigger.click()
    await inputField.fill("invalid-border")
    await inputField.blur()
    const errorToast = page.getByText("Invalid border.")

    await expect(errorToast).toBeVisible()
  })
})

test.describe("EditorRadius Component", () => {
  let radiusTrigger: Locator
  let radiusContent: Locator
  let inputField: Locator
  let editorWrapper: Locator

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")

    await page.getByRole("button", { name: "Editor" }).click()

    radiusTrigger = page.locator('[data-testid="editor-radius-trigger"]')
    radiusContent = page.locator('[data-testid="editor-radius-content"]')
    inputField = page.locator('input[placeholder="Radius Value"]')
    editorWrapper = page.locator('[data-testid="editor-wrapper"]')

    await expect(radiusTrigger).toBeVisible()
  })

  test("should open border options when trigger is clicked", async () => {
    await radiusTrigger.click()

    await expect(radiusContent).toBeVisible()
  })

  test("should select a border preset and apply active styles", async () => {
    await radiusTrigger.click()
    const firstBorderItem = radiusContent.getByRole("option", { name: "2", exact: true })
    await firstBorderItem.click()

    await expect(radiusTrigger).toHaveText("2")
    await expect(editorWrapper).toHaveCSS("border-radius", "2px")
  })

  test("should update border value when typing in the input field", async () => {
    await radiusTrigger.click()
    await inputField.fill("5")
    await inputField.blur()

    await expect(inputField).toHaveValue("5")
    await expect(radiusTrigger).toHaveText("Custom")
    await expect(editorWrapper).toHaveCSS("border-radius", "5px")
  })

  test("should show error message when invalid border value is entered", async ({ page }) => {
    await radiusTrigger.click()
    await inputField.fill("37")
    await inputField.blur()
    const errorToast = page.getByText("Radius value must not exceed 36.")

    await expect(errorToast).toBeVisible()
  })
})

/**
|--------------------------------------------------
| Code Controls
|--------------------------------------------------
*/

test.describe("CodeLanguage Component", () => {
  let languageTrigger: Locator
  let languageContent: Locator
  let commandInput: Locator
  let editor: Locator

  test.beforeEach(async () => {
    languageTrigger = page.locator('[data-testid="code-language-trigger"]')
    languageContent = page.locator('[data-testid="code-language-content"]')
    commandInput = page.locator('input[placeholder="Search language..."]')
    editor = page.locator('[data-testid="editor"]')

    await expect(languageTrigger).toBeVisible()
  })

  test("should select a language and apply active styles", async () => {
    await languageTrigger.click()
    const tsLang = languageContent.getByRole("option", { name: "TypeScript" })
    await tsLang.click()

    await expect(languageTrigger).toHaveText("TypeScript")

    const codeEditor = editor.locator(".cm-editor .cm-scroller div[data-language]")

    await expect(codeEditor).toBeVisible()
    await expect(codeEditor).toHaveAttribute("data-language", "typescript")
  })

  test("should filter language options based on search input", async () => {
    await languageTrigger.click()
    await commandInput.fill("JavaScript")
    const filteredItems = languageContent.getByRole("option", { name: "JavaScript" })

    await expect(filteredItems).toHaveCount(1)
  })
})

test.describe("CodeTheme Component", () => {
  let codeThemeButton: Locator
  let popoverContent: Locator

  test.beforeEach(async () => {
    codeThemeButton = page.locator('[data-testid="code-theme-trigger"]')
    popoverContent = page.locator('[data-testid="code-theme-content"]')
  })

  test("should select a theme and update the button text", async () => {
    await codeThemeButton.click()
    const themeItem = popoverContent.getByRole("option", { name: "GitHub Dark" })
    await themeItem.click()

    await expect(codeThemeButton).toHaveText("GitHub Dark")
  })

  //TODO: add check for editor theme
})

test.describe("CodeLineNumber Component", () => {
  let switchButton: Locator
  let editor: Locator
  let editorNumbers: Locator

  test.beforeEach(async () => {
    switchButton = page.locator('[data-testid="code-line-number-switch"]')
    editor = page.locator('[data-testid="editor"]')
    editorNumbers = editor.locator(".cm-editor .cm-scroller .cm-gutters")
  })

  test("should toggle the line number when clicked", async () => {
    const initialChecked = switchButton

    await expect(editorNumbers).toBeVisible()
    await expect(initialChecked).toBeChecked()

    await switchButton.click()

    await expect(editorNumbers).toBeHidden()
    await expect(switchButton).not.toBeChecked()
  })
})

/**
|--------------------------------------------------
| Font Controls
|--------------------------------------------------
*/

test.describe("FontFamily Component", () => {
  let triggerButton: Locator
  let popover: Locator
  let editor: Locator

  test.beforeEach(async () => {
    triggerButton = page.locator('[data-testid="font-family-trigger"]')
    popover = page.locator('[data-testid="font-family-popover"]')
    editor = page.locator('[data-testid="editor"]')
  })

  test("should select a font and update display", async () => {
    await triggerButton.click()
    const firaFont = popover.getByRole("option", { name: "Fira Code" })

    await firaFont.click()

    const codeEditor = editor.locator(".cm-editor .cm-scroller div[data-language]")

    await expect(codeEditor).toBeVisible()
    await expect(codeEditor).toHaveCSS("font-family", '"Fira Code", monospace')
    await expect(triggerButton).toHaveText("Fira Code")
  })
})

test.describe("FontSize Component", () => {
  let fontSizeInput: Locator
  let editor: Locator

  test.beforeEach(async () => {
    fontSizeInput = page.locator('[data-testid="font-size-input"]')
    editor = page.locator('[data-testid="editor"]')
  })

  test("should update font size when input is changed", async () => {
    const newFontSize = 14

    await expect(fontSizeInput).toBeVisible()
    await expect(fontSizeInput).toHaveValue("16")

    await fontSizeInput.fill(`${newFontSize}`)

    const codeEditor = editor.locator(".cm-editor .cm-scroller div[data-language]")

    await expect(fontSizeInput).toHaveValue(`${newFontSize}`)
    await expect(codeEditor).toHaveCSS("font-size", `${newFontSize}px`)
  })
})

test.describe("FontWeight Component", () => {
  let fontWeightSelect: Locator
  let fontWeightContent: Locator
  let editor: Locator

  test.beforeEach(async () => {
    fontWeightSelect = page.locator('[data-testid="font-weight-select"]')
    fontWeightContent = page.locator('[data-testid="font-weight-select-content"]')
    editor = page.locator('[data-testid="editor"]')
  })

  test("should update font weight when a new weight is selected", async () => {
    await fontWeightSelect.click()

    await expect(fontWeightContent).toBeVisible()

    const boldOption = fontWeightContent.locator('text="Bold"')
    await boldOption.click()

    const codeEditor = editor.locator(".cm-editor .cm-scroller div[data-language]")

    await expect(fontWeightSelect).toContainText("Bold")

    await expect(codeEditor).toHaveCSS("font-weight", "700")
  })
})

test.describe("Font Ligature Component", () => {
  let fontLigatureSwitch: Locator
  let editor: Locator

  test.beforeEach(async () => {
    fontLigatureSwitch = page.locator('[data-testid="font-ligatures-switch"]')
    editor = page.locator('[data-testid="editor"]')
  })

  test("should update font weight when a new weight is selected", async () => {
    await expect(fontLigatureSwitch).toBeVisible()
    await expect(fontLigatureSwitch).toBeChecked()

    const codeEditor = editor.locator(".cm-editor .cm-scroller .cm-content")

    await expect(codeEditor).toHaveCSS("font-variant-ligatures", "normal")

    await fontLigatureSwitch.click()

    await expect(codeEditor).toHaveCSS("font-variant-ligatures", "none")
    await expect(fontLigatureSwitch).not.toBeChecked()
  })
})

test.describe("FontLineHeight Component", () => {
  let lineHeightSelect: Locator
  let lineHeightContent: Locator
  let editor: Locator

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")

    await page.getByRole("button", { name: "Font" }).click()

    lineHeightSelect = page.locator('[data-testid="font-line-height-select"]')
    lineHeightContent = page.locator('[data-testid="font-line-height-select-content"]')
    editor = page.locator('[data-testid="editor"]')
  })

  test("should update line height when a new value is selected", async () => {
    await lineHeightSelect.click()

    await expect(lineHeightContent).toBeVisible()

    const lineHeightOption = lineHeightContent.locator('text="1.8"')
    await lineHeightOption.click()

    const codeEditor = editor.locator(".cm-editor .cm-scroller .cm-content")

    const fontSize = await codeEditor.evaluate((el) => Number.parseFloat(getComputedStyle(el).fontSize))
    const expectedLineHeight = `${fontSize * 1.8}px`

    await expect(codeEditor).toHaveCSS("line-height", expectedLineHeight)
  })
})
