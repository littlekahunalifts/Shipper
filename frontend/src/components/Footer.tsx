function Footer() {
  return (
    <>
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="/home" className="nav-link px-2 text-muted">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link px-2 text-muted">
              About
            </a>
          </li>
        </ul>
        <p className="text-center text-muted">
          Shipper Project
          <br />
          Est. 2024
        </p>
      </footer>
    </>
  );
}

export default Footer;
