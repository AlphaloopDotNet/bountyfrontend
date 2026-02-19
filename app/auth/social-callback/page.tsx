'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SocialCallback() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const email = params.get("email");
    const name = params.get("name");
    const provider = params.get("provider");

    if (email) {
      // Save in localStorage
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", name || "");
      localStorage.setItem("provider", provider || "google");

      // Redirect to dashboard
      router.replace("/dashboard");
    }
  }, [params, router]);

  return <h2>Logging you in...</h2>;
}
