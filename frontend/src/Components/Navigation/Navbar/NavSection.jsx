import NavItem from "./NavItem";

const NavSection = ({
  items,
  openIndex,
  setOpenIndex,
  currentRoute,
  setCurrentRoute,
}) => {
  return (
    <ul className="flex items-center h-8">
      {items.map((item, index) => (
        <NavItem
          key={item.id || index}
          item={item}
          index={index}
          isOpen={openIndex === index}
          isActive={currentRoute === item.title}
          setOpenIndex={setOpenIndex}
          setCurrentRoute={setCurrentRoute}
        />
      ))}
    </ul>
  );
};

export default NavSection;
