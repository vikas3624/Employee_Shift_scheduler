import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css'

const Hero = () => {
    return (
        <div className="hero-container">
            <h1>Employee Shift Scheduler</h1>
            <div className="button-group">
                <Link to="/add-availability">
                    <button className="hero-button">Add Availability</button>
                </Link>
                <Link to="/view-schedule">
                    <button className="hero-button">View Schedule</button>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
