"use client"

import {
	EntryConfig,
	RewriteEntry,
	defaultRewriteEntry
} from "@/app/lib/types"
import { db } from "@/app/lib/db"
import { Entry } from "@/app/lib/types"
import { Box, Button, HStack, Heading, Input } from "@kuma-ui/core"
import { useEffect, useState } from "react"
import { Control, useForm, useWatch } from "react-hook-form"
import { SearchList } from "./searchList"

export const Searchbox = () => {
	const [result, setResult] = useState("")
	const [touching, setTouching] = useState<keyof Entry>("from")

	const {
		register,
		handleSubmit,
		formState,
		control,
		setFocus,
	} = useForm<RewriteEntry>({
		mode: "onChange",
		defaultValues: defaultRewriteEntry,
	})

	useEffect(()=>{
		setFocus("from")
	}, [setFocus])

	const submit = async (e: RewriteEntry) => {
		console.log("submitted: ", e)
		const res = await db.entries.put(e)
		setResult(res)
	}

	return (<>
		<form onSubmit={handleSubmit(submit)}>
			<HStack>
				{(["ic", "mw", "sc"] as (keyof EntryConfig)[]).map(key => (
					<label key={key}>
						<span>{key}</span>
						<Input type="checkbox" {...register(key)} />
					</label>
				))}
			</HStack>
			<HStack>
				{ ["from", "to"].map(key => {
					const k = key as keyof Entry
					return(
						<Box key={k}>
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
