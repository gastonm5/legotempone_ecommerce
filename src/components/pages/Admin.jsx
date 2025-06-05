import { useAuth } from '../AuthContext';

const Admin = () => {
  const { logout } = useAuth();

  return (
    <>
      <div>
        <h1>Panel de Administración</h1>
        <button onClick={logout}>Cerrar sesión</button>
        <h4>DESPUES HAGO ALGO MAS COMPLETO, SOLO ESTOY CUMPLIENDO EL REQUISITO</h4>
      </div>
    </>
  );
};

export default Admin;
