import Item from "./Item";
import classes from "./AvailableItems.module.css";

const DUMMY_ITEMS = [
  {
    id: "i1",
    name: "Item 1",
    description: "This is a description of the very first item!",
    quantity: 5,
  },
  {
    id: "i2",
    name: "Item 2",
    description: "Another description.",
    quantity: 15,
  },
  {
    id: "i3",
    name: "Item 3",
    description: "This is going to be a really long descripion. It needs to be at least 100 characters long--hopefully longer!",
    quantity: 25,
  },
  {
    id: "i4",
    name: "Item 4",
    description: "Woohoo! End of the list.",
    quantity: 10,
  },
];

const AvailableItems = () => {
  const itemsList = DUMMY_ITEMS.map((item) => (
    <Item
      key={item.id}
      id={item.id}
      name={item.name}
      description={item.description}
      quantity={item.quantity}
    />
  ));

  return (
    <section className={classes.items}>
        <ul>{itemsList}</ul>
    </section>
  );
};

export default AvailableItems;