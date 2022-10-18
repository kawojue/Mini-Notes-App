import { Link } from 'react-router-dom'

const ListContents = ({ posts }) => {
    return (
        <>
            {posts.map(post => (
                <article key={post.id} className="flex flex-col gap-5 w-full px-4 py-3 border-b-[1.5px] border-slate-400 text-slate-600">
                    <div>
                        <h3 className="capitalize w-fit tracking-wider text-2xl font-medium cursor-pointer">
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="mt-1 text-[0.75rem]">
                            {post.date}
                        </p>
                    </div>
                    <div>
                        <h4>{post.content.split('').length > 35 ? `${post.content.slice(0, 35) + "..."}` : post.content}</h4>
                    </div>
                </article>
            ))}
        </>
    )
}

export default ListContents