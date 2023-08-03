import {useState} from "react";
import {useDispatch} from "react-redux";
import {createUser} from "../../redux/slices/userSlice";
import css from './formStyles.module.css'
import {CloseButton} from "react-bootstrap";



const UserSignUpForm = ({close,toggleCurrentFormType}) => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        firstName:"",
        email:"",
        password:"",

    })


    const handleChange = ({target: {value, name}}) => {
        setValues({...values,[name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        const isNotEmpty = Object.values(values).every(val=> val)
        if (!isNotEmpty) return
        dispatch(createUser(values))
        close()
    }


    return (
        <div className={css.overlay}>


        <div className={css.wrap}>


           {/*<button className="close_btn" onClick={close}>Close X</button>*/}
            <CloseButton onClick={close} className={css.close_btn}/>

            <div className={css.title}>
                Sign Up
            </div>

            <form onSubmit={handleSubmit}>
                <div className={css.group}>
                    <input
                        type="email"
                        placeholder="Your email"
                        name="email" value={values.email}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={css.group}>
                    <input
                        type="firstName"
                        placeholder="Your name"
                        name="firstName"
                        value={values.firstName}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={css.group}>
                    <input
                        type="password"
                        placeholder="Your password"
                        name="password"
                        value={values.password}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>


                <div className={css.group} onClick={()=>toggleCurrentFormType('login')}>
                    I have an account
                </div>

                <button type="submit">
                    Create an account
                </button>
            </form>


            </div>

        </div>
    );
};

export {UserSignUpForm};

// 2.17
