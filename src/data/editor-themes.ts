import type { CreateThemeOptions } from "@uiw/codemirror-themes"
import { tags as t } from "@lezer/highlight"

export type Theme = {
  id: string
  name: string
  options: CreateThemeOptions
}

export const themes: Theme[] = [
  {
    id: "dracula",
    name: "Dracula",
    options: {
      theme: "dark",
      settings: {
        background: "#282A36",
        foreground: "#F8F8F2",
        caret: "#FF79C6",
        selection: "#44475A",
        selectionMatch: "#44475A",
        lineHighlight: "#44475A",
        gutterBackground: "#282A36",
        gutterForeground: "#6272A4"
      },
      styles: [
        { tag: [t.comment], color: "#6272A4", fontStyle: "italic" },
        { tag: [t.meta, t.annotation], color: "#F8F8F2" },
        { tag: [t.keyword, t.operator], color: "#FF79C6" },
        { tag: [t.className, t.typeName, t.definition(t.typeName)], color: "#8BE9FD" },
        { tag: [t.function(t.variableName)], color: "#50FA7B" },
        { tag: [t.definition(t.variableName)], color: "#BD93F9" },
        { tag: [t.variableName], color: "#F8F8F2" },
        { tag: [t.propertyName, t.function(t.propertyName)], color: "#F8F8F2" },
        { tag: [t.attributeName], color: "#50FA7B" },
        { tag: [t.string, t.special(t.string), t.special(t.brace)], color: "#F1FA8C" },
        { tag: [t.number, t.bool, t.null], color: "#BD93F9" },
        { tag: [t.tagName], color: "#FF79C6" },
        { tag: [t.angleBracket, t.self], color: "#F8F8F2" },
        { tag: [t.heading], color: "#BD93F9", fontWeight: "bold" },
        { tag: [t.quote, t.list], color: "#6272A4", fontStyle: "italic" },
        { tag: [t.invalid], color: "#FF5555", textDecoration: "line-through" }
      ]
    }
  },
  {
    id: "ayu",
    name: "Ayu",
    options: {
      theme: "dark",
      settings: {
        background: "#0F1419",
        foreground: "#D9D7CE",
        caret: "#FFCC66",
        selection: "#253340",
        selectionMatch: "#253340",
        lineHighlight: "#1D252C",
        gutterBackground: "#0F1419",
        gutterForeground: "#5C6773"
      },
      styles: [
        { tag: [t.comment], color: "#5C6773", fontStyle: "italic" },
        { tag: [t.meta, t.annotation], color: "#D9D7CE" },
        { tag: [t.keyword, t.operator], color: "#F29718" },
        { tag: [t.className, t.typeName, t.definition(t.typeName)], color: "#36A3D9" },
        { tag: [t.function(t.variableName)], color: "#FFD580" },
        { tag: [t.definition(t.variableName)], color: "#FFD580" },
        { tag: [t.variableName], color: "#D9D7CE" },
        { tag: [t.propertyName, t.function(t.propertyName)], color: "#D9D7CE" },
        { tag: [t.attributeName], color: "#FFD580" },
        { tag: [t.string, t.special(t.string), t.special(t.brace)], color: "#AAD94C" },
        { tag: [t.number, t.bool, t.null], color: "#E06C75" },
        { tag: [t.tagName], color: "#F29718" },
        { tag: [t.angleBracket, t.self], color: "#D9D7CE" },
        { tag: [t.heading], color: "#E06C75", fontWeight: "bold" },
        { tag: [t.quote, t.list], color: "#5C6773", fontStyle: "italic" },
        { tag: [t.invalid], color: "#FF5555", textDecoration: "line-through" }
      ]
    }
  },
  {
    id: "github-light",
    name: "GitHub Light",
    options: {
      theme: "light",
      settings: {
        background: "#ffffff",
        foreground: "#24292e",
        caret: "#0969da",
        selection: "#cce5ff",
        selectionMatch: "#cce5ff",
        lineHighlight: "#f6f8fa",
        gutterBackground: "#ffffff",
        gutterForeground: "#6e7781"
      },
      styles: [
        { tag: [t.comment], color: "#6a737d", fontStyle: "italic" },
        { tag: [t.keyword, t.operator], color: "#d73a49" },
        { tag: [t.className, t.definition(t.typeName)], color: "#6f42c1" },
        { tag: [t.function(t.variableName)], color: "#005cc5" },
        { tag: [t.string, t.special(t.string)], color: "#032f62" },
        { tag: [t.number, t.bool, t.null], color: "#005cc5" },
        { tag: [t.variableName], color: "#e36209" },
        { tag: [t.propertyName], color: "#24292e" },
        { tag: [t.attributeName], color: "#22863a" },
        { tag: [t.tagName], color: "#22863a" },
        { tag: [t.heading], color: "#24292e", fontWeight: "bold" },
        { tag: [t.meta, t.annotation], color: "#6e7781" },
        { tag: [t.invalid], color: "#f97583", textDecoration: "line-through" },
        { tag: [t.link], color: "#0366d6", textDecoration: "underline" },
        { tag: [t.emphasis], color: "#24292e", fontStyle: "italic" },
        { tag: [t.strong], color: "#24292e", fontWeight: "bold" }
      ]
    }
  },
  {
    id: "github-dark",
    name: "GitHub Dark",
    options: {
      theme: "dark",
      settings: {
        background: "#0d1117",
        foreground: "#c9d1d9",
        caret: "#58a6ff",
        selection: "#1f6feb",
        selectionMatch: "#1f6feb",
        lineHighlight: "#161b22",
        gutterBackground: "#0d1117",
        gutterForeground: "#8b949e"
      },
      styles: [
        { tag: [t.comment], color: "#8b949e", fontStyle: "italic" },
        { tag: [t.keyword, t.operator], color: "#ff7b72" },
        { tag: [t.className, t.definition(t.typeName)], color: "#d2a8ff" },
        { tag: [t.function(t.variableName)], color: "#79c0ff" },
        { tag: [t.string, t.special(t.string)], color: "#a5d6ff" },
        { tag: [t.number, t.bool, t.null], color: "#79c0ff" },
        { tag: [t.variableName], color: "#ffa657" },
        { tag: [t.propertyName], color: "#c9d1d9" },
        { tag: [t.attributeName], color: "#56d364" },
        { tag: [t.tagName], color: "#56d364" },
        { tag: [t.heading], color: "#c9d1d9", fontWeight: "bold" },
        { tag: [t.meta, t.annotation], color: "#8b949e" },
        { tag: [t.invalid], color: "#f85149", textDecoration: "line-through" },
        { tag: [t.link], color: "#58a6ff", textDecoration: "underline" },
        { tag: [t.emphasis], color: "#c9d1d9", fontStyle: "italic" },
        { tag: [t.strong], color: "#c9d1d9", fontWeight: "bold" }
      ]
    }
  },
  {
    id: "tokyo-night",
    name: "Tokyo Night",
    options: {
      theme: "dark",
      settings: {
        background: "#1A1B26",
        foreground: "#A9B1D6",
        caret: "#7AA2F7",
        selection: "#33467C",
        selectionMatch: "#33467C",
        lineHighlight: "#24283B",
        gutterBackground: "#1A1B26",
        gutterForeground: "#3B4261"
      },
      styles: [
        { tag: [t.comment], color: "#565F89", fontStyle: "italic" },
        { tag: [t.keyword, t.operator], color: "#9D7CD8" },
        { tag: [t.className, t.definition(t.typeName)], color: "#FF9E64" },
        { tag: [t.function(t.variableName)], color: "#7AA2F7" },
        { tag: [t.string, t.special(t.string)], color: "#9ECE6A" },
        { tag: [t.number, t.bool, t.null], color: "#FF9E64" },
        { tag: [t.variableName], color: "#A9B1D6" },
        { tag: [t.propertyName], color: "#A9B1D6" },
        { tag: [t.attributeName], color: "#7AA2F7" },
        { tag: [t.tagName], color: "#BB9AF7" },
        { tag: [t.heading], color: "#A9B1D6", fontWeight: "bold" },
        { tag: [t.meta, t.annotation], color: "#565F89" },
        { tag: [t.invalid], color: "#F7768E", textDecoration: "line-through" }
      ]
    }
  },
  {
    id: "light-owl",
    name: "Light Owl",
    options: {
      theme: "light",
      settings: {
        background: "#FDF6E3",
        foreground: "#403F53",
        caret: "#6699CC",
        selection: "#D6D6D6",
        selectionMatch: "#D6D6D6",
        lineHighlight: "#EFEFEF",
        gutterBackground: "#FDF6E3",
        gutterForeground: "#9D9E9E"
      },
      styles: [
        { tag: [t.comment], color: "#ABB2BF", fontStyle: "italic" },
        { tag: [t.keyword, t.operator], color: "#F92672" },
        { tag: [t.className, t.definition(t.typeName)], color: "#F78C6C" },
        { tag: [t.function(t.variableName)], color: "#61AFEF" },
        { tag: [t.string, t.special(t.string)], color: "#A5D6A7" },
        { tag: [t.number, t.bool, t.null], color: "#FFCB8B" },
        { tag: [t.variableName], color: "#403F53" },
        { tag: [t.propertyName], color: "#403F53" },
        { tag: [t.attributeName], color: "#B07156" },
        { tag: [t.tagName], color: "#FF5370" },
        { tag: [t.heading], color: "#82AAFF", fontWeight: "bold" },
        { tag: [t.meta, t.annotation], color: "#ABB2BF" },
        { tag: [t.invalid], color: "#F92672", textDecoration: "line-through" }
      ]
    }
  },
  {
    id: "night-owl",
    name: "Night Owl",
    options: {
      theme: "dark",
      settings: {
        background: "#011627",
        foreground: "#D6DEEB",
        caret: "#80A4C2",
        selection: "#5F7E97",
        selectionMatch: "#5F7E97",
        lineHighlight: "#1D3B53",
        gutterBackground: "#011627",
        gutterForeground: "#4B6479"
      },
      styles: [
        { tag: [t.comment], color: "#637777", fontStyle: "italic" },
        { tag: [t.keyword, t.operator], color: "#C792EA" },
        { tag: [t.className, t.definition(t.typeName)], color: "#FFCB8B" },
        { tag: [t.function(t.variableName)], color: "#82AAFF" },
        { tag: [t.string, t.special(t.string)], color: "#ECC48D" },
        { tag: [t.number, t.bool, t.null], color: "#F78C6C" },
        { tag: [t.variableName], color: "#D6DEEB" },
        { tag: [t.propertyName], color: "#D6DEEB" },
        { tag: [t.attributeName], color: "#80CBC4" },
        { tag: [t.tagName], color: "#7FDBCA" },
        { tag: [t.heading], color: "#82AAFF", fontWeight: "bold" },
        { tag: [t.meta, t.annotation], color: "#637777" },
        { tag: [t.invalid], color: "#EF5350", textDecoration: "line-through" }
      ]
    }
  },
  {
    id: "one-dark-pro",
    name: "One Dark Pro",
    options: {
      theme: "dark",
      settings: {
        background: "#282C34",
        foreground: "#ABB2BF",
        caret: "#528BFF",
        selection: "#3E4451",
        selectionMatch: "#3E4451",
        lineHighlight: "#2C313A",
        gutterBackground: "#282C34",
        gutterForeground: "#4B5263"
      },
      styles: [
        { tag: [t.comment], color: "#5C6370", fontStyle: "italic" },
        { tag: [t.meta, t.annotation], color: "#ABB2BF" },
        { tag: [t.keyword, t.operator], color: "#C678DD" },
        { tag: [t.className, t.typeName, t.definition(t.typeName)], color: "#E5C07B" },
        { tag: [t.function(t.variableName)], color: "#61AFEF" },
        { tag: [t.definition(t.variableName)], color: "#d2b071" },
        { tag: [t.variableName], color: "#E06C75" },
        { tag: [t.propertyName, t.function(t.propertyName)], color: "#ABB2BF" },
        { tag: [t.attributeName], color: "#D19A66" },
        { tag: [t.string, t.special(t.string), t.special(t.brace)], color: "#98C379" },
        { tag: [t.number, t.bool, t.null], color: "#D19A66" },
        { tag: [t.tagName], color: "#E06C75" },
        { tag: [t.angleBracket, t.self], color: "#ABB2BF" },
        { tag: [t.heading], color: "#61AFEF", fontWeight: "bold" },
        { tag: [t.quote, t.list], color: "#5C6370", fontStyle: "italic" },
        { tag: [t.invalid], color: "#F44747", textDecoration: "line-through" }
      ]
    }
  },
  {
    id: "monokai-pro",
    name: "Monokai Pro",
    options: {
      theme: "dark",
      settings: {
        background: "#2D2A2E",
        foreground: "#FCFCFA",
        caret: "#AE81FF",
        selection: "#49483E",
        selectionMatch: "#49483E",
        lineHighlight: "#3E3D32",
        gutterBackground: "#2D2A2E",
        gutterForeground: "#75715E"
      },
      styles: [
        { tag: [t.comment], color: "#75715E" },
        { tag: [t.keyword, t.operator], color: "#F92672" },
        { tag: [t.className, t.definition(t.typeName)], color: "#A6E22E" },
        { tag: [t.function(t.variableName)], color: "#66D9EF" },
        { tag: [t.string, t.special(t.string)], color: "#E6DB74" },
        { tag: [t.number, t.bool, t.null], color: "#AE81FF" },
        { tag: [t.variableName], color: "#FD971F" },
        { tag: [t.propertyName], color: "#F8F8F2" },
        { tag: [t.attributeName], color: "#A6E22E" },
        { tag: [t.tagName], color: "#F92672" },
        { tag: [t.heading], color: "#A6E22E", fontWeight: "bold" },
        { tag: [t.meta, t.annotation], color: "#75715E" },
        { tag: [t.invalid], color: "#F92672", textDecoration: "line-through" }
      ]
    }
  },
  {
    id: "synthwave-84",
    name: "SynthWave '84",
    options: {
      theme: "dark",
      settings: {
        background: "#2A2139",
        foreground: "#E3DFFF",
        caret: "#FF007C",
        selection: "#413A59",
        selectionMatch: "#413A59",
        lineHighlight: "#322947",
        gutterBackground: "#2A2139",
        gutterForeground: "#5D5073"
      },
      styles: [
        { tag: [t.comment], color: "#7E6F9F", fontStyle: "italic" },
        { tag: [t.keyword, t.operator], color: "#FF6AC1" },
        { tag: [t.className, t.definition(t.typeName)], color: "#FFD580" },
        { tag: [t.function(t.variableName)], color: "#85E1FF" },
        { tag: [t.string, t.special(t.string)], color: "#F3F99D" },
        { tag: [t.number, t.bool, t.null], color: "#FF9AC1" },
        { tag: [t.variableName], color: "#FFB86C" },
        { tag: [t.propertyName], color: "#E3DFFF" },
        { tag: [t.attributeName], color: "#FF6AC1" },
        { tag: [t.tagName], color: "#FF007C" },
        { tag: [t.heading], color: "#85E1FF", fontWeight: "bold" },
        { tag: [t.meta, t.annotation], color: "#7E6F9F" },
        { tag: [t.invalid], color: "#FF5555", textDecoration: "line-through" }
      ]
    }
  },
  {
    id: "solarized-light",
    name: "Solarized Light",
    options: {
      theme: "light",
      settings: {
        background: "#FDF6E3",
        foreground: "#657B83",
        caret: "#586E75",
        selection: "#EEE8D5",
        selectionMatch: "#EEE8D5",
        lineHighlight: "#EEE8D5",
        gutterBackground: "#FDF6E3",
        gutterForeground: "#93A1A1"
      },
      styles: [
        { tag: [t.comment], color: "#93A1A1", fontStyle: "italic" },
        { tag: [t.keyword, t.operator], color: "#859900" },
        { tag: [t.className, t.definition(t.typeName)], color: "#268BD2" },
        { tag: [t.function(t.variableName)], color: "#2AA198" },
        { tag: [t.string, t.special(t.string)], color: "#D33682" },
        { tag: [t.number, t.bool, t.null], color: "#B58900" },
        { tag: [t.variableName], color: "#657B83" },
        { tag: [t.propertyName], color: "#657B83" },
        { tag: [t.attributeName], color: "#2AA198" },
        { tag: [t.tagName], color: "#268BD2" },
        { tag: [t.heading], color: "#6C71C4", fontWeight: "bold" },
        { tag: [t.meta, t.annotation], color: "#93A1A1" },
        { tag: [t.invalid], color: "#DC322F", textDecoration: "line-through" }
      ]
    }
  },
  {
    id: "material-darker",
    name: "Material Darker",
    options: {
      theme: "dark",
      settings: {
        background: "#212121",
        foreground: "#B0BEC5",
        caret: "#FFCC00",
        selection: "#424242",
        selectionMatch: "#424242",
        lineHighlight: "#2E2E2E",
        gutterBackground: "#212121",
        gutterForeground: "#616161"
      },
      styles: [
        { tag: [t.comment], color: "#546E7A", fontStyle: "italic" },
        { tag: [t.keyword, t.operator], color: "#FF5370" },
        { tag: [t.className, t.definition(t.typeName)], color: "#FFB62C" },
        { tag: [t.function(t.variableName)], color: "#82AAFF" },
        { tag: [t.string, t.special(t.string)], color: "#C3E88D" },
        { tag: [t.number, t.bool, t.null], color: "#F78C6C" },
        { tag: [t.variableName], color: "#B0BEC5" },
        { tag: [t.propertyName], color: "#B0BEC5" },
        { tag: [t.attributeName], color: "#C792EA" },
        { tag: [t.tagName], color: "#FF5370" },
        { tag: [t.heading], color: "#82AAFF", fontWeight: "bold" },
        { tag: [t.meta, t.annotation], color: "#546E7A" },
        { tag: [t.invalid], color: "#FF5370", textDecoration: "line-through" }
      ]
    }
  },
  {
    id: "material-light",
    name: "Material Light",
    options: {
      theme: "light",
      settings: {
        background: "#FAFAFA",
        foreground: "#546E7A",
        caret: "#7C4DFF",
        selection: "#E3F2FD",
        selectionMatch: "#E3F2FD",
        lineHighlight: "#F5F5F5",
        gutterBackground: "#FAFAFA",
        gutterForeground: "#B0BEC5"
      },
      styles: [
        { tag: [t.comment], color: "#90A4AE", fontStyle: "italic" },
        { tag: [t.keyword, t.operator], color: "#E53935" },
        { tag: [t.className, t.definition(t.typeName)], color: "#8E24AA" },
        { tag: [t.function(t.variableName)], color: "#039BE5" },
        { tag: [t.string, t.special(t.string)], color: "#43A047" },
        { tag: [t.number, t.bool, t.null], color: "#E64A19" },
        { tag: [t.variableName], color: "#546E7A" },
        { tag: [t.propertyName], color: "#546E7A" },
        { tag: [t.attributeName], color: "#3949AB" },
        { tag: [t.tagName], color: "#E53935" },
        { tag: [t.heading], color: "#8E24AA", fontWeight: "bold" },
        { tag: [t.meta, t.annotation], color: "#90A4AE" },
        { tag: [t.invalid], color: "#D50000", textDecoration: "line-through" }
      ]
    }
  }
]

export const themeNames = themes
  .map((theme) => {
    return { id: theme.id, name: theme.name }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

export const resolveTheme = (id: string, isTransparent: boolean): Theme => {
  const theme = themes.find((theme) => theme.id === id)!

  return isTransparent
    ? {
        ...theme,
        options: {
          ...theme.options,
          settings: { ...theme.options.settings, gutterBackground: "transparent", background: "transparent" }
        }
      }
    : theme
}
