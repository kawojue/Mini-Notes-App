import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import Contents from "./components/Contents"
import Posts from './components/Posts'
import About from "./components/About"
import Structure from './components/Structure'
import NotFound from './components/NotFound'

function App() {
  const getFullDate = format(new Date(), 'MMMM dd, yyyy pp')

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "my first post",
      content: "Lorem ipsum dolor sit amet consectetur...",
      date: getFullDate
    }
  ])



  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Structure />}>
          <Route path="/" element={<Contents posts={posts} />} />
          <Route path="home" element={<Contents posts={posts} />} />
          <Route path="post" element={<Posts posts={posts} onSetPosts={setPosts} getFullDate={getFullDate} />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
