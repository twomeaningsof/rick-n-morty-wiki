import { NextPageContext } from "next";

const getServerSideQueryParamFromContext = (context: NextPageContext, queryParamKey: string) => {
  return context.query[queryParamKey] || null;
};

export default getServerSideQueryParamFromContext;
