'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerColumns = [
    {
      title: 'Trade',
      links: [
        { label: 'Accounts', href: '#' },
        { label: 'Partners', href: '#' },
        { label: 'Account Funding and Withdrawal', href: '#' },
        { label: 'Fees and Charges', href: '#' },
      ],
    },
    {
      title: 'Products',
      links: [
        { label: 'Forex', href: '#' },
        { label: 'Commodities', href: '#' },
        { label: 'Indices', href: '#' },
        { label: 'Stocks', href: '#' },
        { label: 'ETFs', href: '#' },
        { label: 'Crypto', href: '#' },
      ],
    },
    {
      title: 'Platforms',
      links: [
        { label: 'MetaTrader 5', href: '#' },
      ],
    },
    {
      title: 'News',
      links: [
        { label: 'Economic Calendar', href: '#' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Explore Skyriss', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Legal', href: '#' },
      ],
    },
    {
      title: 'Learn',
      links: [
        { label: 'Guides', href: '#' },
        { label: 'Glossary', href: '#' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'Support', href: '#' },
        { label: 'Contact Us', href: '#' },
      ],
    },
  ];

  return (
    <footer className=" py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <div className="mb-12">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 relative mr-2">
                <div className="absolute inset-0 rounded-full border-4 border-black"></div>
                <div className="absolute inset-2 rounded-full border-2 border-black"></div>
              </div>
              <span className="text-2xl font-bold">skyriss</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 mb-12">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-medium text-black mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-600 hover:text-black text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mb-12">
          <Link href="#" className="text-black hover:text-gray-600">
            <Facebook size={20} />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="text-black hover:text-gray-600">
            <Instagram size={20} />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="text-black hover:text-gray-600">
            <Twitter size={20} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-black hover:text-gray-600">
            <Linkedin size={20} />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="#" className="text-black hover:text-gray-600">
            <Youtube size={20} />
            <span className="sr-only">YouTube</span>
          </Link>
        </div>

        {/* Legal Text */}
        <div className="space-y-4 text-xs text-gray-600">
          <p>
            Skyriss Securities Ltd has its registered office on the Ground Floor, The Southbay Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia. Its Registration Number is 2025-0014. Skyriss Securities is registered as an International Business Company (IBC) under the International Business Companies Act of Saint Lucia, with Registration Number 2025-0014. Email: <a href="mailto:info@skyriss.com" className="text-blue-600 hover:underline">info@skyriss.com</a>
          </p>
          <p>
            Trading in Foreign Exchange (Forex, FX) and Contracts for Difference (CFDs) on currencies, commodities, indices, and equities carries a high level of risk and may not be suitable for all investors. These financial instruments are margin-traded, meaning they involve leverage, which can amplify both gains and losses. As a result, investors may lose more than their initial deposit, and market conditions can lead to rapid changes in account balances. Before deciding to trade with Skyriss Securities LTD, you should conduct a thorough assessment of your investment objectives, financial condition, level of experience, and risk tolerance. It is crucial to understand that trading leveraged products entails substantial risks, including the possibility of losing the entire invested capital. You should only engage in trading if you fully comprehend the mechanics of margin trading, the concept of price volatility, and the potential for financial loss.
          </p>
          <p>
            We strongly recommend that you seek independent financial or professional advice if you are uncertain about the suitability of these trading activities for your circumstances. You should not trade any leveraged product unless you are fully prepared to accept the associated risks. For further details on trading risks, please refer to our <Link href="#" className="text-blue-600 hover:underline">Risk Disclosure Notice</Link>.
          </p>
          <p>
            Our services are not available in the following regions: Canada, China, East Timor, Falkland Islands, Guam, Hong Kong, Iran, Iraq, Japan, Libya, Liechtenstein, Mali, Nauru, New Zealand, North Korea, Puerto Rico, Russia, South Korea, South Sudan, Sudan, Syria, Ukraine, the United States of America, the U.S. Virgin Islands, and Yemen.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-start md:items-center">
          <p className="text-sm text-gray-600">© Skyriss Securities. All Rights Reserved {currentYear}</p>
        </div>
        
        
      </div>
    </footer>
  );
}