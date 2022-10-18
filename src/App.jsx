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
  const [search, setSearch] = useState("")
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("")
  const nav = useNavigate()
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "my first post",
      content: "Lorem ipsum dolor sit amet consectetur...",
      date: getFullDate
    }
  ])



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
    window.location.reload()
    setContent("")
    setTitle("")
  }

  // const handlePost = (id) => {

  // }

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Structure search={search} onSetSearch={setSearch} />}>
          <Route path="/" element={<Contents posts={posts.filter(post => ((post.title).toLowerCase()).includes(search.toLowerCase()))} />} />
          <Route path="home" element={<Contents posts={posts} />} />
          <Route path="post" element={<Posts posts={posts} title={title} setTitle={setTitle} content={content} setContent={setContent} onAddPost={addPost} />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
