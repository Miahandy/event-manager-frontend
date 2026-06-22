import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-page__code">404</div>
      <h1 className="error-page__title">Page introuvable</h1>
      <p className="error-page__text">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="error-page__btn">
        Retour à l'accueil
      </Link>
    </div>
  );
}
