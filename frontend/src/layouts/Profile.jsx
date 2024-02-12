import { useState, useEffect, useRef } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { FaEdit } from "react-icons/fa";
import ChatBox from "../components/Chat/ChatBox";

//min 8 letter password, with at least a symbol, upper and lower case letters and a number
const checkPassword = (str) => (/^(?=.*\d)(?=.*[!@#$%^&*+-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).test(str);

export default function Profile() {

    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isDisabled, setIsDisabled] = useState(true);
    const [canEditPassword, setCanEditPassword] = useState(false);
    
    const inputNombre = useRef(null);
    const inputApellido = useRef(null);
    const inputEmail = useRef(null);
    const inputPassword = useRef(null);
    const inputConfirmPassword = useRef(null);
    const inputCheckboxEdit = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [updateUser, {isLoading}] = useUpdateUserMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        
        setDatos({
            ...datos,
            nombre: userInfo.nombre,
            apellido: userInfo.apellido,
            email: userInfo.email
        });
        
    }, [userInfo.nombre, userInfo.apellido, userInfo.email]);

    useEffect(() => {
        const setDisabledInputs = (isDisabled = false) => {
            inputNombre.current.disabled = isDisabled;
            inputApellido.current.disabled = isDisabled;
            inputEmail.current.disabled = isDisabled;
            inputCheckboxEdit.current.disabled = isDisabled;
            
            if (isDisabled) {
                //inputConfirmPassword.current.disabled = isDisabled;
                //inputCheckboxEdit.current.disabled = isDisabled;
                
                setCanEditPassword(false);
                setDatos(prevDatos => ({
                    ...prevDatos,
                    nombre: userInfo.nombre,
                    apellido: userInfo.apellido,
                    email: userInfo.email
                }));
                //no tira error pero no deberia usar userInfo sin agregar al array de dependencias
                //usar useRef para hacer un deep clone de los datos
                /*
                setDatos({
                    ...datos,
                    nombre: userInfo.nombre,
                    apellido: userInfo.apellido,
                    email: userInfo.email
                });
                
                */
            }
            
        }
        setDisabledInputs(isDisabled);
        //esta mal, tiene que tener canEditPassword
    }, [isDisabled]);

    useEffect(() => {
        const isDisabled = !canEditPassword;
        inputPassword.current.disabled = isDisabled;
        inputConfirmPassword.current.disabled = isDisabled;
        /*if (isDisabled) {
            inputPassword.current.value = '';
            inputConfirmPassword.current.value = '';
        }*/
            
    }, [canEditPassword]);

    const handleSetDatos = (e) => {
        const target = e.currentTarget;
        const prop = target.name || target.id;
        const value = target.value;
        setDatos({...datos, [prop]: value});
        console.log(datos);
    }

    
    //volver a los valores originales de userInfo si se deshabilita
    const handleDisabled = (e) => {
        e.preventDefault();
        setIsDisabled(!isDisabled);
    }



    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit');
        try {
            if (canEditPassword && datos.password !== datos.confirmPassword) {
                throw new Error('Las contraseñas no coinciden');
            }
            if (canEditPassword && !checkPassword(datos.password)) {
                throw new Error('Contraseña invalida');
            }
            if (canEditPassword && !checkPassword(datos.confirmPassword)) {
                throw new Error('Contraseña para confirmar invalida');
            }
            const {password, confirmPassword, ...datosUsuario} = datos;
            datosUsuario._id = userInfo._id;
            if (canEditPassword) {
                datosUsuario.password = password;
            }
            const res = await updateUser(datosUsuario).unwrap();
            dispatch(setCredentials({...res}));
            toast.success('Existo sl modificar el perfil');
        } catch (err) {
            toast.error(err.data?.message || err?.message)
            console.log(err.data?.message || err?.message);
        }

    }
    
    return (
        <>
            <FormContainer>
                <h1>Profile {userInfo.nombre} {userInfo.apellido}</h1>
                <FaEdit size={'3rem'} onClick={handleDisabled}/>
                <form className="form" onSubmit={submitHandler} disabled>
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input ref={inputNombre} type="text" className="form-control" id="nombre" value={datos.nombre} onChange={handleSetDatos}/>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="apellido" className="form-label">Apellido</label>
                            <input ref={inputApellido} type="text" className="form-control" id="apellido" value={datos.apellido} onChange={handleSetDatos}/>
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input ref={inputEmail} type="email" className="form-control" id="email" value={datos.email} onChange={handleSetDatos}/>
                    </div>
                    <div className="">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input ref={inputPassword} type="password" className="form-control" id="password" value={datos.password} onChange={handleSetDatos}/>
                    </div>
                    <div className="">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input ref={inputConfirmPassword} type="password" className="form-control" id="confirmPassword" value={datos.confirmPassword} onChange={handleSetDatos}/>
                    </div>
                    
                    <div className="mb-3 form-check">
                        <input ref={inputCheckboxEdit} checked={canEditPassword} onChange={(e) => setCanEditPassword(prev => !prev)} type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Modificar contraseña</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {isLoading && <Loader />}
                </form>
            </FormContainer>
        
            <ChatBox></ChatBox>
        </>

    );   
}