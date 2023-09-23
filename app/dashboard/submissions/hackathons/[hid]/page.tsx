import { getProjectsByHackathonId } from '@/app/libs/projects'
import SubmittedProjectInformationCard from '@/components/submitted-project-information-card'
import { Separator } from '@/components/ui/separator'
import React from 'react'

export default async function page({ params }: { params: { hid: string } }) {
  const projects = await getProjectsByHackathonId(params.hid)
  console.log(projects)
  return (
    <div className="container">
      <div className="flex items-center justify-center">
        <div className="space-y-1 mt-6 ">
          <h2 className="text-2xl font-semibold tracking-tight">
            Submissions for{' '}
          </h2>
          <span className="font-extrabold text-2xl font-mono text-orange-100">
            {projects[0].hackathon.name}
          </span>
          <p className="text-lg text-muted-foreground text-center">
            {projects[0].hackathon.tagline}
          </p>
        </div>
      </div>
      <Separator className="my-4 mb-12" />
      <div className="flex gap-6 justify-items-center px-2">
        {projects.map((project) => (
          <SubmittedProjectInformationCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
