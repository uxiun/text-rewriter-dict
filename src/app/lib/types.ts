export type Entry = {
	from: string,
	to: string
}

export const defaultEntry: Entry = {
	from: "",
	to: ""
}

export type EntryConfig = {
	ic: boolean
	mw: boolean
	sc: boolean
}

export const entryConfigDefault: EntryConfig = {
	ic: false,
	mw: false,
	sc: false,
}

export type RewriteEntry = Entry & EntryConfig
export const defaultRewriteEntry: RewriteEntry = {
	...entryConfigDefault,
	from: "",
	to: "",
}

export type EntryValue = Omit<RewriteEntry, "from">

export type EntryDict = Map<string, EntryValue>