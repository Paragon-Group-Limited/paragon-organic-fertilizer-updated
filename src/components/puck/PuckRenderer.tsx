'use client'

import { Render } from '@puckeditor/core'
import { puckConfig } from '@/puck/config'
import '@puckeditor/core/dist/index.css'

type Props = {
  data: object
}

export function PuckRenderer({ data }: Props) {
  return <Render config={puckConfig} data={data} />
}
