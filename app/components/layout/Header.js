'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/over-mij', label: 'Over Mij' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <header className="bg-[#111111] text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-dm-serif text-white hover:text-gray-300 transition-colors">
            marostudios.
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative group"
            >
              <span className="font-inter font-bold text-white px-4 py-2 rounded-full transition-all duration-300 group-hover:bg-white group-hover:text-[#111111]">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-white hover:text-gray-300 p-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
