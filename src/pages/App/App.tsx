import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import PageTemplate from '../PageTemplate';
import HomePage from '../HomePage';
import FavPage from '../FavPage';
import OrdersPage from '../OrdersPage';

import './styles/style.scss';

const App = () => {
  return (
    <Router>
      <PageTemplate>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageTemplate>
    </Router>
  );
};

export default App;
