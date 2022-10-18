import ListContents from './ListContents'

const Contents = ({ posts }) => {
    return (
        <main className="bg-white overflow-y-auto">
            <ListContents getFullDate={getFullDate} posts={posts} />
        </main>
    )
}

export default Contents