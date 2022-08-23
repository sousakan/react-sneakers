import Cart from '../../components/Cart';
import Header from '../../components/Header';
import Container from '../../components/Container';

const PageTemplate = ({ children }) => {
  return (
    <div className="page">
      <Header />
      <main className="page__content">
        <Container>{children}</Container>
      </main>
      <Cart />
    </div>
  );
};

export default PageTemplate;
