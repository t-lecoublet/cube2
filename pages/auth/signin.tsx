import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function signin() {
    const router = useRouter();
  return (
    <div>signin
        <ul>
            <li onClick={() =>
                signIn("github", {
                  callbackUrl: router.query.callbackUrl.toString(),
                })}>
                GITHUB
            </li>
            <li onClick={() =>
                signIn("google", {
                  callbackUrl: router.query.callbackUrl.toString(),
                })}>
                GOOGLE
            </li>
        </ul>
    </div>
  )
}


