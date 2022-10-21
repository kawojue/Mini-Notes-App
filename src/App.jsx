import { format } from 'date-fns'
import { fillID } from './fillID'
import Post from './components/Post'
import About from './components/About'
import Posts from './components/Posts'
import { useState, useEffect } from 'react'
import Contents from './components/Contents'
import EditPost from './components/EditPost'
import NotFound from './components/NotFound'
import Structure from './components/Structure'
import { Routes, Route, useNavigate } from 'react-router-dom'


function App() {
  const url = "http://localhost:5500/posts"
  const getFullDateTime = format(new Date(), 'MMMM dd, yyyy pp')
  const nav = useNavigate()
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState("")
  const [search, setSearch] = useState("")
  const [content, setContent] = useState("")
  const [editTitle, setEditTitle] = useState("")
  const [fetchErr, setFetchErr] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [editContent, setEditContent] = useState("")
  const [countContent, setCountContent] = useState(0)
  const [countEditContent, setCountEditContent] = useState(0)

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
    const splitContent = content.split('')
    const splitEditContent = editContent.split('')
    setCountContent(splitContent.length)
    setCountEditContent(splitEditContent.length)
  }, [content, editContent])

  const handleSearch = posts.filter(post =>
    ((post.title).toLowerCase()).includes(search.toLowerCase()) ||
    ((post.content).toLowerCase()).includes(search.toLowerCase()) ||
    ((post.datetime).toLowerCase()).includes(search.toLowerCase()))

  const addPost = async e => {
    e.preventDefault()

    const id = fillID(posts)
    const newPost = { id, title: title.trim(), content: content.trim(), datetime: getFullDateTime }
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

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Structure search={search} onSetSearch={setSearch} />}>
          <Route index element={<Contents posts={handleSearch} fetchErr={fetchErr} isLoading={isLoading} />} />
          <Route path="home" element={<Contents posts={handleSearch} fetchErr={fetchErr} isLoading={isLoading} />} />
          <Route path="post" element={<Posts title={title} setTitle={setTitle} content={content} setContent={setContent} countContent={countContent} onAddPost={addPost} />} />
          <Route path="about" element={<About />} />
          <Route path="/post/:id" element={<Post posts={posts} setPosts={setPosts} url={url} />} />
          <Route path="/post/:id/edit" element={<EditPost url={url} posts={posts} setPosts={setPosts} editTitle={editTitle} setEditTitle={setEditTitle} editContent={editContent} setEditContent={setEditContent} getFullDateTime={getFullDateTime} countEditContent={countEditContent} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App