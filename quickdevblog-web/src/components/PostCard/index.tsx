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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

import { useContext } from "react";
import { BiChat, BiDislike, BiLike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PostDefined } from "../../hooks/post/post.types";
import AuthContext from "../../store/auth/auth.context-provider";
import { convertPathToApiPath } from "../../utils/transformers";

export type PostDefinedCardProps = {
  data: PostDefined[];
  handleLike: (id: number) => void;
  handleEditPost: (id: PostDefined) => void;
  handleDislike: (id: number) => void;
  handleDeletePostDefined: (id: number) => void;
};

export default function PostDefinedCard({
  data,
  handleLike,
  handleDislike,
  handleEditPost,
  handleDeletePostDefined,
}: PostDefinedCardProps) {
  const { authState } = useContext(AuthContext);
  return (
    <Box>
      {data?.length > 0 &&
        data?.map((PostDefined: PostDefined) => (
          <Card
            key={PostDefined.id}
            w={{ base: "sm", md: "md", lg: "xl" }}
            mt={5}
            mb={5}
          >
            <CardHeader>
              <Flex>
                <Flex flex="1" gap="3" alignItems="center" flexWrap="wrap">
                  <Avatar
                    size="sm"
                    name={PostDefined?.user?.name}
                    src="https://bit.ly/sage-adebayo"
                  />
                  <Box>
                    <Heading size="sm">{PostDefined?.user?.name}</Heading>
                  </Box>
                </Flex>
                {authState?.isLoggedIn &&
                  authState?.userId == PostDefined.userId && (
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        variant="ghost"
                        colorScheme="gray"
                        aria-label="See menu"
                        icon={<BsThreeDotsVertical />}
                      />
                      <MenuList>
                        <MenuItem
                          onClick={() =>
                            handleDeletePostDefined(PostDefined.id)
                          }
                        >
                          Delete
                        </MenuItem>
                        <MenuItem onClick={() => handleEditPost(PostDefined)}>
                          Edit
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
              </Flex>
              <Heading mt={4} size={"md"}>
                {PostDefined?.title}
              </Heading>
            </CardHeader>
            <CardBody>
              <Text mb={5}>{PostDefined?.description}</Text>
            </CardBody>
            <Image
              w={{ base: "sm", md: "md", lg: "xl" }}
              objectFit="cover"
              src={convertPathToApiPath(PostDefined?.image)}
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
              <Button
                key="like"
                flex="1"
                variant="ghost"
                colorScheme={PostDefined.likedByUser ? "blue" : "gray"}
                leftIcon={<BiLike />}
                onClick={() => handleLike(PostDefined.id)}
              >
                {PostDefined.likesCount} |{" "}
                {PostDefined.likedByUser ? "Liked" : "Like"}
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
                colorScheme={PostDefined.dislikedByUser ? "blue" : "gray"}
                leftIcon={<BiDislike />}
                onClick={() => handleDislike(PostDefined.id)}
              >
                {PostDefined.notLikedCount} |{" "}
                {PostDefined.notLikedCount ? "Disliked" : "Dislike"}
              </Button>
            </CardFooter>
          </Card>
        ))}
    </Box>
  );
}
