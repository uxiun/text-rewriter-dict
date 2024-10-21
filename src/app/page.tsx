"use client"
import { Box, Button, HStack, Heading } from "@kuma-ui/core";
import { Searchbox } from "./components/ui/searchbox";
import { ListOfEntries } from "./components/ui/list";
import { useAllWithLocalStorage } from "./hooks/allData";
import { KEY_ALL_DATA, entriesFromDict } from "./lib/localstorage";
import { EntryDict, RewriteEntry } from "./lib/types";
import { useEffect, useState } from "react";


export default function Home() {
  return <>
    <Searchbox />
    <AllEntries />
    <LocalStorageList />
  </>
}

const AllEntries = ()=> {
  const entries = useAllWithLocalStorage()
  return (
    <Box>
      <Heading as="h1">All List</Heading>
      <ListOfEntries entries={entries} />
    </Box>
  )
}

const LocalStorageList = () => {
  const [entries, setEntries] = useState<RewriteEntry[]>([])
  const reload = () => {
    const s = window.localStorage.getItem(KEY_ALL_DATA)
    const dict: EntryDict = s ? JSON.parse(s) as EntryDict : new Map()
    const entries = entriesFromDict(dict)
    console.log("LocalStorage entries: ", entries)
    setEntries(entries)
  }

  useEffect(reload, [])

  return(
    <Box>
      <HStack>
        <Heading as="h1">LocalStorageList</Heading>
        <Button onClick={reload}>reload</Button>
      </HStack>
      <ListOfEntries entries={entries} />
    </Box>
  )
}