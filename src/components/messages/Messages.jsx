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
import { listMessages } from "../../graphql/queries";
import {
  createMessage as createMessageMutation,
} from "../../graphql/mutations";

const Messages = ({ userId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    const apiData = await API.graphql({ query: listMessages });
    const messagesFromAPI = apiData.data.listMessages.items;
    setMessages(messagesFromAPI);
  }

  async function createMessage(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      title: form.get("title"),
      text: form.get("text"),
    };
    await API.graphql({
      query: createMessageMutation,
      variables: { input: data },
    });
    fetchMessages();
    event.target.reset();
  }

  // async function deleteMessage({ id }) {
  //   const newMessages = messages.filter((message) => message.id !== id);
  //   setMessages(newMessages);
  //   await API.graphql({
  //     query: deleteMessageMutation,
  //     variables: { input: { id } },
  //   });
  // }

  return (
    <View className="messages">
      <Heading level={1}>Current Messages</Heading>
      <View margin="3rem 0">
        {messages.map((message) => (
          <Flex
            key={message.username}
            direction="row"
          >
            <Text as="strong" fontWeight={700}>
              {message.text}
            </Text>
            <Text as="span">{message.description}</Text>
           </Flex>
        ))}
      </View>
      <View as="form" margin="3rem 0" onSubmit={createMessage}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="text"
            placeholder="post text"
            label="post text"
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Send message
          </Button>
        </Flex>
      </View>
    </View>
  );
};

export default withAuthenticator(Messages);
