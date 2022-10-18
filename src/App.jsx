import { useState, useEffect } from 'react'
import Header from "./components/Header"
import Contents from "./components/Contents"
import Footer from "./components/Footer"
import Post from './components/Post'
import About from "./components/About"

function App() {
  const [fullDate, setFullDate] = useState("")
  // const [newPost, setNewPost] = useState("")
  const [post, setPost] = useState([
    {
      id: 1,
      title: "my first post",
      content: "Lorem ipsum dolor sit amet consectetur...",
    },
    {
      id: 2,
      title: "My Seyhcond Post",
      content: "Lorem ipsum dolor sit amet consectetur..."
    },
    {
      id: 3,
      title: "MY THIRD POST",
      content: "Lorem ipsum dolor sit amet consectetur..."
    }
  ])

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
      <div className="container">
        <Header />
        <Contents getFullDate={getFullDate} />
        {/* <Post /> */}
        {/* <About /> */}
        <Footer />
      </div>
    </>
  )
}

export default App
