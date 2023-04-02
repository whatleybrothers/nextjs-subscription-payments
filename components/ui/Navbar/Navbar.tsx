import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import Logo from '@/components/icons/Logo';
import { useUser } from '@/utils/useUser';

import s from './Navbar.module.css';

const Navbar = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user, setAuthType } = useUser();

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/" className={s.logo} aria-label="Logo">
              <Logo />
            </Link>
            <nav className="space-x-2 ml-6 hidden lg:block">
              { !user &&
                <Link href="/pricing" className={s.link}>
                  Pricing
                </Link>
              }

              {user &&
                <Link href="/dashboard" className={s.link}>
                  Dashboard
                </Link>
              }

              {/*<Link href="/account" className={s.link}>*/}
              {/*  Account*/}
              {/*</Link>*/}
              <Link href="/contact" className={s.link}>
                Contact
              </Link>
              <Link href="/faqs" className={s.link}>
                FAQs
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 justify-end space-x-8">
            {user ? (
              <>
                <span className="user-name-container">{user.email}</span>
                <span
                  className={s.link}
                  onClick={async () => {
                    await supabaseClient.auth.signOut();
                    router.push('/signin');
                  }}
                >
                  Sign out
                </span>
              </>
            ) : (
              <>
                <Link href="/signin" className={s.link} onClick={() => {
                  setAuthType('sign_in')
                }}>
                  Login
                </Link>
                <Link href="/signin" className={s.link} onClick={() => {
                  setAuthType('sign_up')
                }}>
                  Register
                </Link>
              </>

            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
