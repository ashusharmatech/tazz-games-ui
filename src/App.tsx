import Navbar from "./components/Navbar";
import Home from "./layout/Home";
import { Provider } from 'react-redux'


const App = () => {
  return (
          <div>
            <Navbar />
            <Home></Home>
          </div>
          )
}

export default App