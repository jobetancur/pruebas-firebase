import { Routes , Route } from 'react-router-dom';
import { NavBar } from "./NavBar"
import { CreateRealState } from './components/CreateRealState';
import { HomePage } from './components/HomePage';
import { ViewRealEstates } from './components/ViewRealEstates';

function App() {


 
  return (
    <>
      <NavBar />
        <hr />

        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/create-real-estate" element={<CreateRealState/>} />
            <Route path="/view-real-estate" element={<ViewRealEstates/>} />

        </Routes>
    </>
  )
}

export default App
