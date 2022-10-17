const ListContents = () => {
    const newDate = new Date()
    const months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sept", "Oct", "Nov", "Dec",
    ];
    const month = months[newDate.getMonth()]

    const getFullDate = `${month} ${newDate.getDate()}, ${newDate.getFullYear()}. ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`

    return (
        <>
            <article className="flex flex-col gap-5 w-full px-4 py-3 border-b-[1.5px] border-slate-400 text-slate-600">
                <div>
                    <h3 className="capitalize tracking-wider text-2xl font-medium">my first post</h3>
                    <p className="mt-1 text-[0.75rem]">{getFullDate}</p>
                </div>
                <div>
                    <h4>Lorem ipsum dolor sit amet consectetur...</h4>
                </div>
            </article>
        </>
    )
}

export default ListContents