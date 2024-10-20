"use client"
import { db } from "@/app/lib/db"
import { useLiveQuery } from "dexie-react-hooks"

export const List = () => {
  const entries = useLiveQuery(()=> db.entries.toArray())
  
  return(
    <ol>
      {entries?.map(e =>
        <li key={e.from}>
          {JSON.stringify(e)}
        </li>)}
    </ol>
  )
}