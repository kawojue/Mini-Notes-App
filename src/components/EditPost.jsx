import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const EditPost = () => {
    const { id } = useParams()
    console.log(id)
    return (
        <form className="new-post p-5">
            <h2>Edit Post</h2>
            <article className="flex flex-col gap-3 mt-5">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" required />
                </div>
                <div className='relative'>
                    <label htmlFor="content">Post:</label>
                    <p className="absolute top-0 right-0"></p>
                    <textarea id="content" required  ></textarea>
                </div>
                <button type="submit" className="btn trans">Submit</button>
            </article>
        </form>
    )
}

export default EditPost