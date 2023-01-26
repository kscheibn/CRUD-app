import Modal from "./UI/Modal";
import Input from "./UI/Input";
import classes from "./CreateItemForm.module.css";
import { useRef } from "react";

const CreateItemForm = (props) => {
  const nameInputRef = useRef();
  const descInputRef = useRef();
  const quantityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const itemData = {
      enteredName: nameInputRef.current.value,
      enteredDescription: descInputRef.current.value,
      enteredQuantity: quantityInputRef.current.value,
    };

    console.log(itemData);
  };

  return (
    <Modal>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2>Create New Item</h2>
        <Input
          ref={nameInputRef}
          label="Name"
          input={{
            id: "name_" + props.id,
            type: "text",
            size: "50",
          }}
        />
        <Input
          ref={descInputRef}
          label="Description"
          input={{
            id: "description_" + props.id,
            type: "text",
            size: "50",
          }}
        />
        <Input
          ref={quantityInputRef}
          label="Quantity"
          input={{
            id: "quantity_" + props.id,
            type: "number",
            min: 0,
            step: 1,
            default: 1,
            size: 5,
          }}
        />
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          <button className={classes.button}>Create</button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateItemForm;
