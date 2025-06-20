import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { PostCardProps } from './post.interface';
import PostCommentsBox from './PostComentBox';

const PostCard = ({ post, allowImages = true, onAddComment }: PostCardProps) => {
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Avatar src={post.user.avatarUrl} />}
        action={<IconButton><MoreVertIcon /></IconButton>}
        title={`${post.user.name} | ${post.user.neighborhood?.name ?? "Fora de Maringá"}`} 
        subheader={`${new Date(post.createdAt).toLocaleDateString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })}`}
      />

      {allowImages && post.image && (
        <Box
          sx={{
            width: '100%',
            height: '300px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={post.image}
            alt="Background blur"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(10px)',
              opacity: 0.3,
            }}
          />
          <CardMedia
            component="img"
            image={post.image}
            alt="Post image"
            sx={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              height: '300px',
              objectFit: 'contain',
            }}
          />
        </Box>
      )}
      {post.neighborhood?.name && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ px: 2, pt: 1, display: 'block' }}
        >
          Em {post.neighborhood.name}
        </Typography>
      )}      
      <CardContent sx={{ pb: 0 }}>
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>

      <CardActions sx={{ pt: 0 }} disableSpacing>
        <IconButton aria-label="Curtir">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton aria-label="Comentar">
          <ChatBubbleOutlineIcon /> {post.postAnswers?.length}
        </IconButton>
      </CardActions>

      <PostCommentsBox
        postId={post.id}
        initialComments={post.postAnswers}
        onAddComment={(text) => onAddComment(post.id, text)}
      />
    </Card>
  );
};

export default PostCard;