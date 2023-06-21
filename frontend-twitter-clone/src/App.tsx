import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import Post from './pages/Post';
import Notification from './pages/Notification';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts/:postId" element={<Post />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/notifications" element={<Notification />} />
      </Routes>
    </Layout>
  );
}

export default App;
