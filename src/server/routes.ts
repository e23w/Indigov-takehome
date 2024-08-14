import * as express from 'express';
import asyncHandler from 'express-async-handler';
import * as controllers from './controllers';
import * as validators from './validators';

import path from 'path';

const router = express.Router();

/// API endpoints

// Gets all constituents in the system
router.get('/constituents', validators.validateSearchFilters, validators.handleValidationResult, asyncHandler(async (req, res) => {

    try {
        const constituents = await controllers.getAllConstituentsAsync(req.body);
        res.status(200).json(constituents);
        return;
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
}));


// Exports a csv to disk of constituent data falling into the specified start and end dates, and returns the filepath
router.get('/constituents/csv', validators.validateSearchFilters, validators.handleValidationResult, asyncHandler(async (req, res) => {

    try {
        const filename = await controllers.exportConstituentCSVAsync(req.body);
        res.status(200).json({'message': `file successfully exported to ${filename}`});
        return;
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
}));


// Adds or updates a constituent
router.post('/constituent', validators.validateConstituentData, validators.handleValidationResult, asyncHandler(async (req, res) => {

    try {
        const constituentData = await controllers.insertConstituentAsync(req.body);
        res.status(200).json(constituentData);
        return;
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
}));


// Imports a CSV of constituent data
router.post('/constituents/csv', express.raw({type: 'text/csv'}),  asyncHandler(async (req, res) => {

    try {
        const data = req.body;
        if (!data.length) {
            res.status(400).send('No csv file uploaded');
            return;
        }

        await controllers.importCSVAsync(data);

        res.status(200).send('File uploaded successfully');
        return;
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
}));


/// Views endpoints

// Returns main page
router.get('/', asyncHandler(async (req, res) => {
    // todo create functional frontend using index.html
    res.sendFile(path.join(process.cwd(), 'views/index.html'));
}));


export default router;