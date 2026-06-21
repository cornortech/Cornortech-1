'use client';
import Logo from '@/../public/cornortech_logo.png'
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useHeaderScroll } from '@/hooks/useAnimations';
import { socialLinks } from '@/data';
import { SocialSection } from '@/types';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  bannerVisible?: boolean;
  solidBg?: boolean;
}

const Header = ({ bannerVisible = false, solidBg = false }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useHeaderScroll();
  const scrolledOrSolid = isScrolled || solidBg;
  const router = useRouter();
  // const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const navigationItems = [
    { title: 'Home', id: 'hero', type: 'scroll' },
    { title: 'Services', id: 'services', type: 'scroll' },
    { title: 'About Us', path: '/about-us', type: 'page' },
    { title: 'Our Works', id: 'our-works', type: 'scroll' },
    { title: 'Career', path: '/careers', type: 'page' },

    // {
    //   title: 'More',
    //   type: 'dropdown',
    //   children: [
    //     { title: 'Blogs', path: '/blogs' },
    //     { title: 'News & Updates', path: '/news-and-updates' },
    //   ],
    // }

  ];

  // const dropdownChildren = navigationItems
  //   .filter((item) => item.type === 'dropdown')
  // .flatMap((item: any) => item.children ?? []);

  // Non Dropdown items first three to show on mobile view 
  const nonDropdownItems = navigationItems.filter((item) => item.type !== 'dropdown').slice(0, 3);

  // For Remaining 
  const hiddenMobileNavItems = navigationItems.filter((item) => item.type !== 'dropdown').slice(3);

  const handleNavClick = (item: any) => {
    if (item.type === 'scroll') {

      //To handleNavClick from another page
      if (pathname !== '/') {
        router.push(`/#${item.id}`);
      } else {
        const element = document.getElementById(item.id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMobileMenuOpen(false);
      }

    } else if (item.type === 'page') {
      router.push(item.path);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${(scrolledOrSolid || isMobileMenuOpen)
        ? 'top-0 bg-white shadow-soft border-b border-gray-200'
        : `${bannerVisible ? 'top-10' : 'top-0'} bg-transparent border-b border-transparent`
        }`}
    >
      <nav className="container-custom">

        {/* ═══ MAIN BAR ═══ */}
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div
            onClick={() => router.push('/')}
            className="shrink-0 cursor-pointer"
          >
            <Image src={Logo} alt="Cornor Tech" height={70} width={50} />
          </div>
          {/* End Logo */}


          {/* Desktop Nav Dropdown */}

          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-8 items-center">
            {navigationItems.map((item) =>

            // Dropdown navItem
            
            // item.type === 'dropdown' ? (
            //   <div
            //     key={item.title}
            //     className="relative"
            //     onMouseEnter={() => {
            //       if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
            //       setOpenDropdown(item.title);
            //     }}
            //     onMouseLeave={() => {
            //       dropdownTimer.current = setTimeout(() => setOpenDropdown(null), 100);
            //     }}
            //   >
            //     {/* More Button */}
            //     <button
            //       className={`cursor-pointer flex items-center gap-1 transition-colors font-medium text-sm ${isScrolled ? 'text-foreground hover:text-[#9333EA]' : 'text-white hover:text-purple-300'
            //         }`}
            //     >
            //       {item.title}
            //       <svg
            //         className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === item.title ? 'rotate-180' : ''}`}
            //         fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            //       >
            //         <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            //       </svg>
            //     </button>

            //     {/* End More Button */}


            //     {/* Dropdown Open */}
            //     {openDropdown === item.title && (
            //       <div
            //         className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
            //         onMouseEnter={() => { if (dropdownTimer.current) clearTimeout(dropdownTimer.current); }}
            //         onMouseLeave={() => { dropdownTimer.current = setTimeout(() => setOpenDropdown(null), 100); }}
            //       >
            //         {item.children?.map((child: any) => (
            //           <button
            //             key={child.title}
            //             onClick={() => { router.push(child.path); setOpenDropdown(null); }}
            //             className="cursor-pointer w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-[#9333EA] transition-colors"
            //           >
            //             {child.title}
            //           </button>
            //         ))}
            //       </div>
            //     )}
            //     {/* End Dropdown Open */}


            //   </div>
            // ) : 

            (
              // Non-Dropdown navItem
              <button
                key={item.title}
                onClick={() => handleNavClick(item)}
                className={`cursor-pointer transition-colors font-medium text-sm ${scrolledOrSolid ? 'text-foreground hover:text-[#9333EA]' : 'text-white hover:text-purple-300'
                  }`}
              >
                {item.title}
              </button>
            )
            )}
          </div>
          {/* End Desktop Nav Dropdown */}


          {/* NavItems Mobile Nav*/}
          {!isMobileMenuOpen && (
            <div className="md:hidden flex-1 flex items-center overflow-x-auto scrollbar-none px-1">
              <div className="flex items-center gap-3 mx-auto">
                {nonDropdownItems.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleNavClick(item)}
                    className={`cursor-pointer shrink-0 px-2.5 py-1 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors ${scrolledOrSolid
                      ? 'text-gray-700 hover:text-[#9333EA] hover:bg-purple-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* End NavItems Mobile Nav*/}


          {/* Right: desktop social + hamburger Button*/}
          <div className="flex items-center gap-1 shrink-0">
            <div className="hidden md:flex items-center gap-0.5">
              {socialLinks.map((social: SocialSection) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg hover:scale-110 transition-all duration-200 ${scrolledOrSolid ? 'text-[#111827] hover:bg-[#111827]/5' : 'text-white hover:bg-white/10'
                    }`}
                  aria-label={social.name}
                  title={social.name}
                >
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>

            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${(scrolledOrSolid || isMobileMenuOpen) ? 'hover:bg-[#111827]/5' : 'hover:bg-white/10'
                }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 w-full rounded-full transition-all duration-300 ${(scrolledOrSolid || isMobileMenuOpen) ? 'bg-foreground' : 'bg-white'
                  } ${isMobileMenuOpen ? 'rotate-45 translate-y-1.75' : ''}`} />
                <span className={`block h-0.5 w-full rounded-full transition-all duration-300 ${(scrolledOrSolid || isMobileMenuOpen) ? 'bg-foreground' : 'bg-white'
                  } ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`block h-0.5 w-full rounded-full transition-all duration-300 ${(scrolledOrSolid || isMobileMenuOpen) ? 'bg-foreground' : 'bg-white'
                  } ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.25' : ''}`} />
              </div>
            </button>
          </div>
          {/* End Right: desktop social + hamburger Button*/}


        </div>
        {/* ═══ End MAIN BAR ═══ */}


        {/* ═══ MOBILE HAMBURGER MENU ═══ */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="pb-4">

            {/* Hidden Nav items - Our works, Career */}
            {hiddenMobileNavItems.map((item) => (
              <div key={item.title}
                className='border-b border-gray-100'
              >
                <button
                  onClick={() => handleNavClick(item)}
                  className='w-full text-left px-4 py-3.5 text-sm font-medium text-foreground hover:bg-gray-50 hover:text-[#9333EA] transition-colors'
                >
                  {item.title}
                </button>
              </div>
            ))}

            {/* Dropdown Children - Blogs, News & Updates */}
            <>
            {/* {dropdownChildren.length > 0 && (
              <div className="px-4 pt-3 pb-1">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">More</span>
              </div>
            )} */}

            {/* 
            {dropdownChildren.map((child: any) => (
              <div key={child.title} className="border-b border-gray-100">
                <button
                  onClick={() => { router.push(child.path); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-3.5 text-sm font-medium text-foreground hover:bg-gray-50 hover:text-[#9333EA] transition-colors"
                >
                  {child.title}
                </button>
              </div>
            ))} */}
            </>

            {/* Social Links  */}
            <div className="flex items-center gap-2 px-4 pt-4">
              <span className="text-xs text-[#111827]/40 font-medium mr-1">Follow us</span>
              {socialLinks.map((social: SocialSection) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#111827]/50 hover:text-[#111827] hover:bg-[#111827]/5 transition-all duration-200"
                  aria-label={social.name}
                  title={social.name}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
            {/* End Social Links  */}


          </div>
        </div>
        {/* ═══ End MOBILE HAMBURGER MENU ═══ */}

      </nav>
    </header>
  );
};

export default Header;