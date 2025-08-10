import DropdownCardList from "./DropdownCardList";

const NavDropdown = ({ items, type, dispatch }) => {
  return <DropdownCardList items={items} type={type} dispatch={dispatch} />;
};

export default NavDropdown;
