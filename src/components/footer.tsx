const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <p className="footer-title">
        <a
          className="text-white"
          href="https://github.com/SonOfMan12316/weatherSite"
          target="_blank"
        >
          © mancyDev{" "}
        </a>
        <span>{currentYear}</span>
      </p>
    </div>
  );
};

export default Footer;
