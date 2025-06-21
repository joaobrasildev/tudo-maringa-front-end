import { useState } from 'react';
import { Box, Avatar, Typography, TextField, Button } from '@mui/material';
import type { IExibitionComent } from '../../interfaces/exibition-modal.interface';

interface PostCommentsBoxProps {
  id: string;
  initialComments: IExibitionComent[];
  onAddComment: (commentText: string) => void;
}

const ExibitionCommentBox = ({ initialComments, onAddComment }: PostCommentsBoxProps) => {
  const [commentText, setCommentText] = useState('');
  const [showAll, setShowAll] = useState(false);
  const visibleComments = showAll ? initialComments : initialComments.slice(0, 1);
  const handleSubmit = () => {
    if (!commentText.trim()) return;
    onAddComment(commentText);
    setCommentText('');
  };

  const handleToggleComments = () => setShowAll((prev) => !prev);

  return (
    <Box sx={{ px: 2, pb: 2 }}>
      {visibleComments.map((comment) => (
        <Box key={comment.id} sx={{ display: 'flex', mb: 1 }}>
          <Avatar src={comment.user.avatarUrl} sx={{ width: 24, height: 24, mr: 1 }} />
          <Box>
            <Typography variant="caption" fontWeight="bold">
              {comment.user.name}
            </Typography>
            <Typography variant="body2">{comment.description}</Typography>
          </Box>
        </Box>
      ))}

      {initialComments.length > 1 && (
        <Typography
          variant="caption"
          color="primary"
          sx={{ cursor: 'pointer' }}
          onClick={handleToggleComments}
        >
          {showAll ? 'Ver menos comentários' : 'Ver mais comentários'}
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Escreva um comentário..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default ExibitionCommentBox;