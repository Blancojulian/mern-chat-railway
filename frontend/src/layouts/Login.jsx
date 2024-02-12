import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit');
        try {
            const res = await login({email, password}).unwrap();
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
                <div className="">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"
                    placeholder="Ingrese email" 
                    value={email}
                    onChange={(e)=>setEmail(e.currentTarget.value)}/>
                </div>
                <div className="">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Ingrese password" value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>
                </div>
                
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button disabled={isLoading} type="submit" className="btn btn-primary">Submit</button>
                {isLoading && <Loader />}
                <p>¿No tiene cuenta? <Link to='/register'>Register</Link></p>

            </form>
        
            
        </FormContainer>
    );
}