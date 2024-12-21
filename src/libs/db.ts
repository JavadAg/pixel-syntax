import type { Preset } from "@/types/presets.type"
import Dexie, { type EntityTable } from "dexie"

const db = new Dexie("syntax-presets-db") as Dexie & {
  presets: EntityTable<Preset, "id">
}

db.version(3)
  .stores({
    presets: "++id, name, updatedAt, createdAt, configs",
    appState: "&key"
  })
  .upgrade(async (tx) => {
    const presets = await tx.table("presets").toArray()
    for (const preset of presets) {
      preset.configs = {
        ...preset.configs,
        watermarkControls: preset.configs.watermarkControls || {
          location: "container",
          opacity: 100,
          text: "Pixel Syntax"
        }
      }
      await tx.table("presets").put(preset)
    }
  })

export default db
