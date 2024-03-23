import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "NEWSROOM",
  description: "Site created by React and Node.js",
  keywords: "news, React, Node.js, MERN",
};

export default Meta;
