import { fillID } from '../fillID'
import { useNavigate } from 'react-router-dom'
import useWindowSize from '../hooks/useWindowSize'
import { createContext, useState, useEffect } from "react";
import { parseISO, formatDistanceToNow, format } from 'date-fns'

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

    const getFullTime = (timestamp) => {
        let timePassed = ''
        if (timestamp) {
            const date = parseISO(timestamp)
            const timePeriod = formatDistanceToNow(date)
            timePassed = `${timePeriod} ago`
        }
        return timePassed
    }

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
        const newNote = {
            id,
            title: title.trim(),
            content: content.trim(),
            datetime: [...[getFullDateTime]],
            edited: false,
            ISOStringDate: new Date().toISOString()
        }
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

    const handleEditedTime = async () => {
        const newNotes = notes.map(note => note.edited ?
            {
                ...note,
                datetime: [...note.datetime, note.datetime[note.datetime.length - 1] = getFullTime(note.ISOStringDate)]
            } :
            note)

        console.log(newNotes)

        // await fetch(url, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(newNotes)
        // })
    }

    (async () => await handleEditedTime())()

    // useEffect(() => {
    //     (async () => await handleEditedTime())()
    // })

    const handleSearch = notes.filter(note =>
        ((note.title).toLowerCase()).includes(search.toLowerCase()) ||
        ((note.content).toLowerCase()).includes(search.toLowerCase()) ||
        ((note.datetime[0]).toLowerCase()).includes(search.toLowerCase()))

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
            countContent, countEditContent, getFullTime
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext