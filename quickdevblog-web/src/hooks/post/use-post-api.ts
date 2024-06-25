import { useCallback, useState } from "react";
import { ApiPaginatedResponse } from "../api/api.types";
import useApi from "../api/use-api";
import { Post, PostFormCreate } from "./post.types";

const usePostApi = () => {
  const [posts, setPosts] = useState<ApiPaginatedResponse<Post>>();
  const { request, setError } = useApi<ApiPaginatedResponse<Post>>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [apiError, setApiError] = useState<Record<string, string>>();

  const fetchPostsPaginated = useCallback(() => {
    request<ApiPaginatedResponse<Post>>(
      "GET",
      `posts?page=${page}&limit=${limit}`,
      undefined,
      undefined,
      setPosts,
      setError
    );
  }, [page, limit, request, setPosts, setError]);

  const deletePost = useCallback(
    (id: number | string) => {
      request(
        "DELETE",
        `posts/${id}`,
        undefined,
        undefined,
        () => {
          fetchPostsPaginated();
        },
        (error) => {
          setApiError(error);
          setError(error);
        }
      );
    },
    [request, fetchPostsPaginated, setError]
  );

  const createPost = useCallback(
    async (values: PostFormCreate) => {
      const { title, description, image } = values;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) {
        formData.append("file", image);
      }

      request(
        "POST",
        "posts",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        },
        () => {
          fetchPostsPaginated();
        },
        setError
      );
    },

    [request, fetchPostsPaginated, setError]
  );

  const updatePost = useCallback(
    (values: Post) => {
      request(
        "PUT",
        `posts/${values.id}`,
        values,
        undefined,
        () => {
          fetchPostsPaginated();
        },
        setError
      );
    },
    [request, fetchPostsPaginated, setError]
  );

  const likePost = useCallback(
    (postId: number) => {
      request(
        "PUT",
        `posts/${postId}/like`,
        undefined,
        undefined,
        () => {
          fetchPostsPaginated();
        },
        setError
      );
    },
    [request, fetchPostsPaginated, setError]
  );
  const unlikePost = useCallback(
    (postId: number) => {
      request(
        "PUT",
        `posts/${postId}/unlike`,
        undefined,
        undefined,
        () => {
          fetchPostsPaginated();
        },
        setError
      );
    },
    [request, fetchPostsPaginated, setError]
  );
  return {
    deletePost,
    fetchPostsPaginated,
    page,
    limit,
    setError,
    apiError,
    setPage,
    setLimit,
    setApiError,
    posts,
    createPost,
    updatePost,
    likePost,
    unlikePost,
  };
};

export default usePostApi;
