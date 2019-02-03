import { rest } from './rest';

export const postUser = data => rest.post('users', data);
export const getUsers = () => rest.get('users');
