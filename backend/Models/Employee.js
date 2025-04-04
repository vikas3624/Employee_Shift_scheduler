const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    availability: {
        type: [String], // Days of the week (e.g., ["Monday", "Tuesday"])
        required: true,
    },
    shifts: [{
        day: { 
            type: String, // Day of the week
            required: true
        },
        shiftTime: { 
            type: String, // Morning, Afternoon, or Night
            required: true
        },
        assigned: { 
            type: Boolean, 
            default: false 
        }
    }]
});

module.exports = mongoose.model('Employee', employeeSchema);
