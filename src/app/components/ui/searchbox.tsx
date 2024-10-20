"use client"

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
import { ChangeEvent, ChangeEventHandler, useActionState, useEffect, useReducer, useState } from "react"
import { Control, useForm, useFormState, useWatch } from "react-hook-form"
import { SearchList } from "./searchList"

export const Searchbox = () => {
	const [messages, setMessages] = useState<Messages>({})
	const [result, setResult] = useState("")
	const [touching, setTouching] = useState<keyof Entry>("from")

	const {
		register,
		handleSubmit,
		formState,
		control,
		setFocus,
		getFieldState
	} = useForm<RewriteEntry>({
		mode: "onChange",
		defaultValues: defaultRewriteEntry,
	})

	useEffect(()=>{
		setFocus("from")
	}, [setFocus])

	const submit = async (e: RewriteEntry) => {
		console.log("submitted: ", e)
		// console.log("db contents: ", await db.entries.toArray())
		const res = await db.entries.put(e)
		setResult(res)
	}

	return (<>
		<form onSubmit={handleSubmit(submit)}>
			<HStack>
				{(["ic", "mw", "sc"] as (keyof EntryConfig)[]).map(key => (
					<label>
						<span>{key}</span>
						<Input type="checkbox" {...register(key)} />
					</label>
				))}
			</HStack>
			<HStack>
				{ ["from", "to"].map(key => {
					const k = key as keyof Entry
					return(
						<Box>
							<Input {...register(k, { required: "input something" })}
								placeholder={`rewrite ${k} ...`}
								onFocus={()=>{
									setTouching(k)
								}}
							/>
							{formState.errors[k]?.message && <Box color="red">{formState.errors[k]?.message}</Box> }

						</Box>
					)
				}) }
				<Button type="submit"
					disabled={!formState.isValid}
					// opacity={formState.errors ? .5 : 1}
				>add</Button>
			</HStack>
		</form>
		<FormReactive res={result} />
		<Watched control={control} touching={touching}/>
	</>)
}

const Watched = ({ control, touching }: { control: Control<RewriteEntry>, touching: keyof Entry }) => {
	const [from, to] = useWatch({
		control,
		name: ["from", "to"],
		defaultValue: {
			from: "",
			to: ""
		},
	})

	const matchedTo: Partial<Entry> = { }
	if (touching == "from") matchedTo.from = from
	else matchedTo.to = to

	return <>
		<Heading as="h1">Searched</Heading>
		<Box>{`${from} -> ${to}`} </Box>
		<SearchList matchedTo={matchedTo} />
	</>
}

const FormReactive = ({res}: {res?: string}) => {
	return res && res.length>0 && (<Box>res: {res}</Box>)
}
