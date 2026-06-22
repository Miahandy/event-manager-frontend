import { Link, useNavigate } from "react-router-dom";
import "./NotFound";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-page__code error-page__code--warn">403</div>
      <h1 className="error-page__title">Accès refusé</h1>
      <p className="error-page__text">
        Vous n'avez pas les droits nécessaires pour accéder à cette page.
      </p>
      <div className="error-page__actions">
        <button onClick={() => navigate(-1)} className="error-page__btn error-page__btn--outline">
          Retour
        </button>
        <Link to="/" className="error-page__btn">
          Accueil
        </Link>
      </div>
    </div>
  );
}
