import { EntryDict, EntryValue, RewriteEntry } from "./types"

export const KEYS = "KEYS"
export const KEY_ALL_DATA = "KEY_ALL_DATA"

export const separateEntry = (entry: RewriteEntry): [string, EntryValue] => {
	const { from, ...other } = entry
	return [from, other]
}

export const entriesFromDict = (dict: EntryDict): RewriteEntry[] =>
	Array.from(dict.entries()).map(([from, other]) => ({ from, ...other}) )