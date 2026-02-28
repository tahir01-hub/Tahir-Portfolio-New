import { SplitText } from "gsap-trial/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  let TextProps = { type: "chars,lines", linesClass: "split-h2" };

  var landingText2 = new SplitText(".landing-h2-info", TextProps);
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Group 1: .landing-h2-info series
  const group1Selectors = [
    landingText2, // .landing-h2-info (created above)
    new SplitText(".landing-h2-info-1", TextProps),
    new SplitText(".landing-h2-info-2", TextProps),
    new SplitText(".landing-h2-info-3", TextProps),
    new SplitText(".landing-h2-info-4", TextProps),
    new SplitText(".landing-h2-info-5", TextProps),
    new SplitText(".landing-h2-info-6", TextProps),
  ];

  // Group 2: .landing-h2-1 series
  const group2Selectors = [
    new SplitText(".landing-h2-1", TextProps), // Initially visible via CSS layout/default? No, needs animation?
    new SplitText(".landing-h2-2", TextProps),
    new SplitText(".landing-h2-3", TextProps),
    new SplitText(".landing-h2-4", TextProps),
    new SplitText(".landing-h2-5", TextProps),
    new SplitText(".landing-h2-6", TextProps),
    new SplitText(".landing-h2-7", TextProps),
  ];

  LoopText(group1Selectors);
  LoopText(group2Selectors);
}

function LoopText(texts: SplitText[]) {
  const tl = gsap.timeline({ repeat: -1 });
  const delay = 3;
  const duration = 1.2;

  texts.forEach((text, i) => {
    const nextText = texts[(i + 1) % texts.length];

    tl.to(
      text.chars,
      {
        y: -80,
        opacity: 0,
        duration: duration,
        ease: "power3.inOut",
        stagger: 0.05,
      },
      `+=${delay}`
    );

    tl.fromTo(
      nextText.chars,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        ease: "power3.inOut",
        stagger: 0.05,
      },
      "<"
    );
  });
}
