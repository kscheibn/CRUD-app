import classes from "./Item.module.css";
import Card from "../UI/Card";

const Item = (props) => {
  const longDesc = props.description.length > 100;

  return (
    <li className={classes.item}>
      <Card>
        <h3>{props.name}</h3>
        {!longDesc && <div className={classes.description}>{props.description}</div>}
        {longDesc && <div className={classes.description}>{props.description.slice(0, 99) + "..."}</div>}
        <div className={classes.quantity}>Quantity: {props.quantity}</div>
      </Card>
    </li>
  );
};

export default Item;
