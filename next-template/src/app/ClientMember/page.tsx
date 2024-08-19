"use client";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

const Member = () => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Member");
    },
  });

  return (
    <div>
        <h1>
            Member client session
        </h1>
        <p>{session?.user?.name}</p>
    </div>
  )
}

export default Member;
