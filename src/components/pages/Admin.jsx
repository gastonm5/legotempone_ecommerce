import { useAuth } from '../AuthContext';
import Navbar from '../Nav';
import Footer from '../Footer';

const Admin = () => {
  const { logout } = useAuth();

  return (
    <>
      <Navbar isFixed={false} darkMode={true} />
      <div>
        <h1>Panel de Administración</h1>
        <button onClick={logout}>Cerrar sesión</button>
        <h4>DESPUES HAGO ALGO MAS COMPLETO, SOLO ESTOY CUMPLIENDO EL REQUISITO</h4>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
