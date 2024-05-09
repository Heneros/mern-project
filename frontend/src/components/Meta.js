import { Helmet } from "react-helmet-async";
import Favicon from "../styles/img/favicon-16x16.png";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="icon" type="image/png" href={Favicon} sizes="16x16" />
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "NEWSROOM",
  description: "Site created by React and Node.js",
  keywords: "News, React, Node.js, MERN",
};

export default Meta;
