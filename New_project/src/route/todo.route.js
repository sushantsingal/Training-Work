const express = require('express');
const router = express.Router();

const {validateTodo, validateTodoUpdate} = require('../validator/todo.validator');

const { todoService } = require('../services');

router.get('/todos', async (req, res) => {

    try {
        const searchParams = req.query;
        const data = await todoService.getTodoList(searchParams);

        res.status(200).send({
            data: data,
            message: 'Todo list fetched successfully',
            totalRecords: data.length,
        });
    } catch (error) {
        console.error('Error fetching todo list:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/todos/:id', async (req, res) => {

    try {

        const todoId = req.params.id;
        const data = await todoService.getTodoById(todoId);

        res.status(200).send({
            data: data,
            message: 'Todo item fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching todo by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/todos', async (req, res) => {
    
    try {
        const todoData = req.body;

        const {error} = validateTodo(todoData);

        if(error) {
            res.status(400).json({ error: error.details[0].message });
        }
        
        else {
            const createdTodo = await todoService.createTodo(todoData);
            
            res.status(201).send({
                data: createdTodo,
                message: 'Todo item created successfully',
            });
        }

    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.patch('/todos', async (req, res) => {
    
    try {
        const todoData = req.body;
        const filters = req.query;

        console.log('Filters:', filters);

        const {error} = validateTodoUpdate(todoData);

        if(error) {
            res.status(400).json({ error: error.details[0].message });
        }

        else {
            const updatedTodo = await todoService.updateTodo(filters, todoData);

            res.status(200).send({
                data: updatedTodo,
                message: 'Todo item updated successfully',
            });
        }
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/todos/:id', async (req, res) => {

    try {
        const todoId = req.params.id;
        await todoService.deleteTodo(todoId);

        res.status(200).send({
            message: 'Todo item deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;