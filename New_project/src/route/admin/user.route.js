const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/auth.middleware');
const { userService } = require('../../services');

router.get('/user', authenticate, async (req, res) => {
    try {
        const searchParams = req.query;
        const result= await userService.getUser(searchParams);
        if(result.status === 200){
            res.status(result.status).json({data: { user: result.users }});
        }

    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/users/:id', authenticate, async (req, res) => {
    try {
        const users = await userService.getUserList(req.query);
        res.json({ users });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/users', authenticate, async (req, res) => {
    try {
        const payload = req.body;
        const result = await userService.createUser(payload);
        res.status(result.status).json({ data: { user: result.user } });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.patch('/users/:id', authenticate, async (req, res) => {
    try {
        const userId = req.params.id;
        const payload = req.body;
        const result = await userService.updateUser({ _id: userId }, payload);
        res.status(200).json({ data: { user: result } });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/users/:id', authenticate, async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userService.deleteUser(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;