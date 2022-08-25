import Cart from '../../components/Cart';
import Header from '../../components/Header';
import Container from '../../components/Container';

interface Props {
  children: JSX.Element
}


const PageTemplate = ({ children }: Props) => {
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
