const http = require('http');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');


const port = process.env.PORT || process.env.NODE_PORT || 3000;
 
  // handle GET requests
const handleGet = (request, response, parsedUrl) => {
    // route to correct method based on url
  console.log(parsedUrl.pathname);
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  }
  else if (parsedUrl.pathname === '/success') {
    jsonHandler.getSuccess(request, response);
  }
  else if (parsedUrl.pathname === '/badRequest') {
    const valid = parsedUrl.searchParams.get('valid');
    jsonHandler.getBadRequest(request, response, valid);
  }
  else if (parsedUrl.pathname === '/unauthorized') {
    const loggedIn = parsedUrl.searchParams.get('loggedIn');
    jsonHandler.getUnauthorized(request, response, loggedIn);
  }
  else if (parsedUrl.pathname === '/forbidden') {
    jsonHandler.getForbidden(request, response);
  }
  else if (parsedUrl.pathname === '/internal') {
    jsonHandler.getInternal(request, response);
  }
  else if (parsedUrl.pathname === '/notImplemented') {
    jsonHandler.getNotImplemented(request, response);
  }
  else if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  }
  else {
    jsonHandler.getNotFound(request, response);
  }
  };  


const onRequest = (request, response) => {
  // parse url into individual parts
  // returns an object of url parts by name
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  console.log(request.method + '\n' + parsedUrl);
  handleGet(request, response, parsedUrl);
};

// Creates server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});