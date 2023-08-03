import {useDispatch, useSelector} from "react-redux";

import {UserSignUpForm} from "./UserSignUpForm";
import {toggleForm, toggleFormType} from "../../redux/slices/userSlice";
import {UserLogInForm} from "./userLogInForm";
import {useState} from "react";

const UserForm = () => {
    const {showForm,formType} = useSelector(({user})=>user)
    const dispatch = useDispatch()
    const [currentFormType, setCurrentFormType] = useState('signup');


    const handleClose = () => {
        dispatch(toggleForm(false))
    }

    const toggleCurrentFormType = (type) =>{
        dispatch(toggleFormType(type))
        setCurrentFormType('signup');
    }



    return (
        showForm? (
            <>
                <div/>
                {formType === 'signup'?
                    <UserSignUpForm toggleCurrentFormType = {toggleCurrentFormType} close={handleClose}/> :
                    <UserLogInForm toggleCurrentFormType = {toggleCurrentFormType} close={handleClose}/>}
            </>
            )
            : null
    );
};

export {UserForm};

// 2.31
