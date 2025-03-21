import {Router} from 'express';

import Validator from '#root/validator/Validator.js';
import Model from '#root/model/Model.js';
import Accessor from '#root/accessor/Accessor.js';
import Controller from '#root/controller/Controller.js';

import schema from '../schemas/users-schema.js';
import modelConfig from '../models/users-model.js';
import dbConfig from '../dbConfig.js';

// Validator -------------------------------------

const validator = new Validator(schema);

// Model -----------------------------------------

const model = new Model(modelConfig);

// Data accessor ---------------------------------

const accessor = new Accessor(model, dbConfig);

// Controller ------------------------------------

const controller = new Controller(validator, accessor);

// Endpoints -------------------------------------

const router = new Router();

router.get('/', (req, res) => controller.get(req, res, null));
router.get('/:id(\\d+)', (req, res) => controller.get(req, res, 'primary'));
router.get('/contacts/:id(\\d+)', (req, res) =>
  controller.get(req, res, 'contacts')
);
/*
router.get('/expo/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const [rows] = await pool.query(
      'SELECT ExpoPushToken FROM users WHERE UserID = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({error: 'User not found'});
    }

    res.json({isSuccess: true, data: rows[0]});
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({error: 'Failed to fetch user'});
  }
});
*/
router.post('/', controller.post);

router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

export default router;
