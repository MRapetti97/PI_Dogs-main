import { Landing, Home, Detail, Form } from './view';
import { Routes, Route, useLocation} from 'react-router-dom';
import NavBar from './components/Nav/Nav';
import './app.css';
import { useSelector } from 'react-redux';
import Modal from './components/Modal/Modal'

function App() {
  const {pathname} = useLocation();
  const modal = useSelector(state => state.modal);

  return (
    <div className="App">
      {modal.show && <Modal/>}
      {pathname !== '/' && <NavBar/>}
      <div className='containerApp'>
        <Routes>
            <Route path='/' element={<Landing />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/detail/:id' element={<Detail />}/>
            <Route path='/create' element={<Form />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
