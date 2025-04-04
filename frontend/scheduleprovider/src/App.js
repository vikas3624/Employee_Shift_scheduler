import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import EmployeeForm from './Components/EmployeeForm';
import Schedule from './Components/Schedule';
import Hero from './Components/Hero';
import Footer from './Components/Footer';

const App = () => {
    return (
        <Router>
            <div>
                

                <Routes>
                    {/* Hero Page with Navigation */}
                    <Route path="/" element={<Hero />} />

                    {/* Add Availability Page (Shows EmployeeForm) */}
                    <Route path="/add-availability" element={<EmployeeForm />} />

                    {/* View Schedule Page (Shows Schedule) */}
                    <Route path="/view-schedule" element={<Schedule />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
};

export default App;
