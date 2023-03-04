export default {
    get: function(target, name) {
      return target.hasOwnProperty(name) ? target[name] : data => data;
    }
  }