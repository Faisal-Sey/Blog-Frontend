// export const BACKEND_DOMAIN = "http://127.0.0.1:8000";
// export const BACKEND_DOMAIN = "http://api.hotlarva.com";
export const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN;

export const STATUS_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    LOGGED_OUT: 205,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_CREATED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
    UNPROCESSABLE_ENTITY: 422,
    SERVER_ERROR: 500,
  };


 
