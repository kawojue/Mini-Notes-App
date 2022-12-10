import { manageID } from '../manageID'
import { updateItem } from '../updateItem'
import { formatFetch } from '../formatFetch'
import DataContext from '../context/DataContext'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditNote = () => {
    const nav = useNavigate()
    const { id } = useParams()
    const [msg, setMsg] = useState("")
    const { url, notes, setNotes,
        setEditContent, getFullTime,
        editTitle, setEditTitle, editContent,
        countEditContent } = useContext(DataContext)

    const [oldEditTitle, setOldEditTitle] = useState('')
    const [oldEditContent, setOldEditContent] = useState('')

    const validToEdit = (Boolean(oldEditTitle !== editTitle) ||
        Boolean(oldEditContent !== editContent)) && Boolean(editContent)

    const fetchNotes = async id => {
        try {
            const res = await fetch(formatFetch(url, id))
            const data = await res.json()
            setEditTitle(data.title)
            setOldEditTitle(data.title)
            setEditContent(data.content)
            setOldEditContent(data.content)
        } catch (err) {
            setMsg("Note is not in the database.")
        }
    }

    useEffect(() => {
        (async () => await fetchNotes(id))()
    }, [])

    const handleEdit = async e => {
        e.preventDefault()
        const newNotes = notes.map(note => note.id == id ?
            {
                id: parseInt(id),
                title: editTitle.trim(),
                content: editContent.trim(),
                edited: true,
                datetime: [...note.datetime, ...[getFullTime(new Date().toISOString())]],
                ISOStringDate: new Date().toISOString()
            } :
            note)

        const activeNote = newNotes.filter(note => note.id == id)
        setNotes(newNotes)

        if (true) {
            (async () => await updateItem(url, id, activeNote[0]))()
        }

        nav(`/note/${id}`)
        setEditTitle("")
        setEditContent("")
    }

    return (
        <>
            {manageID(id, notes) ?
                <form onSubmit={(async e => await handleEdit(e))} className="new-note p-5 overflow-auto">
                    <h2>Edit Note</h2>
                    <article className="flex flex-col gap-3 mt-5">
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input type="text" id="title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                        </div>
                        <div className='relative'>
                            <label htmlFor="content">Note:</label>
                            <p className="absolute top-0 right-0 text-sm">{countEditContent}</p>
                            <textarea id="content" value={editContent} onChange={(e) => setEditContent(e.target.value)} ></textarea>
                        </div>
                        <button type="submit" disabled={!validToEdit}
                            className="btn trans disabled:opacity-[50%]">
                            Edit
                        </button>
                    </article>
                </form> :
                <p>{msg}</p>}
        </>
    )
}

export default EditNote