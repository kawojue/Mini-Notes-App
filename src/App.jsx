import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
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
  const [posts, setPosts] = useState([])
  const [fetchErr, setFetchErr] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(API_URL)
        return await res.json()
      } catch (err) {
        setFetchErr(err.msg)
      }
    }

    const getPosts = async () => {
      const data = await fetchPosts()
      setPosts(data)
    }

    setTimeout(() => {
      getPosts()
      setIsLoading(false)
    }, 1000)
  }, [])

  const addPost = e => {
    e.preventDefault()

    let id = 0
    const [IDList, newArr] = [[], []]
    posts.forEach(post => {
      IDList.push(post.id)
    })

    const getMax = Math.max(...IDList)
    for (let i = 1; i <= getMax; i++) {
      if (!IDList.includes(i)) {
        newArr.push(i)
      }
    }

    if (posts.length === getMax || posts.length === 0) {
      id = posts.length + 1
    } else {
      id = newArr[0]
    }

    const newPost = { id, title: title.trim(), content: content.trim(), date: getFullDate }
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
          <Route index element={<Contents posts={handleSearch} />} />
          <Route path="home" element={<Contents posts={handleSearch} />} />
          <Route path="post" element={<Posts posts={posts} title={title} setTitle={setTitle} content={content} setContent={setContent} onAddPost={addPost} />} />
          <Route path="about" element={<About />} />
          <Route path="/post/:id" element={<Post posts={posts} setPosts={setPosts} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
