import DataContext from "../context/DataContext"
import { useContext } from 'react'

const AddNote = () => {
    const { title, content, setTitle, setContent, addNote, countContent } = useContext(DataContext)
    return (
        <form onSubmit={(e) => addNote(e)} className="new-note p-5 overflow-auto">
            <h2>Add New Note</h2>
            <article className="flex flex-col gap-3 mt-5">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='relative'>
                    <label htmlFor="content">Note:</label>
                    <p className="absolute top-0 right-0">{countContent}</p>
                    <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
                </div>
                <button type="submit" className="btn trans">Save</button>
            </article>
        </form>
    )
}

export default AddNote