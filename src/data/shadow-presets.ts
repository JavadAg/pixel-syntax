export type Shadow = {
  name: string
  value: string
}

export const shadows: Shadow[] = [
  {
    name: "None",
    value: "None"
  },
  {
    name: "Soft",
    value: "0px 2px 4px rgba(0, 0, 0, 0.1)"
  },
  {
    name: "Light Glow",
    value: "0px 4px 6px rgba(0, 0, 0, 0.15)"
  },
  {
    name: "Standard",
    value: "0px 4px 8px rgba(0, 0, 0, 0.2)"
  },
  {
    name: "Floating",
    value: "0px 6px 10px rgba(0, 0, 0, 0.25)"
  },
  {
    name: "Dark",
    value: "0px 8px 16px rgba(0, 0, 0, 0.3)"
  },
  {
    name: "Inner",
    value:
      "0 0 0 1px rgba(0, 0, 0, .9), inset 0 0 0 1.5px rgba(255, 255, 255, 0.5), 0px 0px 18px 1px rgba(0, 0, 0, 0.6)"
  },
  {
    name: "Deep",
    value: "0px 10px 20px rgba(0, 0, 0, 0.35)"
  },
  {
    name: "Glow",
    value: "0px 0px 10px rgba(0, 123, 255, 0.5)"
  }
]
