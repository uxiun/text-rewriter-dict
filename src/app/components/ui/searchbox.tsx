"use client"

import { partialUpdateObject } from "@/app/lib/generic"
import { Entry, defaultEntry } from "@/app/lib/types"
import { Box, HStack, Heading, Input, VStack } from "@kuma-ui/core"
import { ChangeEventHandler, useReducer, useState } from "react"

export const Searchbox = () => {
	const [entry, setEntry] = useReducer(partialUpdateObject<Entry>, defaultEntry)
	return (
		<>
			<Box>
				{["from", "to"].map(key => (
					<Inputbox dispatch={(s: string) => setEntry({ [key]: s })} placeholder={`input ${key}`} content={entry[key as keyof Entry]} />
				))}
			</Box>
      <VStack>
        <Heading as="h1">from: {entry.from}</Heading>
        <Heading as="h1">to: {entry.to}</Heading>
      </VStack>
		</>
	)
}

const Inputbox = (state: { placeholder: string; dispatch: React.Dispatch<string>; content: string }) => {
	const [input, setInput] = useState("")
	const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    state.dispatch(e.target.value ?? "")
		// if (e.target.nodeValue) {
		// 	setInput(e.target.nodeValue)
		// 	state.dispatch(e.target.nodeValue)
		// }
	}

	return <Input placeholder={state.placeholder} onChange={onChange} value={state.content} />
}
