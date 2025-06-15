import {
  Avatar,
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
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>

      <CardActions disableSpacing>
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