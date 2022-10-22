import { format } from 'date-fns'
import { fillID } from './fillID'
import Note from './components/Note'
import About from './components/About'
import AddNote from './components/AddNote'
import { useState, useEffect } from 'react'
import Contents from './components/Contents'
import EditNote from './components/EditNote'
import NotFound from './components/NotFound'
import Structure from './components/Structure'
import useWindowSize from './hooks/useWindowSize'
import { Routes, Route, useNavigate } from 'react-router-dom'


function App() {
  const url = "http://localhost:5500/notes"
  const getFullDateTime = format(new Date(), 'MMMM dd, yyyy pp')
  const nav = useNavigate()
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("")
  const [search, setSearch] = useState("")
  const [content, setContent] = useState("")
  const [editTitle, setEditTitle] = useState("")
  const [fetchErr, setFetchErr] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [editContent, setEditContent] = useState("")
  const [countContent, setCountContent] = useState(0)
  const [countEditContent, setCountEditContent] = useState(0)
  const width = useWindowSize()

  const fetchNotes = async () => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      setNotes(data)
    } catch (err) {
      setFetchErr("Please, reload the page.")
    }
  }

  useEffect(() => {
    setTimeout(() => {
      (async () => await fetchNotes())()
      setIsLoading(false)
    }, 1000)
  }, [])

  const addNote = async e => {
    e.preventDefault()

    const id = fillID(notes)
    const newNote = { id, title: title.trim(), content: content.trim(), datetime: getFullDateTime }
    setNotes([...notes, newNote])

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })

    setTitle("")
    setContent("")

    nav('/')
  }

  const handleSearch = notes.filter(note =>
    ((note.title).toLowerCase()).includes(search.toLowerCase()) ||
    ((note.content).toLowerCase()).includes(search.toLowerCase()) ||
    ((note.datetime).toLowerCase()).includes(search.toLowerCase()))

  useEffect(() => {
    const splitContent = content.split('')
    const splitEditContent = editContent.split('')
    setCountContent(splitContent.length)
    setCountEditContent(splitEditContent.length)
  }, [content, editContent])

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Structure search={search} onSetSearch={setSearch} width={width} />}>
          <Route index element={<Contents notes={handleSearch} fetchErr={fetchErr} isLoading={isLoading} />} />
          <Route path="home" element={<Contents notes={handleSearch} fetchErr={fetchErr} isLoading={isLoading} />} />
          <Route path="note" element={<AddNote title={title} setTitle={setTitle} content={content} setContent={setContent} countContent={countContent} onAddNote={addNote} />} />
          <Route path="about" element={<About />} />
          <Route path="/note/:id" element={<Note notes={notes} setNotes={setNotes} url={url} />} />
          <Route path="/note/:id/edit" element={<EditNote url={url} notes={notes} setNotes={setNotes} editTitle={editTitle} setEditTitle={setEditTitle} editContent={editContent} setEditContent={setEditContent} getFullDateTime={getFullDateTime} countEditContent={countEditContent} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App