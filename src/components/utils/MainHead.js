import Helmet from 'react-helmet';

function MainHead({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}

MainHead.defaultProps = {
  title: 'Talk wave',
  description:
    "Talk Wave is a chat app designed to simplify communication with friends, family, and colleagues. It offers real-time text messaging, basic voice and a straightforward file-sharing option. Boasting an intuitive interface, it's easily understood and used by people of all ages. With basic encryption technology, it ensures the protection of personal information. With its straightforward setup process, anyone can get started instantly. Talk Wave aims to make everyday communication more convenient.",
};

export default MainHead;
