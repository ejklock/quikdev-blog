import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Post } from "../hooks/post/post.types";
import usePostApi from "../hooks/post/use-post-api";
import Modal from "./Modal";
import PostCard from "./PostCard";
import PostForm from "./PostForm";

export default function PostsComponent() {
  const {
    page,
    limit,
    posts,
    fetchPostsPaginated,
    deletePost,
    createPost,
    updatePost,
  } = usePostApi();

  useEffect(() => {
    fetchPostsPaginated();
  }, [page, limit]);

  const handleDeletePostBuuton = (taskId: string) => {
    deletePost(taskId);
  };
  const handleUpdatePostButton = (values: Post) => {
    updatePost({
      id: values?.id,
      title: values?.title,
      description: values?.description,
    });
    onClose();
  };

  const handleCreatePostButton = (values: Post) => {
    createPost({
      title: values?.title,
      description: values?.description,
    });
    onClose();
  };

  const [isOpen, setIsOpen] = useState(false);

  const [initialValues, setInitialValues] = useState({
    id: undefined,
    title: "",
    description: "",
  });

  const [formHandler, setFormHandler] = useState(() => handleCreatePostButton);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setInitialValues({
      id: undefined,
      title: "",
      description: "",
    });
    setFormHandler(() => handleCreatePostButton);
    setIsOpen(false);
  };

  return (
    <div>
      <Box mt={4} mb={8}>
        <Flex justifyContent="flex-end" mt={8}>
          <Button colorScheme="green" onClick={onOpen}>
            Criar Post
          </Button>
        </Flex>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          headerText="Criar Post"
        >
          <PostForm
            resetForm={onClose}
            initialValues={initialValues}
            handleSubmit={formHandler}
          />
        </Modal>
        <PostCard posts={posts}></PostCard>
      </Box>
    </div>
  );
}
