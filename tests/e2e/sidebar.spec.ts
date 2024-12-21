/* eslint-disable playwright/no-wait-for-timeout */
import { expect, type Locator, type Page, test } from "@playwright/test"

let page: Page

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext()
  page = await context.newPage()
  await page.goto("http://localhost:3000")
})

/**
|--------------------------------------------------
| PresetSwitcher
|--------------------------------------------------
*/

test.describe("PresetSwitcher", () => {
  let presetSwitcherButton: Locator
  let presetList: Locator
  let presetName: Locator

  test.beforeEach(async () => {
    presetSwitcherButton = page.getByTestId("preset-switcher-button")
    presetList = page.getByTestId("preset-switcher-list")
    presetName = page.getByTestId("preset-name")

    await presetSwitcherButton.click()

    await expect(presetList).toBeVisible()
  })

  test("should add, rename and delete a preset", async () => {
    const createPresetButton = page.getByRole("button", { name: "Create preset" })
    await createPresetButton.click()
    const addToast = page.locator("text=Preset added")

    await expect(addToast).toBeVisible()
    await expect(presetList).toContainText("New Preset")

    await presetName.click()
    await presetName.fill("Renamed Preset")

    await expect(presetList).toContainText("Renamed Preset")

    await createPresetButton.click()

    await expect(presetList).toContainText("New Preset")

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

    await presetSwitcherButton.click()
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

  test.beforeEach(async () => {
    accordionTrigger = page.locator('[data-testid="container-bg-trigger"]')
    accordionContent = page.locator('[data-testid="container-bg-content"]')

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

  test("should update background on color selection", async () => {
    const color = accordionContent.locator(".default-color-panel > div:nth-child(5)")
    await color.click()

    await page.waitForTimeout(1000)
    const selectedColor = await color.evaluate((el) => getComputedStyle(el).background)
    const backgroundPreview = page.locator('[data-testid="container-bg-color"]')
    const bgColor = await backgroundPreview.evaluate((el) => getComputedStyle(el).background)

    expect(selectedColor).toBe(bgColor)
  })

  test.afterEach(async () => {
    await accordionTrigger.click()

    await expect(accordionContent).toBeHidden()
  })
})

test.describe("ContainerPadding Component", () => {
  let paddingTrigger: Locator
  let popoverContent: Locator
  let paddingXInput: Locator
  let paddingYInput: Locator
  let containerWrapper: Locator

  test.beforeEach(async () => {
    paddingTrigger = page.locator('[data-testid="container-padding-trigger"]')
    popoverContent = page.locator('[data-testid="container-padding-popover"]')
    paddingXInput = page.getByPlaceholder("PaddingX Value")
    paddingYInput = page.getByPlaceholder("PaddingY Value")
    containerWrapper = page.locator('[data-testid="container-wrapper"]')

    await expect(paddingTrigger).toBeVisible()

    const isPopoverVisible = await popoverContent.isVisible()

    if (!isPopoverVisible) {
      await paddingTrigger.click()
    }

    await expect(popoverContent).toBeVisible()
  })

  test("should update padding when a new value is entered", async () => {
    await paddingXInput.fill("20")
    await paddingYInput.fill("20")

    const triggerText = await paddingTrigger.textContent()

    expect(triggerText).toContain("Custom x Custom")
    await expect(containerWrapper).toHaveCSS("padding", "20px")
  })

  test("should select a preset value for padding", async () => {
    const presetX = popoverContent.getByTestId("paddingX-16")
    const presetY = popoverContent.getByTestId("paddingY-16")
    await presetX.click()
    await presetY.click()
    const triggerText = await paddingTrigger.textContent()

    expect(triggerText).toContain("16 x 16")
    await expect(containerWrapper).toHaveCSS("padding", "16px")
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

    const isPopoverVisible = await popoverContent.isVisible()

    if (!isPopoverVisible) {
      await radiusTrigger.click()
    }

    await expect(popoverContent).toBeVisible()
  })

  test("should update radius value when a custom value is entered", async () => {
    await valueInput.fill("10")

    await expect(radiusTrigger).toHaveText("Custom")
    await expect(containerWrapper).toHaveCSS("border-radius", "10px")
  })

  test("should update radius value when a preset is selected", async () => {
    const mediumOption = popoverContent.getByRole("option", { name: "8" })

    await mediumOption.click()
    const triggerText = radiusTrigger

    await expect(triggerText).toHaveText("8")
    await expect(containerWrapper).toHaveCSS("border-radius", "8px")
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

    expect(Number.parseFloat(initialOpacity!)).toBe(100)
  })

  test("should update opacity value when slider is moved", async () => {
    await sliderHandle.click()
    await sliderHandle.press("Shift+ArrowLeft")

    const updatedOpacity = await sliderHandle.getAttribute("aria-valuenow")

    expect(Number.parseFloat(updatedOpacity!)).toBe(90)
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

    const isHeaderVisible = await headerTypeContent.isVisible()

    if (!isHeaderVisible) {
      await headerTypeTrigger.click()
    }

    await expect(headerTypeContent).toBeVisible()
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

  test("should select a header type and apply active styles", async () => {
    const firstHeaderType = headerTypeContent.locator("button").nth(1)
    await firstHeaderType.click()

    await expect(firstHeaderType).toHaveClass(/ring-2/)

    const macControl = editorWrapper.locator('[data-testid="mac-control"]')

    await expect(macControl).toBeVisible()

    await headerTypeTrigger.click()
  })
})

test.describe("EditorShadow Component", () => {
  let shadowTrigger: Locator
  let shadowContent: Locator
  let inputField: Locator
  let editorWrapper: Locator

  test.beforeEach(async () => {
    shadowTrigger = page.locator('[data-testid="editor-shadow-trigger"]')
    shadowContent = page.locator('[data-testid="editor-shadow-content"]')
    inputField = page.locator('input[placeholder="Shadow Value"]')
    editorWrapper = page.locator('[data-testid="editor-wrapper"]')

    await expect(shadowTrigger).toBeVisible()

    const isPopoverVisible = await shadowContent.isVisible()

    if (!isPopoverVisible) {
      await shadowTrigger.click()
    }

    await expect(shadowContent).toBeVisible()
  })

  test("should update shadow value when typing in the input field", async () => {
    await inputField.fill("10px 10px 5px rgba(0,0,0,0.3)")
    await inputField.blur()

    await expect(inputField).toHaveValue("10px 10px 5px rgba(0,0,0,0.3)")
    await expect(shadowTrigger).toHaveText("Custom")
    await expect(editorWrapper).toHaveCSS("box-shadow", "rgba(0, 0, 0, 0.3) 10px 10px 5px 0px")
  })

  test("should show error message when invalid shadow value is entered", async () => {
    await inputField.fill("invalid-shadow")
    await inputField.blur()
    const errorToast = page.getByText("Invalid shadow format.")

    await expect(errorToast).toBeVisible()
  })

  test("should select a shadow preset and apply active styles", async () => {
    const firstShadowItem = shadowContent.getByRole("option", { name: "None" })
    await firstShadowItem.click()

    await expect(shadowTrigger).toHaveText("None")
    await expect(editorWrapper).toHaveCSS("box-shadow", "none")
  })
})

test.describe("EditorBorder Component", () => {
  let borderTrigger: Locator
  let borderContent: Locator
  let inputField: Locator
  let editorWrapper: Locator

  test.beforeEach(async () => {
    borderTrigger = page.locator('[data-testid="editor-border-trigger"]')
    borderContent = page.locator('[data-testid="editor-border-content"]')
    inputField = page.locator('input[placeholder="Border Value"]')
    editorWrapper = page.locator('[data-testid="editor-wrapper"]')

    await expect(borderTrigger).toBeVisible()

    const isPopoverVisible = await borderContent.isVisible()

    if (!isPopoverVisible) {
      await borderTrigger.click()
    }

    await expect(borderContent).toBeVisible()
  })

  test("should update border value when typing in the input field", async () => {
    await inputField.fill("1px solid #000")
    await inputField.blur()

    await expect(inputField).toHaveValue("1px solid #000")
    await expect(borderTrigger).toHaveText("Custom")
    await expect(editorWrapper).toHaveCSS("border", "1px solid rgb(0, 0, 0)")
  })

  test("should show error message when invalid border value is entered", async () => {
    await inputField.fill("invalid-border")
    await inputField.blur()
    const errorToast = page.getByText("Invalid border.")

    await expect(errorToast).toBeVisible()
  })

  test("should select a border preset and apply active styles", async () => {
    const firstBorderItem = borderContent.getByRole("option", { name: "Medium Solid" })
    await firstBorderItem.click()

    await expect(borderTrigger).toHaveText("Medium Solid")
    await expect(editorWrapper).toHaveCSS("border", "2px solid rgb(0, 0, 0)")
  })
})

test.describe("EditorRadius Component", () => {
  let radiusTrigger: Locator
  let radiusContent: Locator
  let inputField: Locator
  let editorWrapper: Locator

  test.beforeEach(async () => {
    radiusTrigger = page.locator('[data-testid="editor-radius-trigger"]')
    radiusContent = page.locator('[data-testid="editor-radius-content"]')
    inputField = page.locator('input[placeholder="Radius Value"]')
    editorWrapper = page.locator('[data-testid="editor-wrapper"]')

    await expect(radiusTrigger).toBeVisible()

    const isPopoverVisible = await radiusContent.isVisible()

    if (!isPopoverVisible) {
      await radiusTrigger.click()
    }

    await expect(radiusContent).toBeVisible()
  })

  test("should update border value when typing in the input field", async () => {
    await inputField.fill("5")
    await inputField.blur()

    await expect(inputField).toHaveValue("5")
    await expect(radiusTrigger).toHaveText("Custom")
    await expect(editorWrapper).toHaveCSS("border-radius", "5px")
  })

  test("should show error message when invalid border value is entered", async () => {
    await inputField.fill("37")
    await inputField.blur()
    const errorToast = page.getByText("Radius must be")

    await expect(errorToast).toBeVisible()
  })

  test("should select a border preset and apply active styles", async () => {
    const firstBorderItem = radiusContent.getByRole("option", { name: "2", exact: true })
    await firstBorderItem.click()

    await expect(radiusTrigger).toHaveText("2")
    await expect(editorWrapper).toHaveCSS("border-radius", "2px")
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
  let editor: Locator

  test.beforeEach(async () => {
    languageTrigger = page.locator('[data-testid="code-language-trigger"]')
    languageContent = page.locator('[data-testid="code-language-content"]')
    editor = page.locator('[data-testid="editor"]')

    await expect(languageTrigger).toBeVisible()

    const isPopoverVisible = await languageContent.isVisible()

    if (!isPopoverVisible) {
      await languageTrigger.click()
    }

    await expect(languageContent).toBeVisible()
  })

  test("should select a language and apply active styles", async () => {
    const tsLang = languageContent.getByRole("option", { name: "TypeScript" })
    await tsLang.click()

    await expect(languageTrigger).toHaveText("TypeScript")

    const codeEditor = editor.locator(".cm-editor .cm-scroller div[data-language]")

    await expect(codeEditor).toBeVisible()
    await expect(codeEditor).toHaveAttribute("data-language", "typescript")
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

test.describe("CodeDecoration Component", () => {
  let trigger: Locator
  let content: Locator
  let editor: Locator
  let lines: Locator
  let lineNumbers: Locator

  test.beforeEach(async () => {
    trigger = page.locator('[data-testid="code-decoration-trigger"]')
    content = page.locator('[data-testid="code-decoration-content"]')
    editor = page.locator('[data-testid="editor"]')
    lines = editor.locator(".cm-line")
    lineNumbers = editor.locator(".cm-gutterElement")

    await expect(trigger).toBeVisible()

    const isPopoverVisible = await content.isVisible()

    if (!isPopoverVisible) {
      await trigger.click()
    }
  })

  test("should select highlighted decoration and apply active styles", async () => {
    const highlighted = content.getByRole("radio", { name: "Highlighted" })
    await highlighted.click()

    await expect(highlighted).toHaveAttribute("aria-checked", "true")

    const line = lines.nth(6)
    const lineNumber = lineNumbers.nth(6).locator("div")

    await expect(line).not.toHaveClass("decor-highlighted")
    await expect(lineNumber).not.toHaveClass("decor-highlighted")

    await line.click()

    await expect(line).toHaveClass(/.*decor-highlighted.*/)
    await expect(lineNumber).toHaveClass(/.*decor-highlighted.*/)
  })

  test("should select added decoration and apply active styles", async () => {
    const added = content.getByRole("radio", { name: "Added" })
    await added.click()

    await expect(added).toHaveAttribute("aria-checked", "true")

    const line = lines.nth(4)
    const lineNumber = lineNumbers.nth(4).locator("div")

    await expect(line).not.toHaveClass("decor-added")
    await expect(lineNumber).not.toHaveClass("decor-added")

    await line.click()

    await expect(line).toHaveClass(/.*decor-added.*/)
    await expect(lineNumber).toHaveClass(/.*decor-added.*/)
  })

  test("should select removed decoration and apply active styles", async () => {
    const removed = content.getByRole("radio", { name: "Removed" })
    await removed.click()

    await expect(removed).toHaveAttribute("aria-checked", "true")

    const line = lines.nth(5)
    const lineNumber = lineNumbers.nth(5).locator("div")

    await expect(line).not.toHaveClass("decor-removed")
    await expect(lineNumber).not.toHaveClass("decor-removed")

    await line.click()

    await expect(line).toHaveClass(/.*decor-removed.*/)
    await expect(lineNumber).toHaveClass(/.*decor-removed.*/)
  })

  test("should select focused decoration and apply active styles", async () => {
    const focused = content.getByRole("radio", { name: "Focused" })
    await focused.click()

    await expect(focused).toHaveAttribute("aria-checked", "true")

    const line = lines.nth(3)
    const lineNumber = lineNumbers.nth(3).locator("div")

    await expect(line).not.toHaveClass("decor-focused")
    await expect(lineNumber).not.toHaveClass("decor-focused")

    await line.click()

    await expect(line).toHaveClass(/.*decor-focused.*/)
    await expect(lineNumber).toHaveClass(/.*decor-focused.*/)
  })

  test("should remove all decorations", async () => {
    const clear = content.getByRole("radio", { name: "Clear" })
    await clear.click()

    const line = lines.nth(5)
    const lineNumber = lineNumbers.nth(5).locator("div")

    await expect(line).not.toHaveClass("decor-highlighted")
    await expect(line).not.toHaveClass("decor-added")
    await expect(line).not.toHaveClass("decor-removed")
    await expect(line).not.toHaveClass("decor-focused")
    await expect(lineNumber).not.toHaveClass("decor-highlighted")
    await expect(lineNumber).not.toHaveClass("decor-added")
    await expect(lineNumber).not.toHaveClass("decor-removed")
    await expect(lineNumber).not.toHaveClass("decor-focused")
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
    await expect(codeEditor).toHaveCSS("font-family", /Fira Code/)

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

  test.beforeEach(async () => {
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

/**
|--------------------------------------------------
| Other Controls
|--------------------------------------------------
*/

test.describe("Watermark Component", () => {
  let watermarkSwitch: Locator
  let watermarkLocationTrigger: Locator
  let watermarkLocationContent: Locator
  let watermarkOpacitySlider: Locator
  let watermarkOpacityInput: Locator
  let watermarkEditor: Locator
  let watermarkContainer: Locator

  test.beforeEach(async () => {
    watermarkSwitch = page.locator('[data-testid="watermark-switch"]')
    watermarkLocationTrigger = page.locator('[data-testid="watermark-place-select"]')
    watermarkLocationContent = page.locator('[data-testid="watermark-place-select-content"]')
    watermarkOpacitySlider = page.locator('[data-testid="watermark-opacity-slider"]').getByRole("slider")
    watermarkOpacityInput = page.locator('[data-testid="watermark-input"]')
    watermarkEditor = page.locator('[data-testid="editor-watermark"]')
    watermarkContainer = page.locator('[data-testid="container-watermark"]')

    await expect(watermarkSwitch).toBeVisible()
  })

  test("should update watermark when a new value is selected", async () => {
    await expect(watermarkLocationTrigger).toBeVisible()
    await expect(watermarkLocationTrigger).toContainText("Container")

    watermarkLocationTrigger.click()

    await expect(watermarkLocationContent).toBeVisible()

    const watermarkOption = watermarkLocationContent.locator('text="Editor"')

    await watermarkOption.click()

    await expect(watermarkEditor).toBeVisible()
    await expect(watermarkLocationTrigger).toContainText("Editor")
    await expect(watermarkContainer).toBeHidden()

    watermarkLocationTrigger.click()

    const watermarkOptionContainer = watermarkLocationContent.locator('text="Container"')

    await watermarkOptionContainer.click()
  })

  test("should update watermark opacity when slider is moved", async () => {
    await expect(watermarkContainer).toHaveCSS("opacity", "1")
    await expect(watermarkOpacitySlider).toBeVisible()
    await expect(watermarkOpacitySlider).toHaveAttribute("aria-valuenow", "100")

    await watermarkOpacitySlider.click()
    await watermarkOpacitySlider.press("Shift+ArrowLeft")

    await expect(watermarkOpacitySlider).toHaveAttribute("aria-valuenow", "90")
    await expect(watermarkContainer).toHaveCSS("opacity", "0.9")
  })

  test("should update watermark opacity when input is changed", async () => {
    await expect(watermarkOpacityInput).toBeVisible()
    await expect(watermarkOpacityInput).toHaveValue("Pixel Syntax")

    await watermarkOpacityInput.fill("Test")

    await expect(watermarkOpacityInput).toHaveValue("Test")
    await expect(watermarkContainer).toContainText("Test")
  })
})
