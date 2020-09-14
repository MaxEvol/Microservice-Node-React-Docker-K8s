import "bootstrap/dist/css/bootstrap.css";
import buildCliente from "../api/build-client";
import HeaderPage from "../components/header";

const AppPrincipal = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <HeaderPage currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppPrincipal.getInitialProps = async (appContext) => {
  const { data } = await buildCliente(appContext.ctx).get(
    "/api/users/currentuser"
  );

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppPrincipal;
