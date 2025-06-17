import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import PostList from '../components/post/PostList';
import CreatePostCard from '../components/post/CreatePost';
import { createPost, createPostAnswer, getPosts } from '../services/post/post.service';
import type { Post } from '../components/post/post.interface';
import CreatePostModal from '../components/post/CreatePostModal';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fetchData = async () => {
    try {
      const postData = await getPosts();
      setPosts(postData ?? []);

      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar os dados. Por favor, tente novamente mais tarde.');
      console.error('Erro ao buscar dados:', err);
    } finally {
      setLoading(false);
    }
  }
  console.log(loading, error)

  useEffect(() => {
    fetchData();
  }, [])

  const currentUser = {
    id: 'e9b12a1a-7e39-4bb4-a109-30e645eeccdc',
    name: 'João Brasil',
    avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    neighborhood: 'Centro',
    neighborhoodId: 'e5374319-4468-44da-bda8-fd87420f6cb4',
  }

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreatePost = async (data: { text: string; image?: File }) => {
    const dataPost = {
      content: data.text,
      neighborhoodId: currentUser.neighborhoodId,
      userId: currentUser.id,
      image: 'https://www.parana.pr.gov.br/sites/portal-parana/arquivos_restritos/files/imagem/2019-08/turismo-geral7_1.jpg'
    }
    await createPost(dataPost);
    await fetchData();
    handleCloseModal();
  };

  const handleAddComment = async (postId: string, commentText: string) => {
    try {
      const postAnswer = {
        postId,
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <CreatePostCard currentUser={currentUser} onOpenModal={handleOpenModal} />
      <CreatePostModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreatePost}
        currentUser={currentUser}
      />
      <PostList posts={posts} allowImages={true} onAddComment={handleAddComment} />
    </Container>
  );
};

export default Home;