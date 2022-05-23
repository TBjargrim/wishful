import Head from 'next/head';

const Header = ({ children }) => {
  return (
    <Head>
      <title>{children}</title>
    </Head>
  );
};

export default Header;
