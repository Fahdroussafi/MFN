import axios from 'axios';

const baseUrl = 'http://192.168.137.1:8080';

export async function login({email, password}) {
  const response = await axios.post(`${baseUrl}/api/company/login`, {
    email,
    password,
  });
  return response.data;
}

export async function register({email, password, name}) {
  const response = await axios.post(`${baseUrl}/api/company/register`, {
    email,
    password,
    name,
  });
  return response.data;
}

export async function getPosts(page) {
  const response = await axios.get(
    `${baseUrl}/api/posts/getPosts?&page=${page}`,
  );
  return response.data;
}

export async function searchPosts(searchQuery) {
  const response = await axios.get(
    `${baseUrl}/api/posts/search/?searchQuery=${
      searchQuery.search || 'none'
    }&tags=${searchQuery.tags}`,
  );
  return response.data;
}
