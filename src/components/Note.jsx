import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { formatFetch } from '../formatFetch'
import { manageID } from '../manageID'

const Note = ({ notes, setNotes, url }) => {
    const nav = useNavigate()
    const { id } = useParams()
    const [note, setNote] = useState({})
    const [msg, setMsg] = useState("")
    const [splittedContent, setSplittedContent] = useState([])
    const { title, datetime } = note

    const getNote = async id => {
        try {
            const res = await fetch(formatFetch(url, id))
            if (!res.ok) throw new Error("Note not found!")
            const data = await res.json()
            setNote(data)
            setSplittedContent(data.content.split("\n"))
        } catch (err) {
            setMsg("Note not found!")
        }

    }

    useEffect(() => {
        (async () => await getNote(id))()
    }, [])

    const deleteNote = async id => {
        const note = [...notes.filter(note => note.id != id)]
        setNotes(note)

        await fetch(formatFetch(url, id), {
            method: 'DELETE'
        })
        nav('/')
    }

    return (
        <>
            {manageID(id, notes) ?
                <article className="p-5">
                    <h2 className="capitalize mb-1">{title}</h2>
                    <p className='text-sm'>{datetime}</p>
                    <div className="my-5 text-slate-600 text-lg leading-tight">
                        {splittedContent.map((content, index) => (
                            <p key={index}>{content}</p>
                        ))}
                    </div>
                    <div className="flex gap-5">
                        <button className="btn hover:bg-red-500 trans" onClick={() => deleteNote(id)}>
                            Delete
                        </button>
                        <Link to={`/note/${id}/edit`} className="btn trans">
                            Edit
                        </Link>
                    </div>
                </article> :
                <p>{msg}</p>}
        </>
    )
}

export default Note