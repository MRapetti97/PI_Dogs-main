import { useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import styles from './Detail.module.css';
import { BsChevronLeft } from "react-icons/bs";
import Loading from '../../components/Loading/Loading';

const Detail = ()=>{
    const {id} = useParams();
    const [dog, setDog] = useState({});
    const [loading, setLoading] = useState(true);
    const URL_BASE = 'http://localhost:3001/dogs/'

    useEffect(()=>{
        axios(`${URL_BASE}${id}`)
        .then(({data})=>{
            if(data.name){
                setDog(data);
                setLoading(false)
            }
        })
        return setDog({});
    }, [id])
    
    return (
        <>
            {
              loading
              ? <Loading/>
              : <section className={styles.containerDetail}>
                    <div className='container'>
                        <h1 className={styles.titleDescription}> Dog Detail </h1>
                        <div className={styles.containerDescription}>
                            <div className={styles.containerImg}>
                                <img src={dog?.image} alt={dog?.name} className={styles.imgDog} />
                            </div>
                            <div className={styles.containerInfo}>
                                <h2>Id: <span>{dog?.id}</span></h2>
                                <h2>Name: <span>{dog?.name}</span></h2>
                                <h2>Height: <span>{dog?.minHeight} - {dog?.maxHeight} cm</span> </h2> 
                                <h2>Weight: <span>{dog?.minWeight} - {dog?.maxWeight} kg</span></h2>
                                <h2>Temperaments: <span>{dog?.temperaments}</span></h2>
                                <h2>Years of life: <span>{dog?.life_span}</span></h2>
                                <Link to='/home' className={`${styles.back} btn`}> <BsChevronLeft/> Back</Link>
                            </div>
                        </div>
                    </div>
                </section> 
            }
        </>
        
    )
}

export default Detail;