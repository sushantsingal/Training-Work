const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/auth.middleware');
const { departmentService } = require('../../services');

router.get('/department', authenticate, async (req, res) => {
    try {
        const searchParams = req.query;
        const result= await departmentService.getDepartment(searchParams);
        if(result.status === 200){
            res.status(result.status).json({data: { department: result.departments }});
        }

    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/departments/:id', authenticate, async (req, res) => {
    try {
        const departments = await departmentService.getDepartmentList(req.query);
        res.json({ departments });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/departments', authenticate, async (req, res) => {
    try {
        const payload = req.body;
        const result = await departmentService.createDepartment(payload);
        res.status(result.status).json({ data: { department: result.department } });
    } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.patch('/departments/:id', authenticate, async (req, res) => {
    try {
        const departmentId = req.params.id;
        const payload = req.body;
        const result = await departmentService.updateDepartment({ _id: departmentId }, payload);
        res.status(200).json({ data: { department: result } });
    } catch (error) {
        console.error('Error updating department:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/departments/:id', authenticate, async (req, res) => {
    try {
        const departmentId = req.params.id;
        const result = await departmentService.deleteDepartment(departmentId);
        res.status(200).json({ message: 'department deleted successfully' });
    } catch (error) {
        console.error('Error deleting department:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;