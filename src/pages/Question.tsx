import { useEffect, useState } from 'react';
import { Backdrop, CircularProgress, Container } from '@mui/material';
import ExibitionList from '../components/exibition-modal/ExibitionList';
import CreateCard from '../components/exibition-modal/CreateCard';
import ExibitionModal from '../components/exibition-modal/ExibitionModal';
import { getUserByUid } from '../services/user/user.service';
import { userMock } from '../mocks/user.mock';
import { createQuestion, createQuestionAnswer, getQuestions } from '../services/question/question.service';
import type { IExibitionModal } from '../interfaces/exibition-modal.interface';
import { questionBuilder } from '../builders/question.builder';
import { userBuilder } from '../builders/user.builder';
import type { IExibitionCard } from '../interfaces/exibition-card.interface';

const Question = () => {
  const [questions, setQuestions] = useState<IExibitionCard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(userMock);
  const [loading, setLoading] = useState(false);
  
  const fetchData = async () => {
    try {
      const questionData = await getQuestions();
      const questionsBuilded = questionBuilder(questionData);
      console.info(questionsBuilded)
      const user = await getUserByUid()
      if(user) {
        const currentUser = userBuilder(user)
        setCurrentUser(currentUser)
      }      
      setQuestions(questionsBuilded ?? []);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const createQuestionPlaceHolder = "Faça uma pergunta"

  const handleQuestionPost = async (data: IExibitionModal) => {
    setLoading(true);
    try {
      const questionData = {
        description: data.text,
        neighborhoodId: data.neighborhood?.id!
      }
      await createQuestion(questionData);
      await fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao criar question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (id: string, commentText: string) => {
    try {
      const questionAnswer = {
        questionId : id,
        description: commentText,
        userId: currentUser.id
      }
      await createQuestionAnswer(questionAnswer);
      await fetchData();
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <CreateCard 
          currentUser={currentUser}
          onOpenModal={handleOpenModal}
          placeholder={createQuestionPlaceHolder}
        />
        <ExibitionModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleQuestionPost}
          currentUser={currentUser}
          placeholderTextField="Qual é sua dúvida?"
          placeholderNeighborhood="Sua dúvida é sobre onde?"
          neighborhoodRequired={true}
        />
        <ExibitionList
          itens={questions}
          allowImages={false}
          onAddComment={handleAddComment}
          showLocation={false}
        />
      </Container>    
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Question;