import { useEffect, useState } from 'react';
import { Backdrop, CircularProgress, Container } from '@mui/material';
import ExibitionList from '../components/exibition-modal/ExibitionList';
import CreateCard from '../components/exibition-modal/CreateCard';
import { createPost, createPostAnswer, getPosts } from '../services/post/post.service';
import ExibitionModal from '../components/exibition-modal/ExibitionModal';
import { getUserByUid } from '../services/user/user.service';
import { userMock } from '../mocks/user.mock';
import { compressImage } from '../utils/compress-image.service';
import type { IExibitionModal } from '../interfaces/exibition-modal.interface';
import { postBuilder } from '../builders/post.builder';
import type { IExibitionCard } from '../interfaces/exibition-card.interface';
import { userBuilder } from '../builders/user.builder';

const Home = () => {
  const [posts, setPosts] = useState<IExibitionCard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(userMock);
  const [loading, setLoading] = useState(false);
  
  const fetchData = async () => {
    try {
      const postData = await getPosts();
      const postsBuilded = postBuilder(postData);
      console.info(postsBuilded)
      const user = await getUserByUid()
      if(user) {
        const currentUser = userBuilder(user)
        setCurrentUser(currentUser)
      }      
      setPosts(postsBuilded ?? []);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const createPostPlaceHolder = "Comece uma publicação"

  const handleCreatePost = async (data: IExibitionModal) => {
    setLoading(true);
    const formData = new FormData();

    formData.append('content', data.text);
    formData.append('userId', currentUser.id);

    if (data.neighborhood) {
      formData.append('neighborhoodId', data.neighborhood.id);
    }

    if (data.image) {
      const compressedFile = await compressImage(data.image, { maxSizeMB: 0.5, maxWidthOrHeight: 1024 });
      formData.append('postImage', compressedFile);
      formData.append('postImageContentType', compressedFile.type);
    }

    try {
      await createPost(formData);
      await fetchData();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao criar post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (id: string, commentText: string) => {
    try {
      const postAnswer = {
        postId: id,
        description: commentText,
        userId: currentUser.id
      }
      await createPostAnswer(postAnswer);
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
          placeholder={createPostPlaceHolder}
        />
        <ExibitionModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleCreatePost}
          currentUser={currentUser}
          placeholderTextField="No que você está pensando?"
          placeholderNeighborhood="Adicione a localização (bairro)"
          neighborhoodRequired={false}          
        />
        <ExibitionList
          itens={posts}
          allowImages={true}
          onAddComment={handleAddComment}
          showLocation={true}
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

export default Home;