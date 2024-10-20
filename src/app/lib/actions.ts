"use server"

import { RewriteEntry, db } from "./db";
import { Entry } from "./types";

export async function addEntry(formData: RewriteEntry) {
	const res = await db.entries.add(formData)
	return res
}


