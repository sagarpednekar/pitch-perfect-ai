import { isAuthenticated, logout } from '@/features/auth/actions';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userAutheticated = await isAuthenticated();
  // If the user is not authenticated, redirect to the login page
  if (!userAutheticated) redirect('/login');

  return (
    <div className='root-layout'>
      <nav>
        <div className='flex items-center justify-between p-4 text-white'>
          <Link href='/' className='flex items-center gap-2'>
            <Image src='/logo.svg' alt='Logo' width={50} height={50} />
            <h2>Pitch Perfect AI</h2>
          </Link>
          <Link href='/login' className='' onClick={logout}>
            Logout
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
