import Notes from './Notes'

const Contents = ({ notes, fetchErr, isLoading }) => {
    return (
        <main className="bg-white overflow-y-auto">
            <Notes />
        </main>
    )
}

export default Contents