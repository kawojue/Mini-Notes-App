const ListContents = ({ posts }) => {
    return (
        <>
            {posts.map(post => (
                <article key={post.id} className="flex flex-col gap-5 w-full px-4 py-3 border-b-[1.5px] border-slate-400 text-slate-600">
                    <div>
                        <h3 className="capitalize w-fit tracking-wider text-2xl font-medium cursor-pointer">
                            {post.title}
                        </h3>
                        <p className="mt-1 text-[0.75rem]">
                            {post.date}
                        </p>
                    </div>
                    <div>
                        <h4>{post.content}</h4>
                    </div>
                </article>
            ))}
        </>
    )
}

export default ListContents