import { rest } from './rest';

const postMessage = data => rest.post('messages', data);
const getMessages = id => rest.get(`${id}/messages`);

export { postMessage, getMessages };
