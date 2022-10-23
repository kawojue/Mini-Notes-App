import { Link } from 'react-router-dom'

const Notes = ({ notes, fetchErr, isLoading }) => {
    return (
        <>
            {!fetchErr ?
                <>{!isLoading ?
                    <>{notes.length !== 0 ?
                        <>{notes.map(note => (
                            <Link key={note.id} to={`/note/${note.id}`} className="flex flex-col gap-5 w-full px-4 py-3 border-b-[1.5px] border-slate-400 text-slate-600 hover:text-black">
                                <div>
                                    <h3 className="capitalize w-fit tracking-wider text-2xl font-medium cursor-pointer">
                                        {note.title}
                                    </h3>
                                    <p className="mt-1 text-[0.75rem]">
                                        {note.datetime}
                                    </p>
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
        </>
    )
}

export default Notes