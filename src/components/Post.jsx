import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { formatFetch } from '../formatFetch'

const Post = ({ posts, setPosts, url }) => {
    const nav = useNavigate()
    const { id } = useParams()
    const [post, setPost] = useState({})
    const [msg, setMsg] = useState("")
    const { title, content, datetime } = post

    const getIDS = []
    posts.forEach(post => {
        getIDS.push(post.id)
    })

    const manageID = getIDS.includes(parseInt(id))

    const getPostByID = async id => {
        try {
            const res = await fetch(formatFetch(url, id))
            if (!res.ok) throw new Error("Note not found!")
            const data = await res.json()
            setPost(data)
        } catch (err) {
            setMsg("Note not found!")
        }

    }
    useEffect(() => {
        (async () => await getPostByID(id))()
    }, [])


    const deletePost = async id => {
        const post = [...posts.filter(post => post.id != id)]
        setPosts(post)

        await fetch(formatFetch(url, id), {
            method: 'DELETE'
        })
        nav('/')
    }

    return (
        <>
            {manageID ? <article className="p-5">
                <h2 className="capitalize mb-5">{title}</h2>
                <p className='text-sm'>{datetime}</p>
                <p className="mt-5 text-slate-600 text-lg mb-5">{content}</p>
                <div className="flex gap-5">
                    <button className="btn trans" onClick={() => deletePost(id)}>Delete</button>
                    <Link to={`/post/${id}/edit`} className="btn trans">Edit</Link>
                </div>
            </article> : <p>{msg}</p>}
        </>
    )
}

export default Post