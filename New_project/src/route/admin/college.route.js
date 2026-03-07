const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/auth.middleware');
const { collegeService } = require('../../services');

router.get('/colleges', authenticate, async (req, res) => {
    try {
        const searchParams = req.query;
        const result= await collegeService.getColleges(searchParams);
        if(result.status === 200){
            res.status(result.status).json({data: { user: result.college }});
        }

    } catch (error) {
        console.error('Error fetching college data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/college/:id', authenticate, async (req, res) => {
    try {
        const college = await collegeService.getCollegeList(req.query);
        res.json({ college });
    } catch (error) {
        console.error('Error fetching college data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/college', authenticate, async (req, res) => {
    try {
        const payload = req.body;
        const result = await collegeService.createCollege(payload);
        res.status(result.status).json({ data: { college: result.college } });
    } catch (error) {
        console.error('Error creating college:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.patch('/college/:id', authenticate, async (req, res) => {
    try {
        const userId = req.params.id;
        const payload = req.body;
        const result = await collegeService.updateCollege({ _id: userId }, payload);
        res.status(200).json({ data: { college: result } });
    } catch (error) {
        console.error('Error updating college:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/college/:id', authenticate, async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await collegeService.deleteCollege(userId);
        res.status(200).json({ message: 'College deleted successfully' });
    } catch (error) {
        console.error('Error deleting college:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;