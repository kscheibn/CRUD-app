import { Form, Link, useSearchParams } from "react-router-dom";

import classes from "./LoginForm.module.css";

function LoginForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create an account"}</h1>
        <p>
          <label htmlFor="username">Username</label>
          <input id="username" type="username" name="username" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <p>New inventory manager?</p>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create an account" : "login"}
          </Link>
          <button>Enter</button>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;