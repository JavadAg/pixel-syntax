import type { Preset } from "@/types/presets.type"
import Dexie, { type EntityTable } from "dexie"

const db = new Dexie("syntax-presets-db") as Dexie & {
  presets: EntityTable<Preset, "id">
}

db.version(2).stores({
  presets: "++id, name, updatedAt, createdAt, configs",
  appState: "&key"
})

export default db
