"use client"

import { EntryConfig, RewriteEntry } from "@/app/lib/types"
import { HStack, Input, Box } from "@kuma-ui/core"
import { Fragment } from "react"

export const Entry = ({entry}: {entry: RewriteEntry}) => {
  return <Box>
    <HStack>
      {
        ["ic", "mw", "sc"].map(key => {
          const k = key as keyof EntryConfig
          return <Fragment key={key}>
            <Input type="checkbox" readOnly checked={entry[k]}/>
          </Fragment>
        })
      }
      <Box>{entry.from}</Box>
      <Box>→</Box>
      <Box>{entry.to}</Box>
    </HStack>
  </Box>
}