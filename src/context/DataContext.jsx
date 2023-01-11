import { fillID } from '../fillID'
import { FaCopy } from 'react-icons/fa'
import { updateItem } from '../updateItem'
import { useNavigate } from 'react-router-dom'
import useWindowSize from '../hooks/useWindowSize'
import { createContext, useState, useEffect } from "react"
import { parseISO, formatDistanceToNow, format } from 'date-fns'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const nav = useNavigate()
    const width = useWindowSize()
    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState([])
    const [search, setSearch] = useState("")
    const [content, setContent] = useState("")
    const [copy, setCopy] = useState(<FaCopy />)
    const [editTitle, setEditTitle] = useState("")
    const [fetchErr, setFetchErr] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const url = new URL("http://localhost:5500/notes")
    const [editContent, setEditContent] = useState("")
    const [countContent, setCountContent] = useState(0)
    const [countEditContent, setCountEditContent] = useState(0)
    const getFullDateTime = format(new Date(), 'MMMM dd, yyyy pp')

    const getFullTime = (timestamp) => {
        let timePassed = ''
        if (timestamp) {
            const date = parseISO(timestamp)
            const timePeriod = formatDistanceToNow(date)
            timePassed = `${timePeriod} ago`
        }
        return timePassed
    }

    const fetchNotes = async () => {
        try {
            const res = await fetch(url)
            const data = await res.json()
            setNotes(data)
        } catch (err) {
            setFetchErr("Please, reload the page.")
        }
    }

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

    const handleEditedTime = () => {
        const newNotes = notes.map(note => {
            const { edited, datetime, ISOStringDate } = note
            if (edited) {
                const updatedTime = getFullTime(ISOStringDate)
                return {
                    ...note,
                    datetime: [...datetime.slice(0, datetime.length - 1), updatedTime]
                }
            } else {
                return note
            }
        })

        newNotes.forEach(async (note, index) => {
            const { id, edited } = note
            if (edited) {
                (async () => updateItem(url, id, newNotes[index]))()
            }
        })
    }

    const onCopy = async value => {
        try {
            await navigator.clipboard.writeText(value)
            setCopy("Copied!")
            setTimeout(() => {
                setCopy(<FaCopy />)
            }, 1200)
        } catch (err) {
            setCopy('Failed to copy!')
        }
    }

    const handleSearch = notes.filter(note =>
        ((note.title).toLowerCase()).includes(search.toLowerCase()) ||
        ((note.content).toLowerCase()).includes(search.toLowerCase()) ||
        ((note.datetime[0]).toLowerCase()).includes(search.toLowerCase()))

    useEffect(() => {
        handleEditedTime()
    }, [notes])

    useEffect(() => {
        setTimeout(() => {
            (async () => await fetchNotes())()
            setIsLoading(false)
        }, 1000)
    }, [])

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
            countContent, countEditContent, getFullTime, onCopy, copy
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext