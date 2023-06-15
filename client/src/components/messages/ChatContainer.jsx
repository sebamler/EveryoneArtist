import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { GenerateButton } from './GenerateButton';
import { Messages } from './Messages';
import { generateImage } from '../../storage/reducers/image';
import { sendMessage, forkChat } from '../../storage/reducers/conversation';
import { selectMessages } from '../../storage/selectors';

export const ChatContainer = () => {
  const dispatch = useDispatch();
  const activeConversationId = useSelector(
    (state) => state.conversations.activeConversationId
  );
  const messages = useSelector(selectMessages);
  const onGenerate = () => {
    dispatch(generateImage({ messages, conversationId: activeConversationId }));
  };

  const onAnswer = ({ answer, isNewChat, questionIndex }) => {
    if (isNewChat) {
      // start new chat
      dispatch(forkChat({ answer, questionIndex, messages }));
    } else {
      dispatch(sendMessage({ answer, messages }));
    }
  };

  return (
    <Box sx={{ height: 'inherit' }}>
      <Messages messages={messages} onAnswer={onAnswer} />
      <GenerateButton onClick={onGenerate} />
    </Box>
  );
};
