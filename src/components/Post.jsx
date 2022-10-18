const Post = () => {
    return (
        <form className="new-post p-5">
            <h2>New Post</h2>
            <article className="flex flex-col gap-3 mt-5">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" />
                </div>
                <div>
                    <label htmlFor="content">Post:</label>
                    <textarea id="content"></textarea>
                </div>
                <button type="submit" className="py-1 bg-orange-500 rounded-md tracking-widest text-white text-xl hover:bg-orange-300 hover:text-slate-800 trans">Submit</button>
            </article>
        </form>
    )
}

export default Post