import Dexie, { type EntityTable } from "dexie";
import { Entry } from "./types";

type EntryConfig = {
	ic: boolean
	mw: boolean
	sc: boolean
}

export const entryConfigDefault: EntryConfig = {
	ic: false,
	mw: false,
	sc: false,
}

type RewriteEntry = Entry & EntryConfig
export const defaultRewriteEntry: RewriteEntry = {
	...entryConfigDefault,
	from: "",
	to: "",
}

const db = new Dexie("TextRewriterEntries") as Dexie & {
	entries: EntityTable<RewriteEntry, "from">
}

db.version(1).stores({
	entries: "++from, to, ic, mw, sc"
})

export type { EntryConfig, RewriteEntry }
export { db }
