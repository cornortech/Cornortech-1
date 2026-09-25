export interface BannerProps{
  visible:boolean;
  setVisible:React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HeroProps{
  bannerVisible:boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface NavigationItem {
  title: string;
  // scrollId:string;
  link?: string;
  children?: NavigationItem[];
}

// ===== Footer Section =====
export interface FooterSection {
  title: string;
  links: { title: string; link: string }[];
}

export interface SocialSection {
  name: string;
  icon: string;
  href: string;
};

export interface LegalLinks {
  title: string;
  href: string;
}
// ===== End Footer Section =====
