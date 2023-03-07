import { NextRouter } from "next/router";

const removeQueryParamsFromRouter = ({ router, queryParamKey }: { router: NextRouter; queryParamKey: string }) => {
  delete router.query[queryParamKey];

  return router.replace(
    {
      pathname: router.pathname,
      query: router.query,
    },
    undefined,
    { shallow: true }
  );
};

const addQueryParamToRouter = ({
  router,
  queryParamKey,
  queryParamValue,
}: {
  router: NextRouter;
  queryParamKey: string;
  queryParamValue?: string;
}) => {
  return router.push(
    {
      pathname: router.pathname,
      query: {
        ...router.query,
        [queryParamKey]: queryParamValue,
      },
    },
    undefined,
    {
      shallow: true,
    }
  );
};

const updateQueryParamForRouter = ({
  router,
  queryParamKey,
  queryParamValue,
}: {
  router: NextRouter;
  queryParamKey: string;
  queryParamValue?: string;
}) => {
  if (queryParamValue === "") {
    return removeQueryParamsFromRouter({ router, queryParamKey });
  } else {
    return addQueryParamToRouter({ router, queryParamKey, queryParamValue });
  }
};

export default updateQueryParamForRouter;
