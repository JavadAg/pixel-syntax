import { z } from "zod"

// Match valid rgb/rgba color.
// eslint-disable-next-line regexp/no-unused-capturing-group
const rgbRegex = /^rgba?\((?:\d{1,3},\s?){2,3}(0(?:\.\d+)?|1)\)$/

// Match valid hex color.
const hexRegex = /^#(?:[a-f0-9]{3}|[a-f0-9]{6})$/i

// Match valid hsl color.
const hslRegex = /^hsla?\(\d{1,3},\s?\d{1,3}%,\s?\d{1,3}%(?:,\s?(?:0(?:\.\d+)?|1))?\)$/

// Match valid pixel values (e.g., "0px", "4px").
const pixelRegex = /^-?\d+px$/

/**
|--------------------------------------------------
| Color Schema
|--------------------------------------------------
*/

const colorStopRegex = `(?:#[0-9a-f]{3,8}|rgba?\\(\\d{1,3},\\s*\\d{1,3},\\s*\\d{1,3}(?:,\\s*(?:0|1|0\\.\\d+))?\\))(?:\\s+\\d+%|\\s+\\d+px)?`
const gradientRegex = new RegExp(
  `^linear-gradient\\((?:\\d{1,3}deg|to (?:top|right|bottom|left)(?: (?:top|right|bottom|left))?)?,\\s*` +
    `${colorStopRegex}(?:,\\s*${colorStopRegex}){0,2}\\)$`,
  "i"
)

export const colorSchema = z.string().regex(gradientRegex)

/**
|--------------------------------------------------
| Shadow Schema
|--------------------------------------------------
*/

export const shadowSchema = z.string().refine((value) => {
  const parts = value.trim().split(/\s+/)

  if (parts.length < 4) return false

  const [xOffset, yOffset, blurRadius, ...rest] = parts
  if (
    (xOffset && !pixelRegex.test(xOffset)) ||
    (yOffset && !pixelRegex.test(yOffset)) ||
    (blurRadius && !pixelRegex.test(blurRadius))
  ) {
    return false
  }

  const color = rest.join(" ")
  if (!rgbRegex.test(color) && !hexRegex.test(color) && !hslRegex.test(color)) {
    return false
  }

  return true
})

/**
|--------------------------------------------------
| Border Schema
|--------------------------------------------------
*/

// Match valid border width (e.g., "1px", "0.5em", "thin").
const borderWidthRegex = /^(?:thin|medium|thick|(?:\d+|\d*\.\d+)(?:px|em|rem|%)?)$/

// Match valid border styles.
const borderStyleRegex = /^(?:none|solid|dashed|dotted|double|groove|ridge|inset|outset|hidden)$/

const namedColorRegex = /^[a-zA-Z]+$/

// eslint-disable-next-line regexp/no-unused-capturing-group
const colorRegex = new RegExp(`${hexRegex.source}|${rgbRegex.source}|${hslRegex.source}|${namedColorRegex.source}`)

export const borderSchema = z.string().refine((value) => {
  const parts = value.trim().split(/\s+/)

  if (parts.length < 2 || parts.length > 3) return false

  const [width, style, color] = parts

  if (width && !borderWidthRegex.test(width)) return false
  if (style && !borderStyleRegex.test(style)) return false
  if (color && !colorRegex.test(color)) return false

  return true
})

/**
|--------------------------------------------------
| Padding Schema
|--------------------------------------------------
*/

export const paddingSchema = z.number().min(0).max(256)

/**
|--------------------------------------------------
| Radius Schema
|--------------------------------------------------
*/

export const radiusSchema = z.number().min(0).max(36)
