import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';

type CreateCardProps = {
  currentUser: {
    avatarUrl: string;
    name: string;
  };
  placeholder: string;
  onOpenModal?: () => void;
  
};

const CreateCard = ({ currentUser, onOpenModal, placeholder }: CreateCardProps) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent sx={{ pb: 0, "& .MuiButton-root": { mb: 0 } }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={currentUser.avatarUrl} sx={{ mr: 1.5 }} />
          <Box
            onClick={onOpenModal}
            sx={{
              flex: 1,
              backgroundColor: "#f3f2ef",
              borderRadius: 30,
              padding: "10px 16px",
              cursor: "pointer",
              border: "1px solid #ccc",
              "&:hover": { backgroundColor: "#e6e6e6" },
            }}
          >
            <Typography color="textSecondary">{placeholder}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreateCard;