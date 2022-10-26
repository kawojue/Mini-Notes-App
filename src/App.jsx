import Note from './components/Note'
import About from './components/About'
import Notes from './components/Notes'
import AddNote from './components/AddNote'
import NotFound from './components/NotFound'
import EditNote from './components/EditNote'
import Structure from './components/Structure'
import { Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'


function App() {
  return (
    <div className="container">
      <DataProvider>
        <Routes>
          <Route path="/" element={<Structure />}>
            <Route index element={<Notes />} />
            <Route path="home" element={<Notes />} />
            <Route path="note/add" element={<AddNote />} />
            <Route path="about" element={<About />} />
            <Route path="/note/:id" element={<Note />} />
            <Route path="/note/:id/edit" element={<EditNote />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </DataProvider>
    </div>
  )
}

export default App