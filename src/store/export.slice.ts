import type { ExportConfig, ExportExtension, ExportExtensionOption, ExportScale } from "@/types/export-config.type"
import type { StateCreator } from "zustand"
import { exportExtensions, exportScales } from "@/data/export-configs"

export const initialState: ExportConfig = {
  exportExtension: exportExtensions.find((item) => item.name === "Png")!,
  exportExtensionOptions: null,
  exportScale: exportScales.find((item) => item.value === 2)!,
  exportName: "output"
}

export type ExportSlice = {
  exportConfig: ExportConfig
  setExportExtension: (payload: ExportExtension) => void
  setExportExtensionOptions: (payload: ExportExtensionOption[]) => void
  setExportScale: (payload: ExportScale) => void
  setExportName: (payload: string) => void
}

export const createExportSlice: StateCreator<ExportSlice> = (set) => ({
  exportConfig: initialState,
  setExportExtension: (payload) =>
    set((state) => ({
      exportConfig: {
        ...state.exportConfig,
        exportExtension: payload,
        exportExtensionOptions: payload.options
          ? payload.options.map((opt) => ({
              optionName: opt.name,
              value: opt.defaultValue
            }))
          : null
      }
    })),
  setExportExtensionOptions: (payload) =>
    set((state) => ({
      exportConfig: { ...state.exportConfig, exportExtensionOptions: payload }
    })),
  setExportScale: (payload) =>
    set((state) => ({
      exportConfig: { ...state.exportConfig, exportScale: payload }
    })),
  setExportName: (payload) =>
    set((state) => ({
      exportConfig: { ...state.exportConfig, exportName: payload }
    }))
})
