'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="min-h-11 min-w-11 rounded-full bg-white/70 px-3 py-2 text-sm hover:bg-white transition-colors"
    >
      ← Back
    </button>
  );
}
