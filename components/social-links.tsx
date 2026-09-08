import React from "react";

export interface SocialLinkItem {
  name: string;
  href: string;
  ariaLabel: string;
  icon: (props: { className?: string }) => React.JSX.Element;
  hoverClasses: string;
}

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.74 1.49-.03 2.74-.95 3.16-2.37.18-.58.21-1.2.21-1.81V.02h-.01z" />
    </svg>
  );
}

export const socialLinks: SocialLinkItem[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/bonusly.cz/",
    ariaLabel: "Sledujte BONUSLY na Instagramu",
    icon: InstagramIcon,
    hoverClasses: "hover:text-pink-400 hover:border-pink-500/30 hover:bg-pink-500/10",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@bonusly.cz",
    ariaLabel: "Sledujte BONUSLY na TikToku",
    icon: TikTokIcon,
    hoverClasses: "hover:text-cyan-300 hover:border-cyan-400/30 hover:bg-cyan-400/10",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Bonuslycz/61594429642518/",
    ariaLabel: "Sledujte BONUSLY na Facebooku",
    icon: FacebookIcon,
    hoverClasses: "hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/10",
  },
];

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
  variant?: "dark" | "light" | "minimal";
}

export function SocialLinks({
  className = "",
  iconClassName = "w-4 h-4",
  variant = "dark",
}: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {socialLinks.map((item) => {
        const Icon = item.icon;
        if (variant === "minimal") {
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <Icon className={iconClassName} />
            </a>
          );
        }

        const isLight = variant === "light";
        const baseClasses = isLight
          ? "w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200/80 shadow-sm"
          : "w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-slate-400";

        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel}
            className={`flex items-center justify-center transition-all duration-200 ${baseClasses} ${item.hoverClasses}`}
          >
            <Icon className={iconClassName} />
          </a>
        );
      })}
    </div>
  );
}
