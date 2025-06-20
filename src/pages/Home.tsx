import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import PostList from '../components/post/PostList';
import CreatePostCard from '../components/post/CreatePost';
import { createPost, createPostAnswer, getPosts } from '../services/post/post.service';
import type { Post } from '../components/post/post.interface';
import CreatePostModal from '../components/post/CreatePostModal';
import { getUserByUid } from '../services/user/user.service';
import { userMock } from '../mocks/user.mock';
import type { ICreatePost } from '../interfaces/post.interface';
import { neighborhoodIdMock, postImageMock } from '../mocks/post.mock';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(userMock)
  
  const fetchData = async () => {
    try {
      const postData = await getPosts();
      const user = await getUserByUid()
      if(user) {
        const currentUser = {
          id: user.id,
          name: user.name,
          avatarUrl: user.avatarUrl,
          neighborhood: user.neighborhood?.name ?? "Fora de Maringá",
          neighborhoodId: user.neighborhoodId
        }
        setCurrentUser(currentUser)
      }      
      setPosts(postData ?? []);

    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreatePost = async (data: ICreatePost) => {
    const post = {
      content: data.text,
      neighborhoodId: neighborhoodIdMock,
      userId: currentUser.id,
      image: postImageMock
    }
    await createPost(post);
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