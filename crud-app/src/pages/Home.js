import PageContent from "../components/PageContent";
import Card from "../components/UI/Card";

function HomePage() {
  return (
    <PageContent title="Welcome!">
      <ul>
        <li>
          <Card>
            <h1>I'm an item!</h1>
          </Card>
        </li>
        <li>
          <Card>
            <h1>Me too!</h1>
          </Card>
        </li>
      </ul>
    </PageContent>
  );
}

export default HomePage;
