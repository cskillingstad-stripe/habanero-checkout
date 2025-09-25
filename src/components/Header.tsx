import Link from 'next/link';
import GalteeIcon from '@/icons/GalteeIcon';
import {
  IconSearch,
  IconUser,
  IconShoppingCart,
  IconMenu2,
} from '@tabler/icons-react';

export default function Header() {
  return (
    <header className="bg-[#F1F2E0] py-4 px-8">
      <nav className="max-w-[1400px] mx-auto grid grid-cols-3 items-center">
        {/* Left navigation */}
        <div>
          {/* Mobile menu button */}
          <button className="lg:hidden text-gray-800 hover:text-gray-600">
            <IconMenu2 size={24} stroke={1.5} />
          </button>

          {/* Desktop navigation */}
          <ul className="hidden lg:flex space-x-8">
            <li>
              <Link href="#" className="text-gray-800 hover:text-gray-600">
                Women&apos;s
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-800 hover:text-gray-600">
                Men&apos;s
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-800 hover:text-gray-600">
                Kids&apos;
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-800 hover:text-gray-600">
                Packs & Gear
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <GalteeIcon />
        </div>

        {/* Right utility icons */}
        <ul className="flex items-center space-x-6 justify-end">
          <li className="hidden lg:block">
            <Link href="#" className="text-gray-800 hover:text-gray-600">
              <IconSearch size={24} stroke={1.5} />
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-800 hover:text-gray-600">
              <IconUser size={24} stroke={1.5} />
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-800 hover:text-gray-600">
              <IconShoppingCart size={24} stroke={1.5} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
