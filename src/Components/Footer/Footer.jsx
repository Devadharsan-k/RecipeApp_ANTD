import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      &copy; &nbsp; DEVA &nbsp; {new Date().getFullYear()}
    </div>
  );
};

export default Footer;
