import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import PostList from '../components/post/PostList';
import CreatePostCard from '../components/post/CreatePost';
import { getPosts } from '../services/post.service';
import type { Post } from '../components/post/post.interface';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  
  const [posts, setPosts] = useState<Post[]>([]);
  
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
    id: 'u1',
    name: 'João Brasil',
    avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    neighborhood: 'Centro',
  }



  const handleOpenModal = () => {
    console.log('Abrir modal de criação de post...');
  };

  const handleAddComment = () => {
    console.log('Abrir modal de criação de comentario...');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <CreatePostCard currentUser={currentUser} onOpenModal={handleOpenModal} />
      <PostList posts={posts} allowImages={true} onAddComment={handleAddComment} />
    </Container>
  );
};

export default Home;