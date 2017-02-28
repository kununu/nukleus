const isMobile = typeof window === 'undefined' ? false : window.outerWidth < 550;

export default isMobile;
