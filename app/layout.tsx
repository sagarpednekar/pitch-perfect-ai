import type { Metadata } from 'next';
import { Mona_Sans } from 'next/font/google';
import './globals.css';

const monaSans = Mona_Sans({
  variable: '--font-mona-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pitch Perfect AI',
  description: 'An AI-powered tool for preparing for mock interviews',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('Rendering RootLayout');
  console.log(
    'One more log statement to ensure the layout is working correctly'
  );

  return (
    <html lang='en' className='dark'>
      <body className={`${monaSans.variable}  antialiased`}>{children}</body>
    </html>
  );
}
