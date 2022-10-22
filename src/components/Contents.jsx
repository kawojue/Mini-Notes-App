import Notes from './Notes'

const Contents = ({ notes, fetchErr, isLoading }) => {
    return (
        <main className="bg-white overflow-y-auto">
            <Notes notes={notes} fetchErr={fetchErr} isLoading={isLoading} />
        </main>
    )
}

export default Contents