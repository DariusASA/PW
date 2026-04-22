import { Link } from 'react-router';

function NotFound() {
  return (
    <div>
      <h2>404 — Pagina nu există</h2>
      <p>Pagina pe care o cauți nu a fost găsită.</p>
      <Link to="/">Înapoi la Home</Link>
    </div>
  );
}

export default NotFound;