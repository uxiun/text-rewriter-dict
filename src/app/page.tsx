import { Heading } from "@kuma-ui/core";
import { Searchbox } from "./components/ui/searchbox";
import { List } from "./components/ui/list";


export default function Home() {
  return <>
    <Heading as="h1" color="green">Hello, Kuma UI</Heading>
    <Searchbox />
    <List />
  </>
}