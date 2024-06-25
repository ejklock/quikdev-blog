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
  const [postImage, setPostImage] = useState<File>();

  const fetchPostsPaginated = useCallback(async () => {
    await request<ApiPaginatedResponse<Post>>(
      "GET",
      `posts?page=${page}&limit=${limit}`,
      undefined,
      undefined,
      setPosts,
      setError
    );
  }, [page, limit, request, setPosts, setError]);

  const uploadPostImage = useCallback(
    (image: File) => {
      const formData = new FormData();
      formData.append("image", postImage as any);
      request(
        "POST",
        "posts/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        (data) => {
          console.log(data);
          return data;
        },
        setError
      );
    },
    [request, setError, postImage]
  );

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

  const createPost = (values: PostFormCreate) => {
    request(
      "POST",
      "posts",
      values,
      undefined,
      () => {
        uploadPostImage(values.image);
        fetchPostsPaginated();
      },
      (error) => {
        if (error.errors) {
          const { errors } = error;
          const errorsToSet = {} as {
            [key: string]: string;
          };

          for (const field in errors) {
            errorsToSet[field] = errors[field][0];
          }

          setApiError(error);
          setError(error);
        } else {
          alert(error.message);
        }
      }
    );
  };

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
    uploadPostImage,
    setPostImage,
  };
};

export default usePostApi;
