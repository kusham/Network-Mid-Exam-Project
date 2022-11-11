const express = require('express');
const { addMessage, getMessages } = require('./MessageControllers');


const router = express.Router()

router.post('/', addMessage);

router.get('/:chatId', getMessages);

module.exports =  router