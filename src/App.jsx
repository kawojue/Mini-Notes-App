import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from "./components/Header"
import Contents from "./components/Contents"
import Footer from "./components/Footer"
import Post from './components/Post'
import About from "./components/About"

function App() {
  const [fullDate, setFullDate] = useState("")
  // const [newPost, setNewPost] = useState("")

  const newDate = new Date()
  const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sept", "Oct", "Nov", "Dec",
  ];
  const month = months[newDate.getMonth()]

  const getFullDate = `${month} ${newDate.getDate()}, ${newDate.getFullYear()}. ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "my first post",
      content: "Lorem ipsum dolor sit amet consectetur...",
      date: getFullDate
    }
  ])



  return (
    <>
      <div className="container">
        <Header />
        {/* <Contents posts={posts} /> */}
        <Post posts={posts} onSetPosts={setPosts} getFullDate={getFullDate} />
        <Footer />
      </div>
    </>
  )
}

export default App
