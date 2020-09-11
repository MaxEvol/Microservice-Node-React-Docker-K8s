import buildCliente from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>Logado</h1> : <h1>Deslogado</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const { data } = await buildCliente(context).get("/api/users/currentuser");
  return data;
};

export default LandingPage;
