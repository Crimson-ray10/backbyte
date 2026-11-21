import type { Metadata } from 'next';
import AboutPageClient from '@/components/landing/AboutPageClient';

export const metadata: Metadata = {
  title: 'About — BACKBYTE | Multiplayer Coding Game',
  description: 'The story behind BACKBYTE — a multiplayer social deduction coding game built by a student developer who wanted a better way to practice coding together.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About BACKBYTE',
    description: 'The story behind BACKBYTE — built by student developers who were tired of LeetCode and wanted a better way to code together.',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
