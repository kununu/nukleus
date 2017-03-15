import {isBrowser} from './executionEnvironment';

const isMobile = isBrowser ? window.outerWidth < 550 : false;

export default isMobile;
