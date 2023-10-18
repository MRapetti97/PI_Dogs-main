/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTemperaments, postDog } from "../../redux/actions";
import validation from "./validate";
import styles from "./Form.module.css";
import { BsXCircleFill } from "react-icons/bs";

const Form = () => {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments);

  // Estado local capturar la información ingresada en el formulario
  const [form, setForm] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  //Manejador de errores
  const [errors, setErrors] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperaments: "",
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  //Capturar valor de los input
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    if (property !== "temperaments") {
      setForm({ ...form, [property]: value });
    }

    if (property === "temperaments") {
      if (!form.temperaments.includes(value))
        setForm({ ...form, temperaments: [...form.temperaments, value] });
    }
    validation({ ...form, [property]: value }, property, setErrors, errors);
  };

  //Eliminar temperamento
  const handleDeleteTemperament = (element) => {
    setForm({
      ...form,
      temperaments: [...form.temperaments].filter((temp) => temp !== element),
    });
    validation(
      {
        ...form,
        temperaments: [...form.temperaments].filter((temp) => temp !== element),
      },
      "temperaments",
      setErrors,
      errors
    );
  };

  //Deshabilitar botón
  const btnDisabled = () => {
    let disabledAux = true;
    for (let error in errors) {
      if (errors[error] === "") {
        disabledAux = false;
      } else {
        disabledAux = true;
        break;
      }
    }
    return disabledAux;
  };

  // Botón Create
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postDog(form));
    setForm({
      name: "",
      minHeight: "",
      maxHeight: "",
      minWeight: "",
      maxWeight: "",
      life_span: "",
      image: "",
      temperaments: [],
    });
  };

  return (
    <section className={styles.containerCreate}>
      <div className="container">
        <div className={styles.containerForm}>
          <form action="" className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.contentForm}>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={form.name}
                placeholder="Name dog"
                className={styles.inputForm}
              />
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </div>
            <div className={`${styles.contentFlex} ${styles.contentForm}`}>
              <input
                type="text"
                name="minHeight"
                onChange={handleChange}
                value={form.minHeight}
                placeholder="Min height"
                className={styles.inputForm}
              />
              <input
                type="text"
                name="maxHeight"
                onChange={handleChange}
                value={form.maxHeight}
                placeholder="Max Height"
                className={styles.inputForm}
              />
              {errors.height && (
                <span className={styles.error}>{errors.height}</span>
              )}
            </div>
            <div className={`${styles.contentFlex} ${styles.contentForm}`}>
              <input
                type="text"
                name="minWeight"
                onChange={handleChange}
                value={form.minWeight}
                placeholder="Min Weight"
                className={styles.inputForm}
              />
              <input
                type="text"
                name="maxWeight"
                onChange={handleChange}
                value={form.maxWeight}
                placeholder="Max Weight"
                className={styles.inputForm}
              />
              {errors.weight && (
                <span className={styles.error}>{errors.weight}</span>
              )}
            </div>
            <div className={styles.contentForm}>
              <input
                type="text"
                name="life_span"
                onChange={handleChange}
                value={form.life_span}
                placeholder="Life span"
                className={styles.inputForm}
              />
              {errors.life_span && (
                <span className={styles.error}>{errors.life_span}</span>
              )}
            </div>
            <div className={styles.contentForm}>
              <select
                name="temperaments"
                defaultValue="temperaments"
                onChange={handleChange}
                className={styles.selectForm}
              >
                <option value="temperaments" disabled>
                  Temperaments
                </option>
                {allTemperaments.map((temp) => (
                  <option value={temp.name} key={temp.id}>
                    {temp.name}
                  </option>
                ))}
              </select>
              {}

              {errors.temperaments && (
                <span className={styles.error}>{errors.temperaments}</span>
              )}
            </div>
            <div className={styles.containerTemp}>
              <span className={styles.titleTemperaments}>
                List Temperaments:
              </span>
              <div className={styles.listTemperament}>
                {form.temperaments.map((temp) => (
                  <div className={styles.temperament} key={temp}>
                    <span key={temp}>{temp}</span>
                    <button
                      onClick={() => handleDeleteTemperament(temp)}
                      className={`${styles.close} btn`}
                    >
                      <BsXCircleFill />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.contentForm}>
              <input
                type="text"
                name="image"
                onChange={handleChange}
                value={form.image}
                placeholder="Image"
                className={`${styles.inputForm} ${styles.urlImg}`}
              />
              {errors.image && (
                <span className={styles.error}>{errors.image}</span>
              )}
            </div>
            <button
              className={styles.btn}
              disabled={
                btnDisabled() ||
                !form.name ||
                !form.image ||
                !form.life_span ||
                !form.maxHeight ||
                !form.minHeight ||
                !form.maxWeight ||
                !form.minWeight ||
                form.temperaments.length === 0
              }
            >
              CREATE
            </button>
          </form>
          <div className={styles.preview}>
            <h2>PREVIEW</h2>
            {form.image && (
              <p className={styles.previewImg}>
                <img src={form.image} alt={form.name} />
              </p>
            )}
            {form.name && (
              <p>
                Name: <span>{form.name}</span>
              </p>
            )}
            {form.minHeight && form.maxHeight ? (
              <p>
                Height:{" "}
                <span>
                  {form.minHeight} - {form.maxHeight} cm
                </span>
              </p>
            ) : (
              ""
            )}
            {form.minWeight && form.maxWeight ? (
              <p>
                Weight:{" "}
                <span>
                  {form.minWeight} - {form.maxWeight} kg
                </span>
              </p>
            ) : (
              ""
            )}
            {form.temperaments.length !== 0 && (
              <p>
                Temperaments: <span>{form.temperaments.join(", ")}</span>
              </p>
            )}
            {form.life_span && (
              <p>
                Years of life: <span>{form.life_span}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
