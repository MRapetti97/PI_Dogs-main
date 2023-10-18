import { useState } from 'react';
import {getDogByName, showModal} from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchBar.module.css'

const SearchBar = () =>{
    const dispatch = useDispatch();
    const [nameDog, setNameDog] = useState('');
    const allDogsBackup = useSelector(state => state.allDogsBackup);

    const handleInput = (event)=>{
        setNameDog(event.target.value);
    }

    const handleSearch = ()=>{
        if(!nameDog || !isNaN(nameDog)) return dispatch(showModal(true, 'Please must enter a name...', 'error'));
        const searchDog = allDogsBackup.filter(dog => dog.name.toLowerCase().includes(nameDog.toLowerCase()));
        if(searchDog.length === 0) return dispatch(showModal(true, 'There is not dog', 'error'));

        dispatch(getDogByName(nameDog));
        setNameDog('');
    }
    
    return (
        <div className={styles.containerSearch}>
            <input type="search" value={nameDog} onChange={handleInput} placeholder="Enter a name" />
            <button onClick={handleSearch} className='btnPrimary btn'>Search</button>
        </div>
    )
}

export default SearchBar;