import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session?.user?.isAdmin) {
      redirect("/manager");
    } else {
      redirect("/dashboard/hackathons");
    }
  }

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to NetraLabs <br />
            The app for hackathons
          </h1>
          <p className="max-w-[42rem] leading-normal text-slate-400 sm:text-xl sm:leading-8">
            Build projects, learn new skills, and grow your network in
            hackathons.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/signIn"
              className={cn(
                buttonVariants({ size: "lg", variant: "secondary" }),
                "font-medium ",
              )}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
