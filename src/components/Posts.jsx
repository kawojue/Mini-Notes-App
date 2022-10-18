import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Post = ({ onSetPosts, getFullDate, posts }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const nav = useNavigate()

    const addPost = e => {
        e.preventDefault()

        let id = 0
        const [IDList, newArr] = [[], []]
        posts.forEach(post => {
            IDList.push(post.id)
        })

        const getMax = Math.max(...IDList)

        for (let i = 1; i <= getMax; i++) {
            if (!IDList.includes(i)) {
                newArr.push(i)
            }
        }

        if (posts.length === getMax || posts.length === 0) {
            id = posts.length + 1
        } else {
            id = newArr[0]
        }

        const newPost = { id, title, content, date: getFullDate }

        onSetPosts([...posts, newPost])

        nav('/')
        setContent("")
        setTitle("")
    }

    return (
        <form onSubmit={(e) => addPost(e)} className="new-post p-5">
            <h2>New Post</h2>
            <article className="flex flex-col gap-3 mt-5">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="content">Post:</label>
                    <textarea id="content" value={content} onChange={e => setContent(e.target.value)} ></textarea>
                </div>
                <button type="submit" className="py-1 bg-orange-500 rounded-md tracking-widest text-white text-xl hover:bg-orange-300 hover:text-slate-800 trans">Submit</button>
            </article>
        </form>
    )
}

export default Post