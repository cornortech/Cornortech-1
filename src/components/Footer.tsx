import { footerSections } from '@/data';
import { FooterSection } from '@/types';
import { legalLinks } from '@/data';
import { LegalLinks } from '@/types';
import Logo from '@/../public/cornortech_logo.png'
import Image from 'next/image';

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#faf8ff] border-t border-[#9333EA]/10">
      
      <div className="container-custom">
        <div className="py-16 space-y-12">

          {/* Newsletter Section */}
          <div className="bg-linear-to-br from-[#111827] to-[#1f2937] rounded-3xl p-8 lg:p-12 shadow-large">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-white">
                <h3 className="text-2xl lg:text-3xl font-bold">
                  Stay Updated with Cornor Tech
                </h3>
                <p className="text-white/90">
                  Subscribe to our newsletter for the latest courses, tech insights, and exclusive offers.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
                <button className="px-8 py-4 bg-white text-[#111827] rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-medium whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
           {/* End Newsletter Section */}

          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-linear-to-br from-[#111827] to-[#1f2937] rounded-xl flex items-center justify-center shadow-medium">
                  <Image src={Logo} alt='CT' height={35} width={35}/>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111827]">Cornor Tech <br/> Pvt. Ltd</h3>
                  <div className="flex flex-col text-[10px] font-bold text-foreground-secondary/60 mt-0.5 leading-tight uppercase tracking-wider">
                    <span>Reg No. 366203/81/82</span>
                    <span>PAN No. 622355199</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground-secondary">
                Where tech meets solution ! Empowering individuals and businesses with cutting-edge digital solutions.
              </p>
              <div className="flex items-center space-x-2 text-sm text-[#111827]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@cornortech.com" className="hover:text-[#1f2937] transition-colors">
                  info@cornortech.com
                </a>
              </div>
            </div>

            {/* ===== Footer Sections ===== */}
            {footerSections.map((section: FooterSection) => (
              <div key={section.title} className="space-y-4">
                <h4 className="font-semibold text-[#111827] text-sm uppercase tracking-wider">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a 
                        href={link.link}
                        className="text-sm text-foreground-secondary hover:text-[#111827] transition-colors inline-flex items-center group"
                      >
                        <svg className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-[#111827]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* ===== End Footer Sections ===== */}

          </div>
          {/* End Main Footer Content */}

          {/* Bottom Section */}
          <div className="pt-8 border-t border-[#111827]/10">

            {/* ===== Legal Links ===== */}
            <div className="flex flex-wrap justify-center items-center gap-y-3 mb-6">
              {legalLinks.map((link: LegalLinks, index) => (
                <span key={link.title} className="flex items-center">
                  <a
                    href={link.href}
                    className="text-sm sm:text-sm text-foreground-secondary hover:text-[#111827] transition-colors duration-200 px-1"
                  >
                    {link.title}
                  </a>
                  {index < legalLinks.length - 1 && (
                    <span className="mx-1.5 sm:mx-2.5 text-[#111827]/20 text-sm select-none">·</span>
                  )}
                </span>
              ))}
            </div>
            {/* ===== End Legal Links ===== */}

            {/* ===== Copyright and Additional Info =====*/}
            <p className="text-center text-sm text-foreground-secondary/60">
              © {currentYear}{' '}
              <span className="text-foreground-secondary font-medium">Cornor Tech Pvt Ltd</span>
              {' '}· All rights reserved
            </p>
            {/* ===== End Copyright and Additional Info =====*/}

          </div>
          {/* End Bottom Section */}

        </div>
      </div>

    </footer>
  );
};

export default Footer;