import Link from 'next/link';
import { useRouter } from 'next/router';

import { HomeIcon, AdjustmentsHorizontalIcon} from '@heroicons/react/24/solid'
import { PropsWithChildren } from 'react';


export default function LayoutWithLeftSidebar({ children }: PropsWithChildren) {
  const router = useRouter();

  const menuItems = [
    {
      href: '/dashboard',
      title: 'Dashboard',
      icon: <HomeIcon className="w-5"/>,
    },
    {
      href: '/settings/general',
      title: 'Settings',
      icon: <AdjustmentsHorizontalIcon className="w-6"/>
    },
  ];

  const pathNamesWithoutSidebar = ['/', '/about', '/signin', '/pricing', '/contact', '/faqs']
  if (pathNamesWithoutSidebar.includes(router.asPath)) {
    return <>{children}</>
  }

  return (
    <div className='min-h-screen flex flex-col bg-black'>
      <div className='flex flex-col md:flex-row flex-1'>
        <aside className='bg-black w-full md:w-60 overflow-y-auto'>
          <nav>
            <ul>
              {menuItems.map(({ href, title, icon }) => (
                <li className='' key={title}>
                  <Link href={href}>
                      <div className={"pl-3"}>{icon}</div>
                      <div className={"pl-2"}>{title}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}