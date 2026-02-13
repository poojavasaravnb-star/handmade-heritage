import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch("https://6981e61cc9a606f5d44864fa.mockapi.io/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <video autoPlay muted loop>
          <source
            src="https://img.indiahandmade.com/wysiwyg/new_ihm_video_Banner.webm"
            type="video/webm"
          />
        </video>

        <div className="hero-overlay">
          <h1>Handmade Heritage</h1>
          <p>Celebrating India’s Artisan Craftsmanship</p>
          <button onClick={() => navigate("/shop")}>Shop Now</button>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="shop-category">
        <h2>Shop by Category</h2>

        {loading ? (
          <p className="loading">Loading categories...</p>
        ) : (
          <div className="category-slider-wrapper">
            <button className="arrow left" onClick={scrollLeft}>
              &#10094;
            </button>

            <div className="category-slider" ref={sliderRef}>
              {categories.map((cat) => (
                <div
                  className="category-card"
                  key={cat.id}
                  onClick={() =>
                    navigate(`/shop?category=${encodeURIComponent(cat.name)}`)
                  }
                >
                  <img src={cat.image} alt={cat.name} />
                  <div className="category-name">{cat.name}</div>
                </div>
              ))}
            </div>

            <button className="arrow right" onClick={scrollRight}>
              &#10095;
            </button>
          </div>
        )}
      </section>

      {/* TESTIMONIAL */}
      <section className="testimonial">
        <h2>Loved by Our Customers</h2>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>“Absolutely stunning handmade products.”</p>
            <span>- Rahul K.</span>
          </div>
          <div className="testimonial-card">
            <p>“Quality and authenticity at its best.”</p>
            <span>- Neha S.</span>
          </div>
          <div className="testimonial-card">
            <p>“Feels proud to support Indian artisans.”</p>
            <span>- Aman P.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
