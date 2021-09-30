let localStorageMock = (function() {


    let store = {};

    return {

      getItem: function(key) {
        return store[key];
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      }
      
    };
  })();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

module.exports = localStorageMock;
