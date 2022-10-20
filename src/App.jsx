import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { fillID } from './fillID'
import Contents from "./components/Contents"
import Post from './components/Post'
import Posts from './components/Posts'
import About from './components/About'
import Structure from './components/Structure'
import NotFound from './components/NotFound'

function App() {
  const getFullDate = format(new Date(), 'MMMM dd, yyyy pp')
  const API_URL = "http://localhost:5500/posts"
  const nav = useNavigate()
  const [search, setSearch] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [fetchErr, setFetchErr] = useState(null)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()
        if (!res.ok) throw new Error("Please, reload the page.")
        setPosts(data)
      } catch (err) {
        setFetchErr("Please, reload the page.")
      }
    }


    setTimeout(() => {
      (async () => await fetchPosts())()
      setIsLoading(false)
    }, 1000)
  }, [])

  const addPost = e => {
    e.preventDefault()
    const newPost = { id, title: title.trim(), content: content.trim(), date: getFullDate }
    const id = fillID(posts)
    setPosts([...posts, newPost])

    nav('/')
    setContent("")
    setTitle("")
  }

  const handleSearch = posts.filter(post => ((post.title).toLowerCase()).includes(search.toLowerCase()))

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Structure search={search} onSetSearch={setSearch} />}>
          <Route index element={<Contents posts={handleSearch} fetchErr={fetchErr} isLoading={isLoading} />} />
          <Route path="home" element={<Contents posts={handleSearch} fetchErr={fetchErr} isLoading={isLoading} />} />
          <Route path="post" element={<Posts title={title} setTitle={setTitle} content={content} setContent={setContent} onAddPost={addPost} />} />
          <Route path="about" element={<About />} />
          <Route path="/post/:id" element={<Post posts={posts} setPosts={setPosts} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
