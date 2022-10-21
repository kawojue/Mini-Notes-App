const Posts = ({ title, content, setTitle, setContent, onAddPost, countContent }) => {
    return (
        <form onSubmit={(e) => onAddPost(e)} className="new-post p-5">
            <h2>New Post</h2>
            <article className="flex flex-col gap-3 mt-5">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='relative'>
                    <label htmlFor="content">Post:</label>
                    <p className="absolute top-0 right-0">{countContent}</p>
                    <textarea id="content" required value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
                </div>
                <button type="submit" className="btn trans">Save</button>
            </article>
        </form>
    )
}

export default Posts