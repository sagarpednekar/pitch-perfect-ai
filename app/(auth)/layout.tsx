import { isAuthenticated } from '@/features/auth/actions';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const userAutheticated = await isAuthenticated();
  // If the user is not authenticated, redirect to the login page
  if (userAutheticated) redirect('/');
  return <div className='auth-layout'>{children}</div>;
}
