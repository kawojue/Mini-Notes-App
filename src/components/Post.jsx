import { useParams, useNavigate } from 'react-router-dom'

const Post = ({ posts, setPosts }) => {
    const { id } = useParams()
    const nav = useNavigate()

    const activePost = posts.filter(post => post.id == id)

    const deletePost = id => {
        const newPost = [...posts.filter(post => post.id != id)]
        console.log(id)
        setPosts(newPost)
        nav('/')
    }


    return (
        <article className="p-5">
            <h2 className="capitalize mb-5">{activePost[0].title}</h2>
            <p className="mt-5 text-slate-600 text-lg mb-5">{activePost[0].content}</p>
            <button className="btn trans" onClick={() => deletePost(id)}>Delete</button>
        </article>
    )
}

export default Post