import { Navbar } from './Components';
import { Routes, Route } from 'react-router-dom';
import { Home, Video } from './Pages';
import { useState } from 'react';

function App() {
    const [sidebar, setSidebar] = useState(true);

    return (
        <>
            <div>
                <Navbar setSidebar={setSidebar} />
                <Routes>
                    <Route path="/" element={<Home sidebar={sidebar} />} />
                    <Route path="/video/:categoryId/:videoId" element={<Video />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
