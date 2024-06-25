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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

import { useContext } from "react";
import { BiChat, BiDislike, BiLike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { User } from "../../hooks/post/post.types";
import AuthContext from "../../store/auth/auth.context-provider";

type Post = {
  id: number;
  title: string;
  userId: number;
  likedByUser: boolean;
  dislikedByUser: boolean;
  viewsCount: number;
  likesCount: number;
  notLikedCount: number;
  description: string;
  user: User;
  created_at: Date;
};
export type PostCardProps = {
  data: Post[];
  handleLike: (id: number) => void;
  handleDislike: (id: number) => void;
  handleDeletePost: (id: number) => void;
};

export default function PostCard({
  data,
  handleLike,
  handleDislike,
  handleDeletePost,
}: PostCardProps) {
  const { authState } = useContext(AuthContext);
  return (
    <Box>
      {data?.length > 0 &&
        data?.map((post: Post) => (
          <Card key={post.id} w={"xl"} mt={5} mb={5}>
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="5" alignItems="center" flexWrap="wrap">
                  <Avatar
                    size="sm"
                    name={post?.user?.name}
                    src="https://bit.ly/sage-adebayo"
                  />
                  <Box>
                    <Heading size="sm">{post?.user?.name}</Heading>
                  </Box>

                  <Box>
                    <Heading size="md">{post?.title}</Heading>
                  </Box>
                </Flex>
                <Flex
                  flex="1"
                  gap="4"
                  alignItems="center"
                  flexWrap="wrap"
                ></Flex>
                {authState?.isLoggedIn && authState?.userId == post.userId && (
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      variant="ghost"
                      colorScheme="gray"
                      aria-label="See menu"
                      icon={<BsThreeDotsVertical />}
                    />
                    <MenuList>
                      <MenuItem onClick={() => handleDeletePost(post.id)}>
                        Delete
                      </MenuItem>
                      <MenuItem>Edit</MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>{post?.description}</Text>
            </CardBody>
            {/* <Image
              w={"100%"}
              objectFit="cover"
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Chakra UI"
            /> */}

            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              <Button
                key="like"
                flex="1"
                variant="ghost"
                colorScheme={post.likedByUser ? "blue" : "gray"}
                leftIcon={<BiLike />}
                onClick={() => handleLike(post.id)}
              >
                {post.likesCount} | {post.likedByUser ? "Liked" : "Like"}
              </Button>
              <Button
                key="comment"
                flex="1"
                variant="ghost"
                leftIcon={<BiChat />}
              >
                Comment
              </Button>
              <Button
                key="dislike"
                flex="1"
                variant="ghost"
                colorScheme={post.dislikedByUser ? "blue" : "gray"}
                leftIcon={<BiDislike />}
                onClick={() => handleDislike(post.id)}
              >
                {post.notLikedCount} |{" "}
                {post.notLikedCount ? "Disliked" : "Dislike"}
              </Button>
            </CardFooter>
          </Card>
        ))}
    </Box>
  );
}
