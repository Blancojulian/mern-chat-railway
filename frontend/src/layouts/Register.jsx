import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

//min 8 letter password, with at least a symbol, upper and lower case letters and a number
const checkPassword = (str) => (/^(?=.*\d)(?=.*[!@#$%^&*+-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/).test(str);

export default function Register() {
    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, {isLoading}] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const handleSetDatos = (e) => {
        const target = e.currentTarget;
        const prop = target.name || target.id;
        const value = target.value;
        setDatos({...datos, [prop]: value});
        console.log(datos);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit');
        try {
            if (datos.password !== datos.confirmPassword) {
                throw new Error('Las contraseñas no coinciden');
            }
            if (!checkPassword(datos.password)) {
                throw new Error('Contraseña invalida');
            }
            if (!checkPassword(datos.confirmPassword)) {
                throw new Error('Contraseña para confirmar invalida');
            }
            const {confirmPassword, ...datosUsuario} = datos;
            const res = await register(datosUsuario).unwrap();
            dispatch(setCredentials({...res}));
            navigate('/');
        } catch (err) {
            toast.error(err.data?.message || err?.message)
            console.log(err.data?.message || err?.message);
        }

    }
    return (
        <FormContainer>
            <form className="form" onSubmit={submitHandler}>
                <div className="row">
                    <div className="col-sm-6">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" value={datos.nombre} onChange={handleSetDatos}/>
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input type="text" className="form-control" id="apellido" value={datos.apellido} onChange={handleSetDatos}/>
                    </div>
                </div>
                <div className="">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={datos.email} onChange={handleSetDatos}/>
                </div>
                <div className="">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={datos.password} onChange={handleSetDatos}/>
                </div>
                <div className="">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" value={datos.confirmPassword} onChange={handleSetDatos}/>
                </div>
                
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                {isLoading && <Loader />}
                <p>¿Tiene cuenta? <Link to='/login'>Login</Link></p>
            </form>
        </FormContainer>

    );

        {/*}
        <div className="container py-5">
            <form className="w-50">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    {*/}

}