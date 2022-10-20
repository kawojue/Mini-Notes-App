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
  const url = "http://localhost:5500/posts"
  const getFullDate = format(new Date(), 'MMMM dd, yyyy pp')
  const nav = useNavigate()
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [search, setSearch] = useState("")
  const [counter, setCounter] = useState(0)
  const [fetchErr, setFetchErr] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      setPosts(data)
    } catch (err) {
      setFetchErr("Please, reload the page.")
    }
  }

  useEffect(() => {
    setTimeout(() => {
      (async () => await fetchPosts())()
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const splitted = content.split('')
    setCounter(splitted.length)
  }, [content])

  const addPost = async e => {
    e.preventDefault()

    const id = fillID(posts)
    const newPost = { id, title: title.trim(), content: content.trim(), date: getFullDate }
    setPosts([...posts, newPost])

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })

    nav('/')
  }

  const handleSearch = posts.filter(post => ((post.title).toLowerCase()).includes(search.toLowerCase()))

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Structure search={search} onSetSearch={setSearch} />}>
          <Route index element={<Contents posts={handleSearch} fetchErr={fetchErr} isLoading={isLoading} />} />
          <Route path="home" element={<Contents posts={handleSearch} fetchErr={fetchErr} isLoading={isLoading} />} />
          <Route path="post" element={<Posts title={title} setTitle={setTitle} content={content} setContent={setContent} counter={counter} onAddPost={addPost} />} />
          <Route path="about" element={<About />} />
          <Route path="/post/:id" element={<Post posts={posts} setPosts={setPosts} url={url} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App