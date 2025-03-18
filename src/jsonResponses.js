// Figure out how to format data based on whether the user wants XML or JSON
const respond = (request, response, status, object) => {
  let content;
  if (request.headers['accept'] === 'text/xml') {
    content = `
      <response>
        <message>${object.message}</message>
        ${object.id ? `<id>${object.id}</id>` : ``}  
      </response>
    `.trim();


    response.writeHead(status, {
      'Content-Type': 'text/xml',
      'Content-Length': Buffer.byteLength(content, 'utf8'),
    });
  }
  else {
    content = JSON.stringify(object);
    response.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
    });
  }


  if (request.method !== 'HEAD' && status !== 204) {
    response.write(content);
  }
 
  response.end();
};

// Success page
const getSuccess = (request, response) => {
  console.log(request.headers['accept']);


  const responseData = {
    message: 'Message: This is a successful response (:',
  };
    respond(request, response, 200, responseData);
};

// Bad Request page with true | false parameter valid
const getBadRequest = (request, response, valid) => {
  if (valid === 'true') {
    const responseData = {
      message: 'Message: Bad Request, Valid Parameter',
    };
    respond(request, response, 200, responseData);
  }
  else {
    const responseData = {
      message: 'Message: Bad Request, Invalid Parameter',
      id: 'Id: badRequest'
    };
    respond(request, response, 400, responseData);
  }
};

// Unauthorized page with true | false parameter loggedIn
const getUnauthorized = (request, response, loggedIn) => {
  if (loggedIn === 'true') {
    const responseData = {
      message: 'Message: Unauthorized, Valid Parameter',
    };
    respond(request, response, 200, responseData);
  }
  else {
    const responseData = {
      message: 'Message: Unauthorized, Invalid Parameter',
      id: 'Id: unauthorized'
    };
    respond(request, response, 401, responseData);
  }
};

// Forbidden page
const getForbidden = (request, response) => {
  console.log(request.headers['accept']);


  const responseData = {
    message: 'Message: You do not have access to this content',
  };
    respond(request, response, 403, responseData);
};

const getInternal = (request, response) => {
  console.log(request.headers['accept']);


  const responseData = {
    message: 'Message: Internal server error, something went wrong',
  };
    respond(request, response, 500, responseData);
};

// Not Implemented page
const getNotImplemented = (request, response) => {
  console.log(request.headers['accept']);


  const responseData = {
    message: 'Message: A get request for this page has not been implemented yet. Check again later for updated content',
  };
    respond(request, response, 501, responseData);
};

// Not Found page
const getNotFound = (request, response) => {
  console.log(request.headers['accept']);


  const responseData = {
    message: 'Message: The page you were looking for cannot be found',
  };
    respond(request, response, 404, responseData);
};

// Exports
module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound
};