import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Children from './pages/Children'
import ChildRecord from './pages/ChildRecord'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Children />} />
                <Route path="/children" element={<Children />} />
                <Route path="/child-record" element={<ChildRecord />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App