"use client"
import { RewriteEntry, db } from "@/app/lib/db"
import { Box, Heading, VStack } from "@kuma-ui/core"
import { Entry } from "./listEntry"
import { Fragment } from "react"

export const ListOfEntries = ({ entries }: { entries: RewriteEntry[] | undefined }) => {
	return (
		<VStack>
			{entries?.map(e => (
				<Fragment key={e.from}>
          <Entry entry={e} />
        </Fragment>
			))}
		</VStack>
	)
}
