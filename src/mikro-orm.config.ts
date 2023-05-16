import { Options } from "@mikro-orm/postgresql";
import { NODE_ENV } from "./common/constants";

import { optionsDev, optionsProd } from './config/mikro-orm'

let options: Options;

switch(process.env.NODE_ENV) {
    case NODE_ENV.PRODUCTION:
        options = optionsProd;
        break;
    case NODE_ENV.DEVELOPMENT:
        options = optionsDev;
        break;
    default:
        throw new Error('No MikroORM options found')
}

export default options;
