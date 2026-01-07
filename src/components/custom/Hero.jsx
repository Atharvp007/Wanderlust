import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="hero-container flex-col">
      <h1 className="hero-text">
        <span className="hero-highlight">
          Discover Your Next Adventure with AI:
        </span>
        Personalized itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interest and budget
      </p>
      <Link to={"/create-trip"}>
        {" "}
        <Button className="hero-button">Get Started It's Free</Button>
      </Link>

      {/* CSS inside the same file */}
      <style>{`
        .hero-container {
          display: flex;
          flex-direction: column; /* fixed from flex:flex-column */
          justify-content: center;
          align-items: center;
          min-height: 50vh;
          margin-top: 1rem; /* space from top */
          width: 100%;
          padding: 0 2rem; /* optional horizontal padding */
          box-sizing: border-box;
        }

        .text-xl {
          color: gray;
          text-align: center;
          max-width: 48rem;
        }

        .hero-text {
          font-weight: 800;        /* font-extrabold */
          text-align: center;
          font-size: 2rem;         /* text size */
          max-width: 48rem;        /* max width for readability */
        }

        .hero-highlight {
          color: #f56551;
          display: block;           /* makes it a full line */
          margin-bottom: 0.5rem;   /* adds space below */
        }

        .hero-button {
          margin-top: 1.5rem; /* space above button */
        }
      `}</style>
    </div>
  );
}

export default Hero;
