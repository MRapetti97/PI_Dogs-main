
const validation = (form , property, setErrors, errors) => {
    //Expresiones regulares
    const regexLetters=/^[a-zA-Z ]+$/;
    const regexNumbers = /^[0-9]+$/;

    //Validaciones de los input
    if(property === 'name'){
        if(form.name === '') setErrors({...errors, name:'Name is required'});
        else if(form.name.length > 30) setErrors({...errors, name:'The name is very long'});
        else if(!regexLetters.test(form.name)) setErrors({...errors, name:'Enter only letters'});
        else setErrors({...errors, name : ""})
    }

    if(property === 'minHeight' || property ==='maxHeight'){
        if(form.minHeight === '' || form.maxHeight === '') setErrors({...errors, height:'Height is required'});
        else if(parseInt(form.minHeight) > 100 || parseInt(form.maxHeight) > 100) setErrors({...errors, height:'The height must be less than 100'});
        else if(!regexNumbers.test(form.minHeight || form.maxHeight)) setErrors({...errors, height:'Enter only Numbers'});
        else if (parseInt(form.maxHeight) <= parseInt(form.minHeight)) setErrors({...errors, height:'Max-Height must be highter than min-Height'});
        else setErrors({...errors, height: ""})
    
    }

    if(property === 'minWeight' || property ==='maxWeight'){
        if(form.minWeight === '' || form.maxWeight === '') setErrors({...errors, weight:'Weight is required'});
        else if(parseInt(form.minWeight) > 100 || parseInt(form.maxWeight) > 100) setErrors({...errors, weight:'The weight must be less than 100'});
        else if(!regexNumbers.test(form.minWeight || form.maxWeight)) setErrors({...errors, weight:'Enter only Numbers'});
        else if (parseInt(form.maxWeight) <= parseInt(form.minWeight)) setErrors({...errors, weight:'Max-Weight must be highter than min-Weight'});
        else setErrors({...errors, weight: ""})
    
    }

    if(property === 'life_span'){
        if(form.life_span === '') setErrors({...errors, life_span:'Life span is required'});
        else if(form.life_span.length > 30) setErrors({...errors, life_span:'The life span is very long'});
        else setErrors({...errors, life_span : ""})
    }
    
    if(property === 'image'){
        if(form.image === '') setErrors({...errors, image:'Image is required'});
        else setErrors({...errors, image : ""})
    }
   
    if(property === 'temperaments') {
        if(form.temperaments.length === 0) setErrors({ ...errors, temperaments: 'Temperaments are required'})
        else setErrors({...errors, temperaments:""})
    }

}

export default validation;