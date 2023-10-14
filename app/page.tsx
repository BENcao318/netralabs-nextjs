import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex-center w-full flex-col text-xl">
        <h1 className="head_text text-center">
          Netralabs
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">Landing Page</span>
        </h1>

        <div className="mx-auto flex w-full justify-center">
          <Link
            className="mt-8 cursor-pointer rounded-lg bg-slate-100 p-3 font-bold text-slate-900 "
            href={"/auth/signIn"}
          >
            sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
