// this slice makes asynchronous requests to backend
// parent slice to usersApiSlice.js, thoughtApiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://auth-reactnative.onrender.com",
  baseUrl: "http://localhost:8000",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Thought"],
  endpoints: (builder) => ({}),
});
