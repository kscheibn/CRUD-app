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


  // const response = await fetch("https://localhost:8080/" + mode, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(authData),
  // });

  // if (response.status === 422 || response.status === 401) {
  //   return response;
  // }

  // if (!response.ok) {
  //   return response.json(
  //     { message: "Could not authenticate user" },
  //     { status: 500 }
  //   );
  // }

  return redirect("/inventory");
}
