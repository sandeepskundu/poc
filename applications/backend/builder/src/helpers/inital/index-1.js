const setHelpers = (n, h) => {
    if(n && h){
        window[n] = h;
    }
  }
  
  
const initializer = (n, h) => {
    window._CN = n ? n : 'helpers';
    
    window._getCore = () => {
        return window[_CN];
    };
  
    setHelpers(window._CN, h)
  
    window._rId = window._getCore().random.id(8);

    window._rK = (i) => {
        return window._rId + (i || '0');
    };
  
};
  
exports.init = initializer;