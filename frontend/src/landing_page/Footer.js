import React from "react";
function Footer() {
  return (
    <footer className="finovate-footer">
      <div className="container py-5">
        {/* Top links row */}
        <div className="row g-4 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="col-12 col-md-4">
            <a className="d-flex align-items-center text-decoration-none mb-3 footer-brand" href="/">
              <img
                src="media/images/coins-solid.svg"
                alt="Finovate logo"
                className="img-fluid"
                style={{ height: 24, width: 24, filter: "brightness(0) invert(1)" }}
              />
              <span className="ms-2 fs-5">Finovate</span>
            </a>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
              &copy; 2010–2025, Finovate Broking Ltd.<br />All rights reserved.
            </p>
          </div>
          <div className="col-6 col-md-2">
            <p className="footer-col-head">Company</p>
            <a className="footer-top-links" href="/about">About</a>
            <a className="footer-top-links" href="/product">Products</a>
            <a className="footer-top-links" href="/pricing">Pricing</a>
            <a className="footer-top-links" href="/pricing">Referral programme</a>
            <a className="footer-top-links" href="/about">Careers</a>
            <a className="footer-top-links" href="/product">Finovate.tech</a>
            <a className="footer-top-links" href="/about">Press &amp; media</a>
          </div>
          <div className="col-6 col-md-3">
            <p className="footer-col-head">Support</p>
            <a className="footer-top-links" href="/support">Contact us</a>
            <a className="footer-top-links" href="/support">Z-Connect blog</a>
            <a className="footer-top-links" href="/pricing">List of charges</a>
            <a className="footer-top-links" href="/support">Downloads &amp; resources</a>
            <a className="footer-top-links" href="/support">Market overview</a>
            <a className="footer-top-links" href="/support">How to file a complaint?</a>
          </div>
          <div className="col-12 col-md-3">
            <p className="footer-col-head">Account</p>
            <a className="footer-top-links" href="/signup">Open an account</a>
            <a className="footer-top-links" href="/support">Fund transfer</a>
          </div>
        </div>

        {/* Legal */}
        <div className="pt-4" style={{ fontSize: "11px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7 }}>
          <p>
            Finovate Broking Ltd.: Member of NSE, BSE &amp; MCX – SEBI Reg. no.: INZ000031633. CDSL/NSDL: IN-DP-431-2019. Commodity Trading through Finovate Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – INZ000038238. Registered Address: Finovate Broking Ltd., #153/154, 4th Cross, Dollars Colony, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. Complaints: <a href="mailto:complaints@finovate.com" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>complaints@finovate.com</a>
          </p>
          <p>
            Investments in securities market are subject to market risks; read all the related documents carefully before investing.
          </p>
          <div className="d-flex flex-wrap gap-3 mt-3 mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>
            <a href="https://www.nseindia.com" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>NSE</a>
            <a href="https://www.bseindia.com" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>BSE</a>
            <a href="https://www.mcxindia.com" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>MCX</a>
            <span>•</span>
            <a href="/support" style={{ color: "inherit", textDecoration: "none" }}>Terms &amp; conditions</a>
            <a href="/support" style={{ color: "inherit", textDecoration: "none" }}>Privacy policy</a>
            <a href="/support" style={{ color: "inherit", textDecoration: "none" }}>Investor charter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
