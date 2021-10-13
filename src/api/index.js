import axios from "axios";

const url = "http://localhost:6969/api/";

export const fetchPosts = () => axios.get(`${url}/items`);

export const createPost = (newPost) => {
  return axios.post(`${url}/items`, newPost);
};

export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);
