const Employee = require('../Models/Employee');

// Add an employee
exports.addEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Generate shift schedule (dummy logic for now)
// Generate shift schedule
// Generate shift schedule
exports.generateSchedule = async (req, res) => {
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

        // First pass - Assign employees sequentially based on their availability
        employees.forEach(employee => {
            employee.availability.forEach(day => {
                if (shifts[day]) {
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
        res.status(500).json({ message: 'Error generating schedule', error });
    }
};



// Delete an employee by email
exports.deleteEmployee = async (req, res) => {
    const { email } = req.params; // Get email from request params
    try {
        const deletedEmployee = await Employee.findOneAndDelete({ email });
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

