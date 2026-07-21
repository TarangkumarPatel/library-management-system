import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function RouteProgress() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const start = () => {
      clearInterval(timerRef.current);
      setVisible(true);
      setProgress(20);
      timerRef.current = setInterval(() => {
        setProgress((p) => (p < 85 ? p + Math.random() * 10 : p));
      }, 200);
    };

    const done = () => {
      clearInterval(timerRef.current);
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);

    return () => {
      clearInterval(timerRef.current);
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, [router]);

  return (
    <div
      className={`route-progress ${visible ? "is-visible" : ""}`}
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
