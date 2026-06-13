import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/shared/Footer";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import CTASection from "../components/landing/CTASection";
import { useAuthStore } from "../store/authStore";
import { getPostAuthPath } from "../utils/authRedirect";

export default function LandingPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const membership = useAuthStore((s) => s.membership);
  const isHydrated = useAuthStore((s) => s.isHydrated);

  // Redirect authenticated users to their dashboard
  useEffect(() => {
    if (isHydrated && user) {
      const target = getPostAuthPath(user, membership);
      if (target !== "/") {
        navigate(target, { replace: true });
      }
    }
  }, [isHydrated, user, membership, navigate]);

  return (
    <div className="flex-1 bg-white flex flex-col min-h-0">

      <main className="flex-1">
        <HeroSection onNavigate={navigate} />
        <FeaturesSection />
        <CTASection onNavigate={navigate} />
      </main>

      <Footer />
    </div>
  );
}
