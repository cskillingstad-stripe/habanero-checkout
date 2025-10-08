'use client';

import { IconCheck } from '@tabler/icons-react';
import Link from 'next/link';

export default function Complete() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-12">
      <IconCheck size={100} />
      <h1 className="text-2xl font-bold">Order successful!</h1>
      <Link className="text-blue-500 underline" href="/">
        Back to home
      </Link>
    </div>
  );
}
