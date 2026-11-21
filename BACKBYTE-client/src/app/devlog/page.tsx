import type { Metadata } from 'next';
import DevlogClient from '@/components/landing/DevlogClient';

export const metadata: Metadata = {
  title: 'Devlog | System Logs — BACKBYTE',
  description:
    'Patch notes, feature updates, and developer logs for BACKBYTE — the multiplayer social deduction coding game.',
  alternates: { canonical: '/devlog' },
  openGraph: {
    title: 'BACKBYTE Devlog — System Logs',
    description:
      'Patch notes, feature updates, and developer logs for BACKBYTE.',
    type: 'website',
  },
};

export default function DevlogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://backbyte.xyz/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Devlog',
        item: 'https://backbyte.xyz/devlog',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DevlogClient />
    </>
  );
}
