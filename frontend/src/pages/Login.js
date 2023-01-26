import LoginForm from "../components/LoginForm";
import { redirect } from "react-router-dom";

function LoginPage() {
  return <LoginForm />;
}

export default LoginPage;

export async function action({ request }) {

  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  console.log(authData);

  return redirect("/inventory");
}
