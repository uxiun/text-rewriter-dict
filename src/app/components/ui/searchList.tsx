"use client"

import { RewriteEntry, db } from "@/app/lib/db"
import { useLiveQuery } from "dexie-react-hooks"
import { ListOfEntries } from "./list"

export const SearchList = ({ matchedTo }: { matchedTo: Partial<RewriteEntry> }) => {
  const kvs = Object.entries(matchedTo) as [keyof RewriteEntry, string|boolean][]
  console.log(kvs)

  const collection = useLiveQuery(()=> db.entries
    // .filter(e => matchedTo.from? e.from === matchedTo.from : true)
    .toArray()
  );

  const matched = collection?.filter(e =>
      kvs.every(([k, v]) =>
        (typeof e[k] == "string") ? (e[k] as string).includes(v as string): (e[k] === v)
      )
    )

  console.log(collection?.length)
  return <ListOfEntries entries={matched} />
}