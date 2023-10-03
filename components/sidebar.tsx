'use client'

import classNames from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  SquareCode,
  FolderKanban,
  Users,
  Presentation,
  ChevronsLeft,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import BrandImg from './images/BrandImage.png'
import NetraChainImage from './images/NetraChainImage.png'
import { Card, CardContent } from './ui/card'

type Route = {
  icon?: React.ComponentType<any>
  name: string
  link: string
}

const routes: Route[] = [
  {
    icon: SquareCode,
    name: 'Hackathons',
    link: '/dashboard/hackathons',
  },
  {
    icon: FolderKanban,
    name: 'Projects',
    link: '/dashboard/projects',
  },
  {
    icon: Users,
    name: 'Participants',
    link: '/dashboard/participants',
  },
  {
    icon: Presentation,
    name: 'Submissions',
    link: '/dashboard/submissions',
  },
]

export function Sidebar() {
  const [toggleCollapse, setToggleCollapse] = useState(false)
  const [isCollapsible, setIsCollapsible] = useState(false)

  const pathname = usePathname()

  const activeRoute = useMemo(
    () => routes.find((route) => route.link === pathname),
    [pathname]
  )

  const collapseIconClasses = classNames(
    'p-4 rounded bg-light-lighter absolute -top-10 -right-2',
    {
      'rotate-180': toggleCollapse,
    }
  )

  const getNavItemClasses = (route: Route) => {
    return classNames(
      'flex items-center cursor-pointer hover:bg-orange-300 hover:text-slate-900 rounded w-full overflow-hidden whitespace-nowrap',
      {
        ['bg-orange-600']: activeRoute?.name === route.name,
      }
    )
  }

  const wrapperClasses = classNames(
    'h-screen px-4 pt-8 pb-4 bg-slate-900 flex justify-between flex-col fixed',
    {
      ['w-80']: !toggleCollapse,
      ['w-20']: toggleCollapse,
    }
  )

  const onMouseOver = () => {
    setIsCollapsible((prev) => !prev)
  }

  const handleSidebarToggle = () => {
    setToggleCollapse((prev) => !prev)
  }

  useEffect(() => {
    const handleResize = () => {
      setToggleCollapse(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s' }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4 mt-3">
            <Image src={BrandImg} className="mx-auto" alt="img" />
            <span
              className={classNames('text-2xl font-bold', {
                hidden: toggleCollapse,
              })}
            >
              NetraLabs
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <ChevronsLeft className="w-8 h-8" />
            </button>
          )}
        </div>
        <div className="flex flex-col items-start mt-10">
          {routes.map(({ icon: Icon, ...route }) => {
            const classes = getNavItemClasses(route)
            return (
              <div className={classes} key={route.name}>
                <Link href={route.link}>
                  <div className="flex py-4 px-3 items-center w-full h-full">
                    <div style={{ width: '3rem' }}>{Icon && <Icon />}</div>
                    {!toggleCollapse && (
                      <span className={classNames('text-lg font-semibold')}>
                        {route.name}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {!toggleCollapse && (
        <Card className="mt-auto py-2">
          <CardContent className="flex flex-col -mx-2">
            <a href="https://www.netrascale.com/" target="_blank">
              <Image
                src={NetraChainImage}
                className="w-3/4 h-3/4 mx-auto"
                alt="netrachainimage"
              />
            </a>
            <h1 className="mt-3 text-center">Join NetraChain for more</h1>
            <p className="font-normal opacity-80 mt-2">
              We empower you with game-changing R&D projects, hackathons, and
              design thinking labs, while genuinely acknowledging and addressing
              the challenges you encounter.
            </p>
            <div className="mt-4 flex mx-auto -mb-6 hover:underline">
              <a
                href="https://www.netrascale.com/"
                className="font-medium font-mono"
                target="_blank"
              >
                Go to NetraChain
              </a>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
