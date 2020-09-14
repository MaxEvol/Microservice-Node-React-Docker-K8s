import Link from "next/link";

const HeaderPage = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Criar Conta", href: "/auth/singup" },
    !currentUser && { label: "Logar", href: "/auth/singin" },
    currentUser && { label: "Sair", href: "/auth/singout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">Gitix</a>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex aling-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default HeaderPage;
