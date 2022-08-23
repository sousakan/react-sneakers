import Logo from '../Logo';
import Navigation from '../Navigation';
import Container from '../Container';

import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <Container isSmall={true}>
        <div className="header__content">
          <Logo />
          <Navigation />
        </div>
      </Container>
    </header>
  );
};

export default Header;
