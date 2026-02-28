import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              MUHAMMAD
              <br />
              <span>TAHIR RAMZAN</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Creative</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">SHOPIFY DEVELOPER</div>
              <div className="landing-h2-2">GRAPHIC DESIGNER</div>
              <div className="landing-h2-3">SEARCH ENGINE OPTIMIZATION</div>
              <div className="landing-h2-4">FRONTEND DEVELOPER</div>
              <div className="landing-h2-5">TIKTOK SHOP</div>
              <div className="landing-h2-6">E-COMMERCE</div>
              <div className="landing-h2-7">WORDPRESS</div>
            </h2>
            <h2>
              <div className="landing-h2-info">SHOPIFY DEVELOPER</div>
              <div className="landing-h2-info-1">GRAPHIC DESIGNER</div>
              <div className="landing-h2-info-2">SEARCH ENGINE OPTIMIZATION</div>
              <div className="landing-h2-info-3">FRONTEND DEVELOPER</div>
              <div className="landing-h2-info-4">TIKTOK SHOP</div>
              <div className="landing-h2-info-5">E-COMMERCE</div>
              <div className="landing-h2-info-6">WORDPRESS</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
