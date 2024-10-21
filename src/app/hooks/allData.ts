import { useLiveQuery } from "dexie-react-hooks"
import { RewriteEntry } from "../lib/types"
import { db } from "../lib/db"
import { KEY_ALL_DATA } from "../lib/localstorage"
import { useEffect, useState } from "react"

// const useAllData = (defaultValue?: RewriteEntry[]) => {
// 	const all = useLiveQuery(() => db.entries.toArray())
// 	if (!all) console.log("failed to get all values by useLiveQuery()")

// 	let entries: RewriteEntry[] = all ?? defaultValue ?? []
// 	const defaultDict: EntryDict = new Map(entries.map(({ from, ...value}) => [from, value]))

// 	const [local, setLocal] = useLocalStorage<EntryDict>(KEY_ALL_DATA, defaultDict)

// 	const reset = (entries?: RewriteEntry[]) => {
// 		setLocal(new )
// 	}

// 	return

// }

export function useAllWithLocalStorage<T,U>(
	// querier: () => Promise<T>|T,
	convert?: (queryResult: T) => U,
	// deps?: any[],
	// defaultResult?: T
	) {
	// const all = useLiveQuery(querier, deps??[], defaultResult)
	const [all, setAll] = useState<RewriteEntry[]>([])
	console.log("useAllWithLocalStorage. all = ", all)

	useEffect(() => {
		console.log("useAllWithLocalStorage.effect[]")
		const w = window.localStorage.getItem(KEY_ALL_DATA)
		const entries: RewriteEntry[] = w ? JSON.parse(w) : []
		db.entries.clear()
		db.entries.bulkPut(entries)
		setAll(entries)
	}, [convert])

	useEffect(() => {
		console.log("useAllWithLocalStorage.effect[all]")
		let data = JSON.stringify(all)
		if (all !== undefined && convert) {
			data = JSON.stringify(convert(all as T))
		}
		window.localStorage.setItem(KEY_ALL_DATA, data)
	}, [convert, all])

	const live = useLiveQuery(() => db.entries.toArray())

	useEffect(() => {
		console.log("useAllWithLocalStorage.effect[live]")
		if (live) setAll(live)
	}, [convert, live])

	return all
}