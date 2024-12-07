import { renderHook } from "@testing-library/react"
import { vi } from "vitest"
import { useIsMobile } from "./use-mobile"

const createMatchMedia = (width: number) => ({
  matches: width < 768,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn()
})

describe("useIsMobile", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", () => {
      return createMatchMedia(window.innerWidth)
    })
    vi.stubGlobal("innerWidth", 1000)
  })

  it("should return true when the screen width is below the MOBILE_BREAKPOINT", () => {
    vi.stubGlobal("innerWidth", 500)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it("should return false when the screen width is above the MOBILE_BREAKPOINT", () => {
    vi.stubGlobal("innerWidth", 1000)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })
})
