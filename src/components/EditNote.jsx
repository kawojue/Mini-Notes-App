import { manageID } from '../manageID'
import { useState, useEffect, useContext } from 'react'
import { formatFetch } from '../formatFetch'
import DataContext from '../context/DataContext'
import { useNavigate, useParams } from 'react-router-dom'

const EditNote = () => {
    const { url, notes, setNotes, editTitle, setEditTitle, editContent, setEditContent, getFullDateTime, countEditContent } = useContext(DataContext)
    const { id } = useParams()
    const nav = useNavigate()
    const [msg, setMsg] = useState("")

    const fetchNotes = async id => {
        try {
            const res = await fetch(formatFetch(url, id))
            if (!res.ok) throw new Error("Note is not in the database.")
            const data = await res.json()
            setEditTitle(data.title)
            setEditContent(data.content)
        } catch (err) {
            setMsg("Note is not in the database.")
        }
    }

    useEffect(() => {
        (async () => await fetchNotes(id))()
    }, [])

    const handleEdit = async e => {
        e.preventDefault()
        const newNotes = notes.map(note => note.id == id ? { id: parseInt(id), title: editTitle.trim(), content: editContent.trim(), datetime: getFullDateTime } : note)
        const activeNote = newNotes.filter(note => note.id == id)
        setNotes(newNotes)
        await fetch(formatFetch(url, id), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activeNote[0])
        })

        nav(`/note/${id}`)
        setEditTitle("")
        setEditContent("")

        window.location.reload()
    }

    return (
        <>
            {manageID(id, notes) ?
                <form onSubmit={(e) => handleEdit(e)} className="new-note p-5 overflow-auto">
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
                        <button type="submit" className="btn trans">Edit</button>
                    </article>
                </form> :
                <p>{msg}</p>}
        </>
    )
}

export default EditNote