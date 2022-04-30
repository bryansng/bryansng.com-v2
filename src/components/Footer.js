import React from "react";
import SocialMedia from "./SocialMedia/SocialMedia";
import content from "../config/content";

const Footer = () => {
  // const currentYear = new Date().getFullYear();
  const { github_link_msg, github_link_url, last_updated } = content.footer;
  return (
    <footer className="footer-bg shadow-2">
      <SocialMedia />
      <div className="tc ma0 pt2 pb4 pv4-l font-ubuntu-mono">
        <a
          href={github_link_url}
          className="pa1 no-underline footer transition-ease-in"
        >
          {github_link_msg}
        </a>
        <div className="pt3 f6 no-underline footer-no-hover transition-ease-in">
          Last Updated: {last_updated}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
