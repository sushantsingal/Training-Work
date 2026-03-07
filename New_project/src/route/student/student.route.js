const express = require('express');
const router = express.Router();

const { studentData, userService, resultService } = require('../../services');
const { authenticateToken, requireStudentRole } = require('../../middleware/auth.middleware');

router.get('/students', async (req, res) => {

    try {
        const searchParams = req.query;
        const data = await studentData.getStudentData(searchParams);
        
        res.status(200).send({
            data: data,
            message: 'Student data fetched successfully',
            totalRecords: data.length,
        });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/students/:id', async (req, res) => {

    try {
        
        const studentId = req.params.id;
        // console.log('Student ID:', studentId);
        const data = await studentData.getStudentById(studentId);

        res.status(200).send({
            data: data,
            message: 'Student data fetched successfully',
        });

    } catch (error) {
        console.error('Error fetching student by ID:', error);
        if (error.message === 'Student not found') {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

});

router.post('/students/login', async (req, res) => {
    try {
        const payload = req.body;

        // First check if user exists and is a student
        const users = await userService.getUserList({ email: payload.email });

        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const user = users[0];
        if (user.role !== 'STUDENT') {
            return res.status(403).json({ error: 'Access denied. Not a student account.' });
        }

        // Use the existing login logic
        const result = await userService.loginUser(payload);

        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }

        res.status(200).json({
            data: result,
            message: 'Student logged in successfully'
        });

    } catch (error) {
        console.error('Error during student login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/students/profile', authenticateToken, requireStudentRole, async (req, res) => {
    try {
        const studentId = req.user._id;

        // Get student profile from user service
        const profile = await userService.getUserById(studentId);

        if (!profile) {
            return res.status(404).json({ error: 'Student profile not found' });
        }

        // Remove sensitive information
        const { password, passwordResetToken, ...safeProfile } = profile;

        res.status(200).json({
            data: safeProfile,
            message: 'Student profile fetched successfully'
        });

    } catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/students/results', authenticateToken, requireStudentRole, async (req, res) => {
    try {
        const studentId = req.user._id;

        // Get results for this student
        const results = await resultService.getResultList({ student: studentId });

        res.status(200).json({
            data: results,
            message: 'Student results fetched successfully',
            totalRecords: results.length
        });

    } catch (error) {
        console.error('Error fetching student results:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
