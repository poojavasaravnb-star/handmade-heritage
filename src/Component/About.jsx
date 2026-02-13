import React from "react";
import "./About.css";
import teamImg from "../assets/team.jpg";
import exImg from "../assets/ex.jpg";

const About = () => {
  return (
    <div className="about-wrapper">
      {/* 01. Clean Hero Section - Text Moved Below Image */}
      <section className="hero-section">
        <div className="hero-intro-text">
          <span className="est-tag">EST. 2025</span>
          <h1 className="title-serif">
            Our Story: Crafting Heritage, Building Futures
          </h1>
          <p className="hero-sub">
            At HandMade Heritage, we believe in the power of human touch. Every
            piece tells a tale of skill, tradition, and passion, meticulously
            crafted by artisans whose legacy spans generations.
          </p>
        </div>
      </section>

      {/* 02. Experience Section */}
      <section className="experience-box">
        <div className="container-flex">
          <div className="exp-text">
            <h2 className="serif-heading">
              More Than Just Products, It's an Experience
            </h2>
            <div className="accent-line"></div>
            <p>
              We are dedicated to preserving the rich tapestry of traditional
              Indian crafts. Our platform connects you directly with the heart
              of India's artisan communities, ensuring fair trade and
              sustainable practices.
            </p>
          </div>
          <div className="exp-visual">
            <img src={exImg} alt="Artisans Unity" className="side-img" />
          </div>
        </div>
      </section>

      {/* 03. Mission & Vision - Clean Cards */}
      <section className="mission-vision">
        <div className="mv-grid">
          <div className="mv-card">
            <h3>Our Mission</h3>
            <p>
              To empower artisans globally by providing a platform for their
              craft and sustainable livelihoods.
            </p>
          </div>
          
          <div className="mv-card">
            <h3>Our Vision</h3>
            <p>
              To be the leading global marketplace for handcrafted goods,
              celebrated for cultural preservation.
            </p>
          </div>
          <div className="mv-card highlighted">
            <h3>Our Values</h3>
            <ul className="values-list">
              <li>Authenticity</li>
              <li>Fair Trade</li>
              <li>Sustainability</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 04. Team Section */}
      <section className="team-section">
        <div className="team-flex">
          <div className="team-img-box">
            <img
              src={teamImg}
              alt="HandMade Heritage Team"
              className="team-photo"
            />
          </div>
          <div className="team-content">
            <h2 className="serif-heading">Meet Our Visionaries</h2>
            <p>
              Our diverse team is united by a shared passion for art, culture,
              and social impact. We work tirelessly to bring you the best
              handcrafted selections.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
