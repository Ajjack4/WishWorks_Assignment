import { Fragment } from "react"
import InputListing from "./components/InputListing.jsx"
import ListListing from "./components/ListListing.jsx"
function App() {


  return (
   <Fragment>
    <div className="container">
    <InputListing/>
    <ListListing/>
    </div>
   </Fragment>
  )
}

export default App
