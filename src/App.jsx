import Navbar from "./components/Navbar"
import Upload from "./components/Upload"

function App() {

  return (
    <div className="h-screen">
      <Navbar/>
      <div className="w-full h-full items-center justify-center flex"><Upload/></div>
    </div>
  )
}

export default App
