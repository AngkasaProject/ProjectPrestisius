import BrandLogo from "./BrandLogo";
import FeaturesDropdown from "./FeaturesDropdown";

type DesktopNavProps = {
  isLoggedIn: boolean;
  featuresOpen: boolean;
  setFeaturesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  featuresRef: React.RefObject<HTMLDivElement | null>;
};

export default function DesktopNav({
  isLoggedIn,
  featuresOpen,
  setFeaturesOpen,
  featuresRef,
}: DesktopNavProps) {
  return (
    <div className="hidden h-16 items-center px-5 lg:px-7 md:grid md:grid-cols-[1fr_auto_1fr]">
      {/* LEFT */}

      <div className="justify-self-start">
        <BrandLogo />
      </div>

      {/* CENTER */}

      <nav className="flex items-center gap-2 justify-self-center">
        <FeaturesDropdown
          featuresOpen={featuresOpen}
          setFeaturesOpen={setFeaturesOpen}
          featuresRef={featuresRef}
        />

        <a
          href="/about"
          className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          About
        </a>

        <a
          href="/contact"
          className="rounded-full px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
        >
          Contact
        </a>
      </nav>

      {/* RIGHT */}

      <div className="flex justify-self-end">
        {isLoggedIn ? (
          <a
            href="/admin"
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-lime-500 hover:text-zinc-900"
          >
            Dashboard
          </a>
        ) : (
          <div className="flex items-center gap-2">
            <a
              href="/login"
              className="rounded-full px-5 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              Login
            </a>

            <a
              href="/register"
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-lime-500 hover:text-zinc-900"
            >
              Register
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
