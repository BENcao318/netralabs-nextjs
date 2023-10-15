import { LandingPageNav } from "@/components/landing-page-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type MarketingLayoutProps = {
  children: React.ReactNode;
};

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <img
        src="https://unsplash.com/photos/QBpZGqEMsKg/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjkxMTE4Mjc2fA&force=true&w=1920"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        alt="background page"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/100 opacity-80" />
      <header className="bg-background container z-40">
        <div className="flex h-20 items-center justify-between py-6">
          <LandingPageNav />
          <nav>
            <Link
              href="/auth/signIn"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4",
              )}
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>
      <main className="z-50 flex-1">{children}</main>
    </div>
  );
}
