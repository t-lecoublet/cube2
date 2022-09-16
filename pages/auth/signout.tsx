
import { GetStaticProps } from "next";
import { signOut } from "next-auth/react";
import React from "react";

interface Props {
  callbackUrl: string;
}

export default function logout({ callbackUrl }) {
  signOut({ callbackUrl });
  return <div></div>;
}


