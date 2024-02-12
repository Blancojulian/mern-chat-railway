import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

export default function Header() {

    const {userInfo} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [logoutApiCall, {isLoading}] = useLogoutMutation();

    const handleLogout = async () => {

        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            console.log(userInfo);
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    }
    return (
        <header>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">MERN Auth</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-md-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/contacto"}>Contacto</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li>
                        </ul>

                        {
                            userInfo ? (
                                <>
                                    <ul className="navbar-nav">
                                        <li className="nav-item dropdown" id="username">
                                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" id="dropdown1" aria-expanded="false">
                                                {userInfo.nombre}
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-md-end dropdown-menu-dark" aria-labelledby="dropdown1">
                                                <li><Link className="dropdown-item" to={'/profile'}>Profile</Link></li>
                                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                                <li><hr className="dropdown-divider"/></li>
                                                <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link className="nav-link" aria-current="page" to="/login"><FaSignInAlt/>Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register"><FaSignOutAlt/>Sing up</Link>
                                        </li>
                                    </ul>
                                </>
                            )
                        }

                    </div>
                </div>
            </nav>
        </header>
    );
}