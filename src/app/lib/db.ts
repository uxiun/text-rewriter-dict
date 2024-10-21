// import "fake-indexeddb/auto"
import { indexedDB, IDBKeyRange } from "fake-indexeddb"
import Dexie, { type EntityTable } from "dexie";
import { RewriteEntry } from "./types";

const db = new Dexie("TextRewriterEntries", {
	indexedDB: indexedDB,
	IDBKeyRange: IDBKeyRange,
}) as Dexie & {
	entries: EntityTable<RewriteEntry, "from">
}

db.version(1).stores({
	entries: "&from, to, ic, mw, sc"
})

export { db }