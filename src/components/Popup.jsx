const Popup = ({ message, onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>REQUISITOS CUMPLIDOS DEL PROYECTO:</h2>
        <div style={{ marginBottom: '20px' }}>{message}</div>
        <button onClick={onClose} style={styles.button}>Cerrar</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  popup: {
    background: 'white',
    padding: '30px',
    borderRadius: '8px',
    maxWidth: '400px',
    boxShadow: '0 0 10px rgba(0,0,0,0.25)',
    textAlign: 'center',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0077cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Popup;
