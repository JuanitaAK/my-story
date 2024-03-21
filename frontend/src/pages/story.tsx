import { NextPageContext } from "next";

import cookie from "cookie";
import axios from "axios";
import OneStorieContainer from "../components/organismes/OneStorieContainer";

export default OneStorieContainer;

export const getServerSideProps = async (context: NextPageContext) => {
  const cookies = cookie.parse(context.req?.headers.cookie || "");
  const token = cookies["Auth-Token"];

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get("http://localhost:5000/story", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 404) {
      return {
        redirect: {
          destination: "/form",
          permanent: false,
        },
      };
    }
    return { props: { story: response.data } };
  } catch (error) {
    console.error("Failed to fetch stories:", error);
    return { notFound: true };
  }
};