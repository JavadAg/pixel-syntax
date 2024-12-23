import type { Preset } from "@/types/presets.type"
import Dexie, { type EntityTable } from "dexie"

const db = new Dexie("syntax-presets-db") as Dexie & {
  presets: EntityTable<Preset, "id">
}

db.version(1)
  .stores({
    presets: "++id, name, updatedAt, createdAt, configs",
    appState: "&key"
  })
  .upgrade(async (tx) => {
    await tx.table("appState").clear()
    await tx.table("presets").clear()
  })

export default db
