export type Border = {
  name: string
  value: string
}

export const borderList: Border[] = [
  {
    name: "None",
    value: "none"
  },
  {
    name: "Thin Solid",
    value: "1px solid #ccc"
  },
  {
    name: "Medium Solid",
    value: "2px solid #000"
  },
  {
    name: "Thick Solid",
    value: "4px solid #333"
  },
  {
    name: "Dashed",
    value: "2px dashed #aaa"
  },
  {
    name: "Dotted",
    value: "2px dotted #bbb"
  },
  {
    name: "Light Outline",
    value: "1px solid rgba(0, 0, 0, 0.1)"
  },
  {
    name: "Divider Line",
    value: "1px solid #ddd"
  },
  {
    name: "Focus Ring",
    value: "2px solid #007BFF"
  }
]
