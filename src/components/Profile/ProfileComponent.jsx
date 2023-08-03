import {useEffect, useState} from "react";
import {updateUser, logoutUser} from "../../redux/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";

const ProfileComponent = () => {

    const dispatch = useDispatch()
    const {currentUser} = useSelector(({user})=> user)

    const [values, setValues] = useState({
        firstName:"",
        email:"",
        password:"",

    })

    useEffect(() => {
        if (!currentUser) return

        setValues(currentUser)


    },[currentUser])

    const handleChange = ({target: {value, name}}) => {
        setValues({...values,[name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const isNotEmpty = Object.values(values).every(val=> val)
        if (!isNotEmpty) return
        dispatch(updateUser(values))

    }
    const handleLogOut = () => {
        dispatch(logoutUser())
    }



    return (
        <div className="profile">
            {!currentUser? <span>You need to log in</span>:(
                <form onSubmit={handleSubmit}>
                    <div className="group">
                        <input
                            type="email"
                            placeholder="Your email"
                            name="email" value={values.email}
                            autoComplete="off"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="group">
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
                    <div className="group">
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

                    <button type="submit">
                        Update
                    </button>


                </form>

            )}
            {currentUser? <button type="button" onClick={handleLogOut} >Log out</button> : null}
        </div>
    );
};

export {ProfileComponent};
