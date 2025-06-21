import { Stack } from '@mui/material';
import ExibitionCard from './ExibitionCard';
import type { IExibitionCard } from '../../interfaces/exibition-card.interface';

export interface ExibitionListProps {
  itens: IExibitionCard[];
  allowImages?: boolean;
  showLocation: boolean; 
  onAddComment: (id: string, commentText: string) => void;
}


const ExibitionList = ({ itens, allowImages = true, onAddComment, showLocation }: ExibitionListProps) => {
  return (
    <Stack spacing={2}>
      {itens.map((item) => (
        <ExibitionCard
          key={item.id}
          props={item}
          allowImages={allowImages}
          showLocation={showLocation}
          onAddComment={onAddComment}
        />
      ))}
    </Stack>
  );
};

export default ExibitionList;
