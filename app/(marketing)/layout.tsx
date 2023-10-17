import { LandingPageNav } from "@/components/landing-page-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type MarketingLayoutProps = {
  children: React.ReactNode;
};

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Image
        src="https://unsplash.com/photos/QBpZGqEMsKg/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjkxMTE4Mjc2fA&force=true&w=1920"
        alt="background page"
        width={0}
        height={0}
        sizes="100vw"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
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
