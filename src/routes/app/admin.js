import express from 'express'
import auth from '../../middleware/auth.js';
export default [
    auth,
    express.static('pages/admin')
];