import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ChatContainer } from '../../components/messages/ChatContainer';
import { ImageNavigation } from '../../components/images/ImageNavigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUser,
  updateConversations
} from '../../storage/reducers/conversation';
import { getMessages } from '../../storage/session/utils';
import { AppBar, Toolbar, Typography } from '@mui/material';

export async function loader({ params }) {
  const user = params.userId;
  return user;
}

export const QuizPage = () => {
  const dispatch = useDispatch();
  const user = useLoaderData();
  const userId = useSelector((state) => state.conversations.userId);

  useEffect(() => {
    if (userId) {
      const conversations = getMessages({ userId });
      dispatch(updateConversations(conversations));
    } else {
      dispatch(updateUser(user));
    }
  }, [userId]);

  return (
    <Box
      sx={{
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#7230C7', height: '64px' }}>
        <Toolbar>
          <Typography variant="h6">EveryoneArtist</Typography>
        </Toolbar>
      </AppBar>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
        sx={{ height: 'calc(100% - 64px)' }}>
        <Box
          gridColumn="span 10"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '7px',
            backgroundColor: '#fffdfa',
            boxShadow: 'rgb(149 157 165 / 20%) 0px 8px 24px',
            paddingLeft: '10px',
            minHeight: 0
          }}>
          <ChatContainer />
        </Box>
        <Box gridColumn="span 2" sx={{ height: '100%', minHeight: 0 }}>
          <ImageNavigation />
        </Box>
      </Box>
    </Box>
  );
};
