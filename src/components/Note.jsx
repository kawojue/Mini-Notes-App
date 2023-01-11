import { manageID } from '../manageID'
import { formatFetch } from '../formatFetch'
import DataContext from '../context/DataContext'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const Note = () => {
    const nav = useNavigate()
    const { id } = useParams()
    const [note, setNote] = useState({})
    const { title, edited } = note
    const [countEdit, setCountEdit] = useState(0)
    const [msg, setMsg] = useState("")
    const { notes, setNotes, url, copy, onCopy } = useContext(DataContext)
    const [splittedContent, setSplittedContent] = useState([])
    const [time0, setTime0] = useState('')
    const [time1, setTime1] = useState('')
    const [contentCopied, setContentCopied] = useState('')

    const getNote = async id => {
        try {
            const res = await fetch(formatFetch(url, id))
            if (!res.ok) throw new Error("Note not found!")
            const data = await res.json()
            setNote(data)
            const { edited, datetime, content } = data
            setSplittedContent(content.split("\n"))
            setContentCopied(content)
            if (edited) {
                setTime0(datetime[0])
                setTime1(datetime[datetime.length - 1])
                setCountEdit(datetime.length - 1)
            } else {
                setTime0(datetime[0])
            }
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
                <article className="p-5 overflow-auto">
                    <h2 className="capitalize mb-1">{title}</h2>
                    <div className="text-xs">
                        {!edited ?
                            <p>
                                Created on <span>{time0}</span>
                            </p> :
                            <p>
                                Created on <span>{time0}</span> <br />
                                <i title={`edited ${countEdit} time${countEdit == 1 ? '' : 's'}`}
                                    className="font-light">
                                    Edited {time1} ({countEdit})
                                </i>
                            </p>}
                    </div>
                    <div className="my-5 text-slate-600 text-lg leading-tight">
                        {splittedContent.map((content, index) => (
                            <p key={index}>{content}</p>
                        ))}
                    </div>
                    <div className="flex gap-5">
                        <Link to={`/note/${id}/edit`} className="btn trans">
                            Edit
                        </Link>
                        <button className="btn trans hover:bg-red-500"
                            onClick={() => deleteNote(id)}>
                            Delete
                        </button>
                        <button onClick={() => onCopy(contentCopied)}
                            className="btn trans">{copy}</button>
                    </div>
                </article> :
                <p>{msg}</p>}
        </>
    )
}

export default Note