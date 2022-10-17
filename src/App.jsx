import Header from "./components/Header"
import Contents from "./components/Contents"
import Footer from "./components/Footer"
import Post from './components/Post'

function App() {
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
        {/* <Contents getFullDate={getFullDate} /> */}
        <Post />
        <Footer />
      </div>
    </>
  )
}

export default App
