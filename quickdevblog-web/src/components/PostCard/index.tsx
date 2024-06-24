import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";

import { BiChat, BiDislike, BiLike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ApiPaginatedResponse } from "../../hooks/api/api.types";
import { Post } from "../../hooks/post/post.types";

export default function PostCard({
  posts,
}: ApiPaginatedResponse<Post | undefined>) {
  console.log(posts);
  return (
    posts?.data?.length > 0 &&
    posts?.data.map((post: Post) => (
      <Card maxW="xl" m={5}>
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                name={post?.user?.name}
                src="https://bit.ly/sage-adebayo"
              />

              <Box>
                <Heading size="sm">{post?.user?.name}</Heading>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>{post?.description}</Text>
        </CardBody>
        <Image
          objectFit="cover"
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Chakra UI"
        />

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
            Like
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
            Comment
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<BiDislike />}>
            Dislike
          </Button>
        </CardFooter>
      </Card>
    ))
  );
}
