import { apiSlice } from "./apiSlice";
const THOUGHT_URL = "/api/thoughts";

export const thoughtApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addThought: builder.mutation({
      query: ({ data, token }) => ({
        url: `${THOUGHT_URL}/add/${data.userId}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteThought: builder.mutation({
      query: () => ({
        url: `${THOUGHT_URL}/${thoughtId}`,
        method: "DELETE",
      }),
    }),
    editThought: builder.mutation({
      query: (data) => ({
        url: `${THOUGHT_URL}/${thoughtId}`,
        method: "PUT",
        body: data,
      }),
    }),
    getAllThought: builder.query({
      query: () => ({
        url: `${THOUGHT_URL}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddThoughtMutation,
  useDeleteThoughtMutation,
  useEditThoughtMutation,
  useGetAllThoughtQuery,
} = thoughtApiSlice;
