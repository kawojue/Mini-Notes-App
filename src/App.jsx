import { Routes, Route } from 'react-router-dom'
import Note from './components/Note'
import About from './components/About'
import AddNote from './components/AddNote'
import Contents from './components/Contents'
import EditNote from './components/EditNote'
import NotFound from './components/NotFound'
import Structure from './components/Structure'
import { DataProvider } from './context/DataContext'


function App() {
  return (
    <div className="container">
      <DataProvider>
        <Routes>
          <Route path="/" element={<Structure />}>
            <Route index element={<Contents />} />
            <Route path="home" element={<Contents />} />
            <Route path="note" element={<AddNote />} />
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