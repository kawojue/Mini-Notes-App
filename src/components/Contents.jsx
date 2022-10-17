import ListContents from './ListContents'

const Contents = ({ getFullDate }) => {
    return (
        <main className="bg-white overflow-y-auto">
            <ListContents getFullDate={getFullDate} />
        </main>
    )
}

export default Contents