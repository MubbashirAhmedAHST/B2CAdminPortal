"use client";
import NextTopLoader from "nextjs-toploader";
import { useState, useEffect, useTransition } from "react";
import { usePathname } from "next/navigation";

export default function EnhancedLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [isPending] = useTransition(); // Detects ongoing navigation

  useEffect(() => {
    setLoading(true); // Show loader immediately
    const timeout = setTimeout(() => setLoading(false), 800); // Hide after some time
    return () => clearTimeout(timeout);
  }, [pathname, isPending]);

  return (
    <>
      {/* Top Progress Bar */}
      <NextTopLoader
        color="#cf132a"
        initialPosition={0.1}
        crawlSpeed={200}
        height={5}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 15px rgba(207, 19, 42, 0.6), 0 0 10px rgba(207, 19, 42, 0.4)"
        template='<div class="bar" role="bar"><div class="peg"></div></div> 
          <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={2000}
        showAtBottom={false}
      />

      {/* Centered Spinner (Custom) */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="animate-spin h-16 w-16 border-4 border-red-600 border-t-transparent rounded-full"></div>
        </div>
      )}
    </>
  );
}
