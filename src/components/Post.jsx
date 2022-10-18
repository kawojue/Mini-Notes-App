import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Post = ({ posts, setPosts }) => {
    console.log(posts)
    const postID = useParams().id
    const nav = useNavigate()
    const [postContent, setPostContent] = useState([])

    const handlePost = id => {
        setPostContent([...posts.filter(post => post.id === id)])
    }

    handlePost(postID)

    const deletePost = id => {
        const newPost = [...posts.filter(post => post.id !== id)]
        setPosts(newPost)
        nav('/')
    }


    return (
        <article className="p-5">
            <h2 className="capitalize mb-5">{postContent[0].title}</h2>
            <p className="mt-5 text-slate-600 text-lg mb-5">{postContent[0].content}</p>
            <button className="btn trans" onClick={() => deletePost(postID)}>Delete</button>
        </article>
    )
}

export default Post