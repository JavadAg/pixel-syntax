export type Font = {
  id: string
  name: string
  value: string
  ligatures: boolean
  weights: {
    name: string
    value: number
  }[]
}

export const fonts: Font[] = [
  {
    id: "fira-code",
    name: "Fira Code",
    value: "Fira Code, monospace",
    ligatures: true,
    weights: [
      { name: "Regular", value: 400 },
      { name: "Medium", value: 500 },
      { name: "Bold", value: 700 }
    ]
  },
  {
    id: "jetbrains-mono",
    name: "JetBrains Mono",
    value: "JetBrains Mono, monospace",
    ligatures: true,
    weights: [
      { name: "Regular", value: 400 },
      { name: "Medium", value: 500 },
      { name: "Bold", value: 700 }
    ]
  },
  {
    id: "ibm-plex-mono",
    name: "IBM Plex Mono",
    value: "IBM Plex Mono, monospace",
    ligatures: false,
    weights: [
      { name: "Regular", value: 400 },
      { name: "Medium", value: 500 },
      { name: "Bold", value: 700 }
    ]
  },
  {
    id: "cascadia-code",
    name: "Cascadia Code",
    value: "Cascadia Code, monospace",
    ligatures: true,
    weights: [
      { name: "Regular", value: 400 },
      { name: "Bold", value: 700 }
    ]
  },
  {
    id: "dank-mono",
    name: "Dank Mono",
    value: "Dank Mono, monospace",
    ligatures: true,
    weights: [
      { name: "Regular", value: 400 },
      { name: "Bold", value: 700 }
    ]
  },
  {
    id: "gintronic",
    name: "Gintronic",
    value: "Gintronic, monospace",
    ligatures: false,
    weights: [
      { name: "Regular", value: 400 },
      { name: "Medium", value: 500 },
      { name: "Bold", value: 700 }
    ]
  },
  {
    id: "hack",
    name: "Hack",
    value: "Hack, monospace",
    ligatures: false,
    weights: [
      { name: "Regular", value: 400 },
      { name: "Bold", value: 700 }
    ]
  },
  {
    id: "inconsolata",
    name: "Inconsolata",
    value: "Inconsolata, monospace",
    ligatures: false,
    weights: [
      { name: "Regular", value: 400 },
      { name: "Medium", value: 500 },
      { name: "Bold", value: 700 }
    ]
  },
  {
    id: "kode-mono",
    name: "Kode Mono",
    value: "Kode Mono, monospace",
    ligatures: true,
    weights: [
      { name: "Regular", value: 400 },
      { name: "Medium", value: 500 },
      { name: "Bold", value: 700 }
    ]
  },
  {
    id: "monolisa",
    name: "MonoLisa",
    value: "MonoLisa, monospace",
    ligatures: true,
    weights: [
      { name: "Regular", value: 400 },
      { name: "Medium", value: 500 },
      { name: "Bold", value: 700 }
    ]
  },
  {
    id: "sf-mono",
    name: "SF Mono",
    value: "SF Mono, monospace",
    ligatures: true,
    weights: [
      { name: "Regular", value: 400 },
      { name: "Bold", value: 700 }
    ]
  },
  {
    id: "source-code-pro",
    name: "SourceCodePro",
    value: "SourceCodePro, monospace",
    ligatures: false,
    weights: [
      { name: "Regular", value: 400 },
      { name: "Medium", value: 500 },
      { name: "Bold", value: 700 }
    ]
  },
  {
    id: "space-mono",
    name: "Space Mono",
    value: "Space Mono, monospace",
    ligatures: true,
    weights: [
      { name: "Regular", value: 400 },
      { name: "Bold", value: 700 }
    ]
  }
]
