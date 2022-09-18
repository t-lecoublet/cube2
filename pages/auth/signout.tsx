
import { GetStaticProps } from "next";
import { signOut } from "next-auth/react";
import React from "react";

interface Props {
  callbackUrl: string;
}

export default function logout({ callbackUrl }) {
  signOut({ callbackUrl: callbackUrl });
  return <div>
    <div className="flex justify-center items-center space-x-2">
      <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-blue-600" role="status">
        <span className="visually-hidden">Redirecting...</span>
        </div>
    </div>
    </div>;
}

export const getStaticProps = async (context: GetStaticProps) => ({
  props: { callbackUrl: process.env.NEXTDEFAULT_URL }, // will be passed to the page component as props
});
