import { useState } from 'react';
import { useAuth } from '../AuthContext';
import Navbar from '../Nav';
import Footer from '../Footer';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <>
            <Navbar isFixed={false} darkMode={true} />
            <div className="login-container">
                <h2>Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Ingresar</button>
                    <h4>DESPUES HAGO ALGO MAS COMPLETO, SOLO ESTOY CUMPLIENDO EL REQUISITO</h4>
                </form>
                <Footer />
            </div>
        </>
    );
};

export default Login;
