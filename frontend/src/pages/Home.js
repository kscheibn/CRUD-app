import AvailableItems from "../components/Items/AvailableItems";
import PageContent from "../components/PageContent";

function HomePage() {
  return (
    <PageContent title="Inventory">
      <AvailableItems />
    </PageContent>
  );
}

export default HomePage;
