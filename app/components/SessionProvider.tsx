'use client';
import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
}

const Providers = (props: Props) => {
  return <SessionProvider>{props.children}</SessionProvider>
}

export default Providers;