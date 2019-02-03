const BASE_URL = 'http://localhost:1488/';

const request = (url, options = {}, data) => {
  const settings = {
    credentials: 'include',
    ...options,
  };
  if (data) {
    settings.body = JSON.stringify(data);
    settings.headers = {
      'Content-type': 'application/json; charset=utf-8',
    };
  }

  const req = fetch(`${BASE_URL}${url}`, settings)
    .then(res => res.json())
    .then((resData) => {
      if (data && data.error) {
        throw data.error;
      }
      return resData;
    }).catch(err => console.error(err));
  return req;
};

const rest = {
  get(url) {
    return request(url);
  },
  post(url, data) {
    return request(url, { method: 'POST' }, data);
  }
};

export { request, rest };
