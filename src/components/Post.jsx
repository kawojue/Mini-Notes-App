import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Post = ({ posts, setPosts }) => {
    const url = "http://localhost:5500/posts"
    const nav = useNavigate()
    const { id } = useParams()
    const [post, setPost] = useState([])

    const getPostByID = async id => {
        const res = await fetch(`${url}/${id}`)
        const data = await res.json()
        setPost([data])
    }

    useEffect(() => {
        setTimeout(() => {
            (async () => await getPostByID(id))()
        }, 1000);
    }, [])

    const deletePost = async id => {
        const post = [...posts.filter(post => post.id != id)]
        setPosts(post)

        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
        nav('/')
    }

    return (
        <article className="p-5">
            <h2 className="capitalize mb-5">{post[0].title}</h2>
            <p className="mt-5 text-slate-600 text-lg mb-5">{post[0].content}</p>
            <button className="btn trans" onClick={() => deletePost(id)}>Delete</button>
        </article>
    )
}

export default Post