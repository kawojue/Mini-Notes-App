import ListContents from './ListContents'

const Contents = ({ posts, fetchErr, isLoading }) => {
    return (
        <main className="bg-white overflow-y-auto">
            <ListContents posts={posts} fetchErr={fetchErr} isLoading={isLoading} />
        </main>
    )
}

export default Contents