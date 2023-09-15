import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]/route'
const ProjectsPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    console.log('not loggedin')
  }

  return (
    <>
      <div>{session ? 'Project1' : 'Not signed in'}</div>
    </>
  )
}

export default ProjectsPage
