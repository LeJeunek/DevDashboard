import { Container } from 'react-bootstrap';
import Sidebar from './components/Sidebar.jsx';
import './index.css';

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="main-content p-4" style={{ marginLeft: "220px" }}>
        <h1>Welcome to Dev Dashboard</h1>
        <p>Your one-stop solution for development resources and tools.</p>
      </Container>
    </div>
  );
}

export default App;
