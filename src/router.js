const {
    homeHandler,
    publicHandler,
    errorHandler,
    hostelHandler
  } = require('./handlers');
  
  const router = (request, response) => {
    const { url } = request;
  
    if (url === '/') {
      homeHandler(response);
    } else if (url.includes('public')) {
      publicHandler(url, response);
    } else if (url.includes('search')) {
      hostelHandler(url, response);
    }
    else if (url.includes('reserve')) {
      reserveHandler(url, response);
    }
    else {
      errorHandler(response);
    }
  };
  
  module.exports = router;
  