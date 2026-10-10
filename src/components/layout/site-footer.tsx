import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-main">
        <Link href="/" className="brand footer-brand" aria-label="বাজার দর হোম">
          <Image
            src="/images/logo-icon.png"
            alt=""
            width={39}
            height={39}
            className="brand-icon"
          />
          <span className="brand-copy">
            <span className="brand-name">বাজার দর</span>
            <span className="brand-tagline">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </span>
          </span>
        </Link>

        <p>
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>

        <Link href="/#সব-পণ্য" className="footer-link">
          সব পণ্য <ArrowRight size={15} />
        </Link>
      </div>

      <div className="site-container footer-bottom">
        <span>© {new Date().getFullYear()} বাজার দর</span>
        <span>বাংলাদেশের নিত্যদিনের বাজার সহকারী</span>
      </div>
    </footer>
  );
}
