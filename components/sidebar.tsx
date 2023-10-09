"use client";

import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  SquareCode,
  FolderKanban,
  Users,
  Presentation,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BrandImg from "./images/BrandImage.png";
import NetraChainImage from "./images/NetraChainImage.png";
import { Card, CardContent } from "./ui/card";

type Route = {
  icon?: React.ComponentType<any>;
  name: string;
  link: string;
};

const routes: Route[] = [
  {
    icon: SquareCode,
    name: "Hackathons",
    link: "/dashboard/hackathons",
  },
  {
    icon: FolderKanban,
    name: "Projects",
    link: "/dashboard/projects",
  },
  {
    icon: Users,
    name: "Participants",
    link: "/dashboard/participants",
  },
  {
    icon: Presentation,
    name: "Submissions",
    link: "/dashboard/submissions",
  },
];

export function Sidebar() {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const pathname = usePathname();

  const activeRoute = useMemo(
    () => routes.find((route) => route.link === pathname),
    [pathname],
  );

  const collapseIconClasses = classNames(
    "rounded-full  bg-slate-200  absolute -right-[13px] hover:bg-slate-300 p-1",
    {
      "rotate-180": toggleCollapse,
    },
  );

  const getNavItemClasses = (route: Route) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-slate-500 rounded-lg w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-slate-500"]: activeRoute?.name === route.name,
      },
    );
  };

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-slate-700 flex justify-between flex-col fixed shadow-xl",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    },
  );

  const onMouseOver = () => {
    setIsCollapsible((prev) => !prev);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setToggleCollapse(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="mt-3 flex items-center">
          <div className="flex h-full items-center gap-4 pl-2">
            <Image src={BrandImg} className="mx-auto" alt="img" />
            <span
              className={classNames("text-2xl font-bold", {
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
              <ChevronLeft
                className="h-5 w-5 text-slate-900"
                strokeWidth={1.5}
              />
            </button>
          )}
        </div>
        <div className="mt-10 flex flex-col items-start gap-1">
          {routes.map(({ icon: Icon, ...route }) => {
            const classes = getNavItemClasses(route);
            return (
              <div className={classes} key={route.name}>
                <Link href={route.link}>
                  <div className="flex h-full w-full items-center px-3 py-3">
                    <div style={{ width: "3rem" }}>{Icon && <Icon />}</div>
                    {!toggleCollapse && (
                      <span className={classNames("text-md font-medium")}>
                        {route.name}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {!toggleCollapse && (
        <Card className="mt-auto py-2">
          <CardContent className="-mx-2 flex flex-col">
            <a href="https://www.netrascale.com/" target="_blank">
              <Image
                src={NetraChainImage}
                className="mx-auto h-3/4 w-3/4"
                alt="netrachainimage"
              />
            </a>
            <h1 className="mt-3 text-center">Join NetraChain for more</h1>
            <p className="mt-2 font-normal opacity-80">
              We empower you with game-changing R&D projects, hackathons, and
              design thinking labs, while genuinely acknowledging and addressing
              the challenges you encounter.
            </p>
            <div className="mx-auto -mb-6 mt-4 flex hover:underline">
              <a
                href="https://www.netrascale.com/"
                className="font-mono font-medium"
                target="_blank"
              >
                Go to NetraChain
              </a>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
