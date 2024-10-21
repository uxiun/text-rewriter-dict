"use client"

import { ListOfEntries } from "./list"
import { RewriteEntry } from "@/app/lib/types"
import { useAllWithLocalStorage } from "@/app/hooks/allData"

export const SearchList = ({ matchedTo }: { matchedTo: Partial<RewriteEntry> }) => {
  const kvs = Object.entries(matchedTo) as [keyof RewriteEntry, string|boolean][]

  const collection = useAllWithLocalStorage()

  const matched = collection?.filter(e =>
      kvs.every(([k, v]) =>
        (typeof e[k] == "string") ? (e[k] as string).includes(v as string): (e[k] === v)
      )
    )

  return <ListOfEntries entries={matched} />
}