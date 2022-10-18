import { useState, useEffect } from 'react'

const Post = ({ title, setTitle, content, setContent, onAddPost }) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const splitted = content.split('')
        setCounter(splitted.length)
    }, [content])
    return (
        <form onSubmit={(e) => onAddPost(e)} className="new-post p-5">
            <h2>New Post</h2>
            <article className="flex flex-col gap-3 mt-5">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" required value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className='relative'>
                    <label htmlFor="content">Post:</label>
                    <p className="absolute top-0 right-0">{counter}</p>
                    <textarea id="content" required value={content} onChange={e => setContent(e.target.value)} ></textarea>
                </div>
                <button type="submit" className="py-1 bg-orange-500 rounded-md tracking-widest text-white text-xl hover:bg-orange-300 hover:text-slate-800 trans">Submit</button>
            </article>
        </form>
    )
}

export default Post