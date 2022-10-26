import { createContext, useState, useEffect } from "react";
import { format } from 'date-fns'
import { fillID } from '../fillID'
import useWindowSize from '../hooks/useWindowSize'
import { useNavigate } from 'react-router-dom'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const nav = useNavigate()
    const width = useWindowSize()
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [search, setSearch] = useState("")
    const url = "http://localhost:5500/notes"
    const [content, setContent] = useState("")
    const [editTitle, setEditTitle] = useState("")
    const [fetchErr, setFetchErr] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [editContent, setEditContent] = useState("")
    const [countContent, setCountContent] = useState(0)
    const [countEditContent, setCountEditContent] = useState(0)
    const getFullDateTime = format(new Date(), 'MMMM dd, yyyy pp')

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
        <DataContext.Provider value={{
            width, search, setSearch, handleSearch,
            fetchErr, isLoading, notes, setNotes, url,
            title, setTitle, content, setContent, addNote,
            editTitle, setEditTitle, editContent, setEditContent,
            countContent, countEditContent
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext