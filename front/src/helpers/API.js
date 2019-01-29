import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

export default {
  login: (email, password) => (
    axios.post('/api/user/login', {
      email,
      password,
    }, {
      headers,
    })
  ),
  signup: send => (
    axios.post('/api/user/signup', send, {
      headers,
    })
  ),

  isAuth: () => (
    localStorage.getItem('token') !== null
  ),
  logout: () => {
    localStorage.clear();
  },
};
