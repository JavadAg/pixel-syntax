export type ColorPreset = {
  type: "solid" | "gradient"
  colors: string[]
}

export const solidColors: ColorPreset = {
  type: "solid" as const,
  colors: [
    "rgba(0, 0, 0, 1)",
    "rgba(67, 204, 128, 1)",
    "rgba(72, 129, 204, 1)",
    "rgba(77, 77, 77, 1)",
    "rgba(77, 204, 179, 1)",
    "rgba(102, 153, 255, 1)",
    "rgba(153, 204, 51, 1)",
    "rgba(153, 232, 232, 1)",
    "rgba(204, 102, 255, 1)",
    "rgba(204, 204, 204, 1)",
    "rgba(242, 121, 147, 1)",
    "rgba(245, 221, 0, 1)",
    "rgba(255, 51, 102, 1)",
    "rgba(255, 102, 153, 1)",
    "rgba(255, 153, 102, 1)",
    "rgba(255, 157, 51, 1)",
    "rgba(255, 229, 153, 1)",
    "rgba(255, 255, 255, 1)"
  ]
}

export const gradientColors: ColorPreset = {
  type: "gradient" as const,
  colors: [
    "linear-gradient(135deg, rgba(217, 237, 244, 1) 0%, rgba(179, 205, 229, 1) 100%)",
    "linear-gradient(135deg, rgba(209, 217, 255, 1) 0%, rgba(227, 227, 227, 1) 100%)",
    "linear-gradient(135deg, rgba(232, 211, 153, 1) 0%, rgba(153, 232, 232, 1) 100%)",
    "linear-gradient(135deg, rgba(255, 153, 102, 1) 0%, rgba(255, 229, 153, 1) 100%)",
    "linear-gradient(135deg, rgba(242, 128, 156, 1) 0%, rgba(247, 140, 115, 1) 100%)",
    "linear-gradient(135deg, rgba(255, 51, 102, 1) 0%, rgba(255, 157, 51, 1) 100%)",
    "linear-gradient(135deg, rgba(232, 223, 128, 1) 0%, rgba(68, 136, 102, 1) 100%)",
    "linear-gradient(135deg, rgba(0, 255, 128, 1) 0%, rgba(0, 255, 255, 1) 100%)",
    "linear-gradient(90deg, rgba(67, 204, 128, 1) 0%, rgba(245, 221, 0, 1) 100%)",
    "linear-gradient(135deg, rgba(77, 204, 179, 1) 0%, rgba(102, 153, 255, 1) 100%)",
    "linear-gradient(135deg, rgba(102, 204, 255, 1) 0%, rgba(204, 102, 255, 1) 100%)",
    "linear-gradient(135deg, rgba(102, 102, 255, 1) 0%, rgba(204, 102, 255, 1) 100%)",
    "linear-gradient(135deg, rgba(255, 119, 102, 1) 0%, rgba(168, 60, 112, 1) 100%)",
    "linear-gradient(135deg, rgba(64, 0, 153, 1) 0%, rgba(0, 255, 128, 1) 100%)",
    "linear-gradient(135deg, rgba(102, 102, 102, 1) 0%, rgba(77, 77, 77, 1) 100%)",
    "linear-gradient(135deg, rgba(26, 51, 77, 1) 0%, rgba(59, 87, 117, 1) 100%)",
    "linear-gradient(135deg, rgba(38, 36, 61, 1) 0%, rgba(102, 102, 156, 1) 100%)",
    "linear-gradient(135deg, rgba(72, 129, 204, 1) 0%, rgba(242, 121, 147, 1) 100%)"
  ]
}
