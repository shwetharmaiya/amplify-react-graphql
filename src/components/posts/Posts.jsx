// import Post from "../post/Post";
import "./posts.scss";
import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listPosts } from "../../graphql/queries";
import {
  createPost as createPostMutation,
  deletePost as deletePostMutation,
} from "../../graphql/mutations";

const Posts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const apiData = await API.graphql({ query: listPosts });
    const postsFromAPI = apiData.data.listPosts.items;
    setPosts(postsFromAPI);
  }

  async function createPost(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      title: form.get("title"),
      text: form.get("text"),
    };
    await API.graphql({
      query: createPostMutation,
      variables: { input: data },
    });
    fetchPosts();
    event.target.reset();
  }

  async function deletePost({ id }) {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
    await API.graphql({
      query: deletePostMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="posts">
      <Heading level={1}>My Posts </Heading>
      <View as="form" margin="3rem 0" onSubmit={createPost}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="title"
            placeholder="post title"
            label="post title"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="text"
            placeholder="post text"
            label="post text"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create post
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Posts</Heading>
      <View margin="3rem 0">
        {posts.map((post) => (
          <Flex
            key={post.id || post.title}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {post.text}
            </Text>
            <Text as="span">{post.description}</Text>
            <Button variation="link" onClick={() => deletePost(post)}>
              Delete post
            </Button>
          </Flex>
        ))}
      </View>
      {/* <Button onClick={signOut}>Sign Out</Button> */}
    </View>
  );
};

export default withAuthenticator(Posts);
