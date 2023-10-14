import { UserAuthForm } from "@/components/user-auth-form";
import Image from "next/image";
import React from "react";
import NetraScaleLogo from "@/components/images/logo-white-whiteText.png";
import NetraLabsLogo from "@/components/images/BrandImage.png";

export default async function Page() {
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        alt="background page"
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="absolute left-6 top-6">
        <Image
          src={NetraScaleLogo}
          className="mx-auto"
          width={100}
          height={100}
          alt="logo"
        />
      </div>
      <div className="absolute right-6 top-8 flex items-center gap-3">
        <Image
          src={NetraLabsLogo}
          className="mx-auto"
          width={40}
          height={40}
          alt="logo"
        />
        <h1 className="text-xl font-bold">NetraLabs</h1>
      </div>
      <div className="lg:p-8">
        <div className="absolute left-2/4 top-2/4 z-50 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4 sm:w-[350px]">
          <UserAuthForm />
        </div>
      </div>
    </>
  );
}
