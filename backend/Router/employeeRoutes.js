const express = require('express');
const router = express.Router();
const Employee = require('../Models/Employee'); // Assuming Employee model is in models folder
const employeeController = require('../Controller/employeeController');

// Existing routes
router.post('/add', employeeController.addEmployee);

// New DELETE route to delete an employee by email
router.delete('/delete/:email', employeeController.deleteEmployee);

// GET route to generate the schedule based on employee availability
// GET route to generate the schedule based on employee availability
// GET route to generate the schedule based on employee availability
router.get('/schedule', async (req, res) => {
    try {
        const employees = await Employee.find();

        const shifts = {
            'Monday': { morning: [], afternoon: [], night: [] },
            'Tuesday': { morning: [], afternoon: [], night: [] },
            'Wednesday': { morning: [], afternoon: [], night: [] },
            'Thursday': { morning: [], afternoon: [], night: [] },
            'Friday': { morning: [], afternoon: [], night: [] },
            'Saturday': { morning: [], afternoon: [], night: [] },
            'Sunday': { morning: [], afternoon: [], night: [] },
        };

        // Assign employees to shifts based on their availability
        employees.forEach(employee => {
            employee.availability.forEach(day => {
                if (shifts[day]) {
                    // Assign employee to the first available shift for the day
                    if (shifts[day].morning.length === 0) {
                        shifts[day].morning.push(employee.name);
                    } else if (shifts[day].afternoon.length === 0) {
                        shifts[day].afternoon.push(employee.name);
                    } else if (shifts[day].night.length === 0) {
                        shifts[day].night.push(employee.name);
                    }
                }
            });
        });

        res.json({ schedule: shifts });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedule', error });
    }
});


module.exports = router;
