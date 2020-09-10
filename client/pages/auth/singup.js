import { useState } from "react";
import UseRequest from "../../hooks/use-request";
import Router from "next/router";

const singUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = UseRequest({
    url: "/api/users/singup",
    method: "post",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });

  const OnSubmit = async (e) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <form onSubmit={OnSubmit}>
      <h1>Sing Up</h1>
      <div className="form-group">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sing Up</button>
    </form>
  );
};
export default singUp;
