"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./register.module.css";

const ROLE_LABELS: Record<string, string> = {
  BRAND_MANAGER: "Brand_Manager",
  COMPANY: "Company",
  AGENCY: "Agency",
};

export default function RegisterPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [role, setRole] = useState("");
  const [subType, setSubType] = useState("");
  const [ready, setReady] = useState(false); // ← add this

  useEffect(() => {
    // Small timeout lets sessionStorage writes from previous page settle
    const savedRole = sessionStorage.getItem("reg_role");
    const savedSubtype = sessionStorage.getItem("reg_subtype");

    if (!savedRole) {
      router.replace("/register-role");
      return;
    }

    setRole(savedRole);
    setSubType(savedSubtype || "");
    setReady(true); // ← only render form when we confirmed role exists
  }, []);

  // Don't render form until role is confirmed
  if (!ready) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    if (phone && phone.length < 10) {
      setErrorMsg("Enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      // Step 1 — Register
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          phone: phone || undefined,
          role, // 'brand' or 'influencer'
          subType: subType || undefined, // ← was missing! 'brand_manager' etc.
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Registration failed.");
        setLoading(false);
        return;
      }

      // Step 2 — Wait for DB write to finish then auto sign in
      await new Promise((resolve) => setTimeout(resolve, 500));

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("signIn result:", signInResult); // remove after testing

      // Step 3 — Clean up sessionStorage
      sessionStorage.removeItem("reg_role"); // ← was "selected_role" (wrong)
      sessionStorage.removeItem("reg_subtype");

      if (signInResult?.error) {
        // Register worked but auto-login failed — go to login
        router.push("/login?registered=true");
        return;
      }

      // Step 4 — Redirect based on role
      if (role === "influencer") {
        router.push("/influencer-dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.headerSection}>
        <div className={styles.logoWrapper}>
          <Image
            src="/images/threadlogo.jpg"
            alt="Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      <div className={styles.registerCard}>
        <h1 className={styles.pageTitle}>
          Register as <span>{ROLE_LABELS[role] || "..."}</span>
        </h1>

        {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

        <form className={styles.formStack} onSubmit={handleRegister}>
          <div className={styles.phoneInputGroup}>
            <div className={styles.countryCode}>
              <img
                src="https://flagcdn.com/w40/in.png"
                alt="India"
                className={styles.flag}
              />
              <span className={styles.codeText}>+91</span>
            </div>
            <div className={styles.verticalDivider} />
            <input
              type="tel"
              placeholder="Phone number (optional)"
              className={styles.inlineInput}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              maxLength={10}
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            className={styles.inputFieldFull}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (min 8 characters)"
            className={styles.inputFieldFull}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.inputFieldFull}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className={styles.registerBtn}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className={styles.loginText}>
          Already have an account?{" "}
          <Link href="/login" className={styles.loginLink}>
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}
