import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../configs/routes";
import {
  selectAccessToken,
  selectIsAuthenticated,
} from "../../features/auth/authSlice";
import { useAppSelector } from "../../hooks";

export function PrivateRoute(props: any) {
  const navigate = useNavigate();
  const { children } = props;

  const accessToken = useAppSelector(selectAccessToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  async function init() {
    if (
      (accessToken &&
        Object.keys(accessToken)?.length === 0 &&
        accessToken.constructor === Object) ||
      !accessToken // check accessToken, nhưng mình remove rồi nên nên để access token là 1 account
    ) {
      return navigate(ROUTES.LOGIN);
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !isAuthenticated ? (
    <section className="flex items-center justify-center h-screen">
      Loading
    </section>
  ) : (
    children
  );
}
