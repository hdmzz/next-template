import { getServerSession } from 'next-auth';
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

const Member = async () => {
  //protection de la page serveur ??
  //! 1 - get the session
  const session = await getServerSession(options as any);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");//la callback url est la page actuelle sur laquelle on est redirigé si on arrive a choper une session
  }

  return (
    <div>
        <h1>Member Server session</h1>
    </div>
  )
}

export default Member;
