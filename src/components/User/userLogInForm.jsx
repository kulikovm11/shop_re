import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../redux/slices/userSlice";

import css from './formStyles.module.css'
import {CloseButton} from "react-bootstrap";
const UserLogInForm = ({close, toggleCurrentFormType}) => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({

        username:"",
        password:"",

    })

    const errorMessage = useSelector(({user})=>user.errorMessage)
    const logError = useSelector(({user})=>user.error)
    const [loginError, setLoginError] = useState(false);


    const handleChange = ({target: {value, name}}) => {
        setValues({...values,[name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        const isNotEmpty = Object.values(values).every(val=> val)
        if (!isNotEmpty) return

        dispatch(loginUser(values))
            .then((resp)=>{
                if (resp.error){
                    setLoginError(true)
                }else {
                    close()
                }
            })


    }


    return (
        <div className={css.overlay}>


        <div className={css.wrap}>

            <CloseButton onClick={close} className={css.close_btn}/>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <div className={css.title}>
                Login
            </div>

            <form onSubmit={handleSubmit}>
                <div className={css.group}>
                    <input
                        type="text"
                        placeholder="Your username"
                        name="username" value={values.username}
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

                <p style={{color:"red"}}>kminchelle</p>
                <p style={{color:"red"}}>0lelplR</p>


                <div className={css.group}  onClick={()=>toggleCurrentFormType('signup')}>
                    Create an account
                </div>

                <button type="submit">
                    Login
                </button>
            </form>




            </div>

        </div>
    );
};

export {UserLogInForm};

