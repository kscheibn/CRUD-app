import { useState } from "react";
import PageContent from "../components/PageContent";
import CreateItemForm from "../components/CreateItemForm";

function InventoryPage() {
  const [createItemShown, setCreateItemShown] = useState(false);

  const showCreateItemHandler = () => {
    setCreateItemShown(true);
  };

  const hideCreateItemHandler = () => {
    setCreateItemShown(false);
  };

  return (
    <PageContent title="Your Inventory">
      {createItemShown && <CreateItemForm onClose={hideCreateItemHandler} />}
      <button onClick={showCreateItemHandler}>Create New Item</button>
    </PageContent>
  );
}

export default InventoryPage;
