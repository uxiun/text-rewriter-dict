"use client"
import { VStack } from "@kuma-ui/core"
import { Entry } from "./listEntry"
import { Fragment } from "react"
import { RewriteEntry } from "@/app/lib/types"

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
