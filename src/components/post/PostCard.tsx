import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import type { PostCardProps } from './post.interface';



const PostCard = ({ post, allowImages = true, onAddComment }: PostCardProps) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText('');
    console.info(post)
  };

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Avatar src={post.user.avatarUrl} />}
        action={<IconButton><MoreVertIcon /></IconButton>}
        title={post.user.name}
        subheader={`${post.user.neighborhood.name} • ${new Date(post.createdAt).toLocaleDateString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })}`}
      />

      {allowImages && post.image && (
        <CardMedia component="img" height="300" image={post.image} alt="Post image" />
      )}

      <CardContent>
        <Typography variant="body1">{post.text}</Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="Curtir">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton aria-label="Comentar">
          <ChatBubbleOutlineIcon /> {post.postAnswers?.length}
        </IconButton>
      </CardActions>

      <Box sx={{ px: 2, pb: 2 }}>
        {post.postAnswers.map((answers) => (
          <Box key={answers.id} sx={{ display: 'flex', mb: 1 }}>
            <Avatar src={answers.user.avatarUrl} sx={{ width: 24, height: 24, mr: 1 }} />
            <Box>
              <Typography variant="caption" fontWeight="bold">
                {answers.user.name}
              </Typography>
              <Typography variant="body2">{answers.description}</Typography>
            </Box>
          </Box>
        ))}

        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Escreva um comentário..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button variant="contained" onClick={handleCommentSubmit}>
            Enviar
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default PostCard;