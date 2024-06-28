import React from "react";
import Head from "next/head";
import { BlitzLayout } from "@blitzjs/next";

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "tegro-assessment"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="py-10">
        <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
          <div className="text-white max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            Simple ToDo list
          </div>
        </nav>
      </div>
      <div className="container mx-auto">
        {children}
      </div>
    </>
  )
}

export default Layout;
