import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (limit) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
  const data = await response.json();
  return data;
});
