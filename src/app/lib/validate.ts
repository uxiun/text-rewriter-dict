import { RewriteEntry } from "./types"
import { Entry } from "./types"

export type Messages = {
	error?: Partial<Entry>,
	warning?: Partial<Entry>
}

export function validateWord(prev: string, key: keyof Entry) {
	let res: Messages = {}
	if (prev.length === 0) res = {...res, error: {...res.error, [key]: "input something"}}
	else if (prev.length < 3) res = {...res, warning: {...res.warning, [key]: "length shorter than 3"}}
	return res
}

export function validateWords(prev: Messages, value: RewriteEntry) {
	let messages: Messages = {};
	(["from", "to"] as (keyof Entry)[]).forEach(key => {
		if (value[key].length === 0) messages = {...messages, error: {[key]: "input something"}}
	});
	(["from", "to"] as (keyof Entry)[]).forEach(key => {
		if (value[key].length < 3) messages = {...messages, warning: {[key]: "text length is shorter than 3"}}
	});
	return messages
}