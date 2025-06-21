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
import ExibitionCommentBox from './ExibitionComentBox';
import type { IExibitionCard } from '../../interfaces/exibition-card.interface';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export interface ExibitionCardProps {
  props: IExibitionCard;
  allowImages?: boolean;
  showLocation: boolean;
  onAddComment: (id: string, commentText: string) => void;
}

const ExibitionCard = ({ props, allowImages = true, showLocation = false, onAddComment }: ExibitionCardProps) => {
  return (
    <Card variant="outlined">
      <CardHeader
        sx={{ mb: 0, pb: 0.8 }}
        avatar={<Avatar src={props.user.avatarUrl} />}
        action={<IconButton><MoreVertIcon /></IconButton>}
        title={`${props.user.name} | ${props.user.neighborhood?.name ?? "Fora de Maringá"}`} 
        subheader={`${new Date(props.createdAt).toLocaleDateString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })}`}
      />

      {allowImages && props.image && (
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
            src={props.image}
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
            image={props.image}
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
      <Typography
        variant="caption"
        color="primary.main"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.3,
          px: 1.5,
          pt: 0.3,
          mb: 0,
        }}
      >
        <LocationOnIcon sx={{ fontSize: 16, color: 'primary.main', mr: 0.5 }} />
        {showLocation ? 'Em' : 'Sobre:'} {props.neighborhood?.name ?? 'Maringá'}
      </Typography>

      <CardContent sx={{ pt: 0, mt: 0, pb: 0 }}>
        <Typography variant="body1" sx={{ m: 0, p: 0 }}>
          {props.content}
        </Typography>
      </CardContent>

      <CardActions sx={{ pt: 0 }} disableSpacing>
        <IconButton aria-label="Curtir">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton aria-label="Comentar">
          <ChatBubbleOutlineIcon /> {props.comments?.length}
        </IconButton>
      </CardActions>

      <ExibitionCommentBox
        id={props.id}
        initialComments={props.comments}
        onAddComment={(text) => onAddComment(props.id, text)}
      />
    </Card>
  );
};

export default ExibitionCard;