import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeForm.css'

const EmployeeForm = ({ fetchSchedule }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [availability, setAvailability] = useState([]);
    const [message, setMessage] = useState('');

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const handleCheckboxChange = (day) => {
        setAvailability((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/employees/add', {
                name,
                email,
                availability,
            });

            setMessage('✅ Availability is submitted!');
            setTimeout(() => setMessage(''), 3000); // Hide message after 3 seconds

            // Clear form fields
            setName('');
            setEmail('');
            setAvailability([]);

            // Refresh schedule
            if (fetchSchedule) fetchSchedule();

        } catch (error) {
            setMessage('❌ Error submitting data');
            console.error(error);
        }
    };

    return (
        <div className='employee-container' >
            
            <form onSubmit={handleSubmit}>
                <h2>Employee Form</h2>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Availability:</label>
                    <div>
                        {daysOfWeek.map((day) => (
                            <label key={day} style={{ marginRight: '10px' }}>
                                <input
                                    type="checkbox"
                                    checked={availability.includes(day)}
                                    onChange={() => handleCheckboxChange(day)}
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>

            {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default EmployeeForm;
