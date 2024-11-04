const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <p className="footer-title">
        <span>© mancyDev </span>
        <span>{currentYear}</span>
      </p>
    </div>
  );
};

export default Footer;
