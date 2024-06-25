import { Box, Button, Card, Flex } from "@chakra-ui/react";
import { useState } from "react";

import Modal from "./Modal";
import PostForm from "./PostForm";

type CommentsComponentProps = {
  postId: number;
  onClose: () => void;
  formHandler: (values: any) => void;
  onOpen: () => void;
};

export default function CommentsComponent({
  postId,
  onOpen,
  formHandler,
  onClose,
}: CommentsComponentProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [initialValues, setInitialValues] = useState({
    id: undefined,
    title: "",
    description: "",
  });

  return (
    <Card w={"xl"} mt={5} mb={5}>
      <Box mt={4} mb={8} display="flex" flexDirection="column">
        <Flex justifyContent="flex-end" p={5} mt={8}>
          <Button colorScheme="green" onClick={onOpen}>
            Criar Comentário
          </Button>
        </Flex>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          headerText="Criar Comentário"
        >
          <PostForm
            resetForm={onClose}
            initialValues={initialValues}
            handleSubmit={formHandler}
          />
        </Modal>
        <Box display="flex" justifyContent="center" mt={8} mb={8}></Box>
      </Box>
    </Card>
  );
}
