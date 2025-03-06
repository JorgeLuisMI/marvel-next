'use client';

import React from 'react';
import { useParams } from 'next/navigation';

export default function Main({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const id = params.id as string;
  const isDetailsPage = id !== undefined;

  const mainClassNames = isDetailsPage
    ? 'font-[family-name:var(--font-geist-sans)]'
    : 'py-6 px-4 sm:py-10 sm:px-8 lg:py-14 lg:px-12 font-[family-name:var(--font-geist-sans)]';

  return <main className={mainClassNames}>{children}</main>;
}
