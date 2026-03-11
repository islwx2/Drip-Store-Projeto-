import { useState } from 'react';
import Logo from './logo';
import SearchBar from './searchBar';
import AuthLinks from './authLinks';
import MainNav from './mainNave';
import CartIcon from './cartIcon';
import CartDropdown from './cartDropDown';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleToggleCart = () => setIsCartOpen(prev => !prev);
  const handleCloseCart = () => setIsCartOpen(false);

  return (
    <header className="relative w-full border-b border-gray-200 bg-white px-4 md:px-6 py-4 flex flex-col gap-4">
  
      <div className="flex items-center justify-between w-full flex-wrap gap-x-6 gap-y-4">
        
  
        <div className="flex-shrink-0 order-1">
          <Logo />
        </div>

      
        <div className="flex items-center gap-4 md:gap-6 flex-shrink-0 order-2 md:order-3">
          <div className="whitespace-nowrap">
            <AuthLinks />
          </div>
          <CartIcon onToggle={handleToggleCart} />
        </div>
        
        
        <div className="w-full md:flex-grow md:w-auto order-3 md:order-2">
          <SearchBar />
        </div>
      </div>
      
      <div className="flex justify-start">
        <MainNav />
      </div>

      <CartDropdown isOpen={isCartOpen} onClose={handleCloseCart} />
    </header>
  );
};

export default Header;