import Helmet from 'react-helmet';

function MainHead({ iconBgColor }) {
  const title = 'Talk wave';
  const description =
    "Talk Wave is a chat app designed to simplify communication with friends, family, and colleagues. It offers real-time text messaging, basic voice and a straightforward file-sharing option. Boasting an intuitive interface, it's easily understood and used by people of all ages. With basic encryption technology, it ensures the protection of personal information. With its straightforward setup process, anyone can get started instantly. Talk Wave aims to make everyday communication more convenient.";

  return (
    <Helmet>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="msapplication-TileColor" content={iconBgColor} />
      <meta name="theme-color" content={iconBgColor} />
    </Helmet>
  );
}

export default MainHead;
