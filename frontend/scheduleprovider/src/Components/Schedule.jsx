import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Schedule.css';

const Schedule = () => {
    const [schedule, setSchedule] = useState({});

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/employees/schedule');
                console.log("API Response:", res.data); // Log the response here
                setSchedule(res.data.schedule || {});
            } catch (error) {
                console.error("Error fetching schedule:", error);
            }
        };
        fetchSchedule();
    }, []);

    if (!schedule || Object.keys(schedule).length === 0) {
        return <p>No schedule available.</p>;
    }

    return (
        <div className="schedule-container">
            <h2>Employee Shift Schedule</h2>
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Morning Shift (7 AM-3 PM)</th>
                        <th>Afternoon Shift (3 PM-11 PM)</th>
                        <th>Night Shift (11 PM-7 AM)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(schedule).map((day) => (
                        <tr key={day}>
                            <td>{day}</td>
                            {/* Morning Shift */}
                            <td>{schedule[day].morning.length > 0 ? schedule[day].morning[0] : "(No employee)"}</td>
                            {/* Afternoon Shift */}
                            <td>{schedule[day].afternoon.length > 0 ? schedule[day].afternoon[0] : "(No employee)"}</td>
                            {/* Night Shift */}
                            <td>{schedule[day].night.length > 0 ? schedule[day].night[0] : "(No employee)"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Schedule;
