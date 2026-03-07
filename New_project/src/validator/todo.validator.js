const Joi = require('joi');

const todoValidationSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.base': 'Title should be a string',
        'string.empty': 'Title cannot be empty',
        'any.required': 'Title is required'
    }),
    description: Joi.string(),
    status: Joi.string().valid('Todo', 'In Progress', 'Done')
});

const updateTodoValidationSchema = Joi.object({
    title: Joi.string().messages({
        'string.base': 'Title should be a string',
        'string.empty': 'Title cannot be empty'
    }),
    description: Joi.string(),
    status: Joi.string().messages({
        'string.base': 'Status should be a string',
        'string.empty': 'Status cannot be empty',
        'any.only': 'Status must be one of Todo, In Progress, Done'
    }).valid('Todo', 'In Progress', 'Done') 
});

const validateTodo = (todoData) => {
    return todoValidationSchema.validate(todoData, {abortEarly: false});
}

const validateTodoUpdate = (todoData) => {
    return updateTodoValidationSchema.validate(todoData, {abortEarly: false});
}

module.exports = {
    validateTodo,
    validateTodoUpdate
};