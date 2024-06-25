import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Post, PostDefined, PostFormCreate } from "../hooks/post/post.types";
import usePostApi from "../hooks/post/use-post-api";
import Modal from "./Modal";
import { Pagination } from "./Pagination/Pagination";
import PostCard from "./PostCard";
import PostForm from "./PostForm";

export default function PostsComponent() {
  const {
    page,
    setPage,
    limit,
    posts,
    fetchPostsPaginated,
    deletePost,
    createPost,
    updatePost,
    likePost,
    unlikePost,
  } = usePostApi();

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    fetchPostsPaginated();
  }, [page, limit]);

  const handleUpdatePostButton = (values: Post) => {
    updatePost({
      id: values.id,
      title: values?.title,
      description: values?.description,
    });
    onClose();
  };

  const handleCreatePostButton = (values: PostFormCreate) => {
    createPost({
      title: values?.title,
      description: values?.description,
      image: values?.image,
    });
    onClose();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [modalFormTitle, setModalFormTitle] = useState("Criar Post");
  const [formSubmitTitle, setFormSubmitTitle] = useState("Criar Post");
  const [initialValues, setInitialValues] = useState({
    id: 0,
    title: "",
    description: "",
  });

  const [formHandler, setFormHandler] = useState(() => handleCreatePostButton);
  const onOpen = () => {
    setIsOpen(true);
  };

  const onOpenEditModal = (post: PostDefined) => {
    setFormSubmitTitle("Salvar");
    setModalFormTitle("Editar Post");
    setFormHandler(() => handleUpdatePostButton);
    setInitialValues({
      id: post.id,
      title: post?.title,
      description: post?.description,
    });
    setIsOpen(true);
  };
  const onClose = () => {
    setInitialValues({
      id: 0,
      title: "",
      description: "",
    });
    setFormHandler(() => handleCreatePostButton);
    setIsOpen(false);
  };

  return (
    <div>
      <Box
        mt={4}
        mb={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Flex justifyContent="flex-end" mt={8}>
          <Button colorScheme="green" onClick={onOpen}>
            Criar
          </Button>
        </Flex>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          headerText={modalFormTitle}
        >
          <PostForm
            submitTitle={formSubmitTitle}
            resetForm={onClose}
            initialValues={initialValues}
            handleSubmit={formHandler}
          />
        </Modal>
        <Box display="flex" justifyContent="center" mt={8} mb={8}>
          <PostCard
            data={posts?.data}
            handleDeletePost={deletePost}
            handleEditPost={onOpenEditModal}
            handleLike={likePost}
            handleDislike={unlikePost}
          ></PostCard>
        </Box>
        <Pagination
          totalCountOfRegisters={posts?.meta?.total ?? 0}
          onPageChange={handlePageChange}
          currentPage={page}
          registersPerPage={limit}
          lastPage={posts?.meta?.last_page ?? 0}
        />
      </Box>
    </div>
  );
}
