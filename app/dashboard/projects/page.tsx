import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { Separator } from '@/components/ui/separator'
import { getProjects } from '@/app/libs/projects'
import ProjectInformationCard from '@/components/project-information-card'
const ProjectsPage = async () => {
  const session = await getServerSession(authOptions)
  let projects: any[] = []

  if (!session) {
    console.log('not loggedin')
  } else {
    projects = await getProjects(session.user.id)
    projects[1] = { ...projects[0] } //todo
  }

  //todo get projects with user as participants

  return (
    <>
      {!session ? (
        'Not signed in'
      ) : (
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="space-y-1 mt-6 ">
              <h2 className="text-2xl font-semibold tracking-tight">
                Your projects
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore different hackathons. Join for free.
              </p>
            </div>
          </div>
          <Separator className="my-4 mb-12" />
          <div className="grid xl:grid-cols-2 gap-6 justify-items-center ">
            {projects &&
              (projects.length === 0 ? (
                <div className="text-muted-foreground w-full text-2xl font-bold mt-8">
                  No projects, Please check available hackathon and create one
                  first.
                </div>
              ) : (
                projects.map((project) => (
                  <ProjectInformationCard
                    key={project.id}
                    project={project}
                    userId={session.user.id}
                  />
                ))
              ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectsPage
