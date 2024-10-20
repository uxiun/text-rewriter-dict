"use client"

import { addEntry } from "@/app/lib/actions"
import {
	EntryConfig,
	RewriteEntry,
	db,
	defaultRewriteEntry,
	entryConfigDefault,
} from "@/app/lib/db"
import { partialUpdateObject } from "@/app/lib/generic"
import { Entry, defaultEntry } from "@/app/lib/types"
import { Messages, validateWord } from "@/app/lib/validate"
import { Box, Button, HStack, Heading, Input, VStack } from "@kuma-ui/core"
import { ChangeEvent, ChangeEventHandler, useActionState, useReducer, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

export const Searchbox = () => {
	const [messages, setMessages] = useState<Messages>({})
	const [result, setResult] = useState("")
	const [formState, action] = useFormState(async e => {
		const res = await addEntry(e)
		if (res) {
			setResult(res)
			return e
		} else return {...e, from: "", to: ""}
	} , defaultRewriteEntry)

	const passedValidation = messages.error === undefined

	return (
		<form action={action}>
			<HStack>
				{(["ic", "mw", "sc"] as (keyof EntryConfig)[]).map(key => (
					<label>
						<span>{key}</span>
						<Input name={key} type="checkbox" checked={formState[key]} />
					</label>
				))}
			</HStack>
			<HStack>
				{ ["from", "to"].map(key => {
					const k = key as keyof Entry
					return(
						<Box>
							<Input name={key} type="text" placeholder={`rewrite ${k} ...`} onChange={(e: ChangeEvent<HTMLInputElement>) => {
								const m = validateWord(e.target.value, k)
								setMessages(m)
							}} />
							{messages.error && (messages.error[k] ? <Box color="red">{messages.error[k]} </Box>: "")}
							{messages.warning && (messages.warning[k] ? <Box color="orange">{messages.warning[k]} </Box>: "")}
						</Box>
					)
				}) }
				<FormReactive passedValidation />
			</HStack>
			<HStack>
				<Heading as="h1">from: {formState.from}</Heading>
				<Heading as="h1">to: {formState.to}</Heading>
			</HStack>
		</form>
	)
}

const FormReactive = ({passedValidation}: {passedValidation: boolean}) => {
	const status = useFormStatus()

	return (
			<Button disabled={status.pending || !passedValidation} >post</Button>
	)
}
