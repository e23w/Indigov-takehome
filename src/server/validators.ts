import {body, validationResult} from 'express-validator';

export const handleValidationResult = (req: any, res: any, next: any) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({errors: result.array()});
    }
    next();
};

export const validateSearchFilters = [
    body('startDate').isDate().optional(),
    body('endDate').isDate().optional(),
    body('sort').isString().isIn(['email', 'name', 'address', 'signup_time']).optional() // todo don't use column names directly
];


export const validateConstituentData = [
    body('email').isEmail().notEmpty(),
    body('name').notEmpty(),
    body('address').notEmpty()
]