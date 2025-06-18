import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const headerRef = useRef<HTMLElement | null>(null); // ✅ Type added here
  const [isAtTop, setIsAtTop] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      console.log("Header", header);
      if (!header) return;

      const currentScrollPos = window.pageYOffset;
      console.log("CurrentPosition", currentScrollPos);

      if (currentScrollPos <= 5) {
        header.style.transform = "translateY(0)";
        header.style.opacity = "1";
        setIsAtTop(true);
        return;
      }

      setIsAtTop(false);

      if (prevScrollPos > currentScrollPos) {
        header.style.transform = "translateY(0)";
        header.style.opacity = "1";
      } else {
        header.style.transform = "translateY(-100%)";
        header.style.opacity = "0";
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <header
        ref={headerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: isAtTop ? "transparent" : "#ffffff",
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isAtTop ? "none" : "0 2px 10px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          zIndex: 1000,
        }}
      >
        <h1>My Header</h1>
      </header>

      <main style={{ marginTop: "70px", padding: "20px" }}>
        <p style={{ height: "2000px" }}>
          Scroll up and down to test the header visibility behavior. This is
          just dummy content.
        </p>
      </main>
    </>
  );
}
