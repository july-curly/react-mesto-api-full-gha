const baseUrl = 'https://api.july.nomoredomainsicu.ru'

function checkRes(res){
  if (res.ok) {
    return res.json();
    }
  else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

export function register (email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      password: password,
      email: email 
    })
  })
  .then(res => checkRes(res));
}

export function authorize (email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(res => checkRes(res));
}

export function checkToken (token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}` },
  })
  .then(res => checkRes(res));
}