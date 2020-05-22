import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// Route-based code splitting
const Home = lazy(() => import("./views/pages/Home"));

const Page2 = lazy(() => import("./views/pages/Page2"));

const login = lazy(() => import("./views/pages/authentication/login/Login"));
const register = lazy(() =>
  import("./views/pages/authentication/register/Register")
);
const obtener_usuario = gql`
  {
    obtenerUsuario {
      email
    }
  }
`;
const loginRoute = "/pages/login";
const registerRoute = "/pages/register";
// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => {
  const { loading, error, data } = useQuery(obtener_usuario);
  if (loading) return <div className="d-flex justify-content-between align-items-center">
  <Spinner color="primary" />
</div>;

  console.log(data);
  let { pathname } = history.location;

  if (
    (!data || (data && !data.obtenerUsuario)) &&
    loginRoute !== pathname &&
    registerRoute !== pathname
  ) {
    history.push(loginRoute);
  } else if (
    data &&
    data.obtenerUsuario &&
    (loginRoute === pathname || registerRoute === pathname)
  ) {
    history.push("/");
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              let LayoutTag =
                fullLayout === true
                  ? context.fullLayout
                  : context.state.activeLayout === "horizontal"
                  ? context.horizontalLayout
                  : context.VerticalLayout;
              return (
                <LayoutTag {...props} permission={props.user} user={data}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Home} />
          <AppRoute path="/page2" component={Page2} />
          <AppRoute path={loginRoute} component={login} fullLayout />
          <AppRoute path={registerRoute} component={register} fullLayout />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
