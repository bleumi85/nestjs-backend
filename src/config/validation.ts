import * as Joi from 'joi';
import { NODE_ENV } from 'src/common/constants';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid(NODE_ENV.PRODUCTION, NODE_ENV.DEVELOPMENT, NODE_ENV.TEST)
        .default(NODE_ENV.DEVELOPMENT),
    PORT: Joi.number().default(3005),
});
