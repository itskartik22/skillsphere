let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.REACT_APP_BASE_URL;
} else {
  baseURL = 'http://localhost:3000'; // Development URL
}

export default baseURL