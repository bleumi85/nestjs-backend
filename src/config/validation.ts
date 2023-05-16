import * as Joi from 'joi';
import { NODE_ENV } from 'src/common/constants';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid(NODE_ENV.PRODUCTION, NODE_ENV.DEVELOPMENT, NODE_ENV.TEST)
        .default(NODE_ENV.DEVELOPMENT),
    PORT: Joi.number().default(3005),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required().allow(''),
    POSTGRES_DB: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
});
