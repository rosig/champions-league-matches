import React from "react";
import logo from "../../assets/img/champions_logo.png";
import "./styles.scss";

export default function Logo() {
  return (
    <section className="logo">
      <img src={logo} alt="Champions-League-Logo" className="logo__image" />
    </section>
  );
}
