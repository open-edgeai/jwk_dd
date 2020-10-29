import { IENV } from './sdk';
export { ENV_ENUM, APP_TYPE, ENV_ENUM_SUB } from './sdk';
declare global {
    interface Navigator {
        swuserAgent: any;
    }
}
export declare const getUA: () => string;
export declare const getENV: () => IENV;
