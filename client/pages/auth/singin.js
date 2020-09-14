import { useState } from "react";
import UseRequest from "../../hooks/use-request";
import Router from "next/router";

const singIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = UseRequest({
    url: "/api/users/singin",
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
      <h1>Sing In</h1>
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
      <button className="btn btn-primary">Sing In</button>
    </form>
  );
};
export default singIn;
