import Helmet from 'react-helmet';

function PageHead({ title, description }) {
  return (
    <Helmet>
      <title>channel | {title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
    </Helmet>
  );
}

export default PageHead;
