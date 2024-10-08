import Link from 'next/link'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

const Nav = async () => {
  const session = await getServerSession(options as any);

  return (
    <header className='bg-gray-600 text-gray-400'>
        <nav className='flex justify-between items-center w-full px-10 py-4'>
            <div>App name</div>
            <div className='flex gap-10'>
                <Link href={'/'}>Home</Link>
                <Link href={'/Member'}>Member</Link>
                <Link href={'/ClientMember'}>Client Member</Link>
                <Link href={'/CreateUser'}>Create User</Link>
                <Link href={'/Public'}>Public</Link>
                {session ? (
                    <Link href={'/api/auth/signout?callbackUrl=/'}>Sign out</Link>
                ) : (
                    <Link href={'/api/auth/signin'}>Sign in</Link>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Nav;
