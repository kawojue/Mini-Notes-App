import { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from "../context/DataContext"

const Notes = () => {
    const { handleSearch, fetchErr, isLoading } = useContext(DataContext)
    return (
        <main className="bg-white overflow-y-auto">
            {!fetchErr ?
                <>
                    {!isLoading ?
                        <>
                            {handleSearch.length !== 0 ?
                                <>
                                    {handleSearch.map(note => (
                                        <Link key={note.id} to={`/note/${note.id}`} className="flex flex-col gap-5 w-full px-4 py-3 border-b-[1.5px] border-slate-400 text-slate-600 hover:text-black">
                                            <div>
                                                <h3 className="capitalize w-fit tracking-wider text-2xl font-medium cursor-pointer">
                                                    {note.title.split('').length > 23 ?
                                                        `${note.title.substring(0, 23) + "..."}` :
                                                        note.title}
                                                </h3>
                                                {note.edited ?
                                                    <>
                                                        <p className="mt-1 text-[0.75rem]">
                                                            Created on {note.datetime[0]}
                                                        </p>
                                                        <p className="mt-0.5 text-xs">
                                                            Modified <span className="font-light italic">
                                                                {note.datetime[note.datetime.length - 1]}
                                                            </span>
                                                        </p>
                                                    </> :
                                                    <p className="mt-1 text-[0.75rem]">
                                                        {note.datetime[0]}
                                                    </p>}
                                            </div>
                                            <div>
                                                <h4>
                                                    {note.content.split('').length > 35 ?
                                                        `${note.content.slice(0, 35) + "..."}` :
                                                        note.content}
                                                </h4>
                                            </div>
                                        </Link>
                                    ))} </> :
                                <h3 className='info'>
                                    Go to Note to make a new note.
                                </h3>} </> :
                        <h3 className='info'>
                            Loading...
                        </h3>}
                </> :
                <h3 className='info'>
                    {fetchErr}
                </h3>}
        </main>
    )
}

export default Notes