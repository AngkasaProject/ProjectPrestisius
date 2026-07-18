import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Menu } from "lucide-react";

import BrandLogo from "./BrandLogo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [legalOpen, setLegalOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  const featuresRef = useRef<HTMLDivElement>(null);

  // TODO: Supabase Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setIsLoggedIn(!!session);
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        featuresRef.current &&
        !featuresRef.current.contains(event.target as Node)
      ) {
        setFeaturesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed left-1/2 top-5 z-50 w-[calc(100%-24px)] max-w-6xl -translate-x-1/2 transition-all duration-300 ${
          scrolled
            ? "rounded-full border border-zinc-200/70 bg-white/85 shadow-xl backdrop-blur-xl"
            : "rounded-full border border-transparent bg-white/65 backdrop-blur-lg"
        }`}
      >
        {/* Desktop */}

        <DesktopNav
          isLoggedIn={isLoggedIn}
          featuresOpen={featuresOpen}
          setFeaturesOpen={setFeaturesOpen}
          featuresRef={featuresRef}
        />

        {/* Mobile Header */}

        <div className="flex h-16 items-center justify-between px-5 md:hidden">
          <BrandLogo />

          <button
            onClick={() => setOpen(true)}
            className="rounded-full p-2 transition hover:bg-zinc-100"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}

      <MobileNav
        open={open}
        setOpen={setOpen}
        isLoggedIn={isLoggedIn}
        featuresOpen={featuresOpen}
        setFeaturesOpen={setFeaturesOpen}
        legalOpen={legalOpen}
        setLegalOpen={setLegalOpen}
      />
    </>
  );
}
