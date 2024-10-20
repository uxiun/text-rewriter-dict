"use client"
import { Box, Heading } from "@kuma-ui/core";
import { Searchbox } from "./components/ui/searchbox";
import { ListOfEntries } from "./components/ui/list";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./lib/db";


export default function Home() {

  return <>
    <Heading as="h1" color="green">Hello, Kuma UI</Heading>
    <Searchbox />
    <AllEntries />
  </>
}

const AllEntries = ()=> {
  const entries = useLiveQuery(()=> db.entries.toArray())
  return (
    <Box>
      <Heading as="h1">All List</Heading>
      <ListOfEntries entries={entries} />
    </Box>
  )
}