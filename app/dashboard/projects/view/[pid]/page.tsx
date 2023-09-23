import { getProjectByPid } from '@/app/libs/projects'
import React from 'react'

export default async function page({ params }: { params: { pid: string } }) {
  const project = await getProjectByPid(params.pid)

  return <div>{params.pid} page</div>
}
