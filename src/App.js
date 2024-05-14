import Home from "./componet/Home/Home";
import Add from "./componet/Add/Add";
import Notfound from "./componet/Notfound";

import Navb from "./componet/Navb";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <>
  


      <Router>
        <Navb />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Add' element={<Add />} />
          <Route path="*" element={<Notfound />} />

        </Routes> 

      </Router>







    </>

  )
}

export default App;
