import React from "react";
function Footer() {
  return (
    <footer className="bg-light border-top py-4 py-md-5">
      <div className="container py-4 py-md-5">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <a className="navbar-brand fs-4 link-primary d-flex align-items-center" href="/">
              <img
                src="media/images/coins-solid.svg"
                alt="logo"
                className="img-fluid"
                style={{ height: 24, width: 24 }}
              />
              <span className="ms-2">𝙁𝙞𝙣𝙤𝙫𝙖𝙩𝙚</span>
            </a>
            <p className="mt-3 mb-0">
              &copy; 2010 - 2025, Finovate Broking Ltd. All rights reserved.
            </p>
          </div>
          <div className="col-6 col-md-2">
            <p className="fs-6 fw-semibold">Company</p>
            <a className="footer-top-links d-block" href="/about">About</a>
            <a className="footer-top-links d-block" href="/product">Products</a>
            <a className="footer-top-links d-block" href="/pricing">Pricing</a>
            <a className="footer-top-links d-block" href="/pricing">Referral programme</a>
            <a className="footer-top-links d-block" href="/about">Careers</a>
            <a className="footer-top-links d-block" href="/product">Finovate.tech</a>
            <a className="footer-top-links d-block" href="/product">Open source</a>
            <a className="footer-top-links d-block" href="/about">Press & media</a>
            <a className="footer-top-links d-block" href="/about">Finovate Cares (CSR)</a>
          </div>
          <div className="col-6 col-md-3">
            <p className="fs-6 fw-semibold">Support</p>
            <a className="footer-top-links d-block" href="/support">Contact us</a>
            <a className="footer-top-links d-block" href="/support">Z-Connect blog</a>
            <a className="footer-top-links d-block" href="/pricing">List of charges</a>
            <a className="footer-top-links d-block" href="/support">Downloads & resources</a>
            <a className="footer-top-links d-block" href="/support">Videos</a>
            <a className="footer-top-links d-block" href="/support">Market overview</a>
            <a className="footer-top-links d-block" href="/support">How to file a complaint?</a>
            <a className="footer-top-links d-block" href="/support">Status of your complaints</a>
          </div>
          <div className="col-12 col-md-3">
            <p className="fs-6 fw-semibold">Account</p>
            <a className="footer-top-links d-block" href="/signup">Open an account</a>
            <a className="footer-top-links d-block" href="/support">Fund transfer</a>
          </div>
        </div>
        <div className="mt-4 mt-md-5 text-muted" style={{ fontSize: "11px" }}>
          <p>
            Finovate Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Finovate Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Finovate Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI Registration no.: INZ000038238 Registered Address: Finovate Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to <a href="mailto:complaints@finovate.com" style={{ textDecoration: "none" }}>complaints@finovate.com</a>, for DP related to <a href="mailto:dp@finovate.com" style={{ textDecoration: "none" }}>dp@finovate.com</a>. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF
          </p>

          <p>
            Procedure to file a complaint on <a href="/support" style={{ textDecoration: "none" }}>SEBI SCORES</a>: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances
          </p>

          <p>
            <a href="/support" style={{ textDecoration: "none" }}>Smart Online Dispute Resolution</a> | <a href="/support" style={{ textDecoration: "none" }}>Grievances Redressal Mechanism</a>
          </p>

          <p>
            Investments in securities market are subject to market risks; read all the related documents carefully before investing.
          </p>

          <p>
            "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Finovate and offering such services, please <a href="/support" style={{ textDecoration: "none" }}>&nbsp;create a ticket here</a>.
          </p>
        </div>
        <div className="text-center">
          <a className="footer-link text-muted me-3" href="https://www.nseindia.com" target="_blank" rel="noreferrer">NSE</a>
          <a className="footer-link text-muted me-3" href="https://www.bseindia.com" target="_blank" rel="noreferrer">BSE</a>
          <a className="footer-link text-muted" href="https://www.mcxindia.com" target="_blank" rel="noreferrer">MCX</a>
        </div>
          <a className="footer-link text-muted" href="/support">
            Terms & conditions
          </a>
          <a className="footer-link text-muted" href="/support">
            Policies & procedures
          </a>
          <a className="footer-link text-muted" href="/support">
            Privacy policy Disclosure
          </a>
          <a className="footer-link text-muted" href="/support">
            For investor's attention
          </a>
          <a className="footer-link text-muted" href="/support">
            Investor charter
          </a>
        </div>
    </footer>
  );
}

export default Footer;
