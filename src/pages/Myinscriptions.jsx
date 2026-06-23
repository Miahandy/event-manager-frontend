//import { useFetch } from "../hooks/useFetch";
import { getMyInscriptions } from "../services/inscriptionService";
import StatusBadge from "../components/StatusBadge";
import Spinner from "../components/common/Spinner";
import { formatDate } from "../utils/formatDate";
import "./MyInscriptions.css";

export default function MyInscriptions() {
  const { data: inscriptions, loading, error, refetch } = useFetch(getMyInscriptions);

  return (
    <main className="my-inscriptions">
      <h1 className="my-inscriptions__title">Mes inscriptions</h1>

      {loading && <Spinner label="Chargement…" />}
      {error   && <p className="dashboard__error">{error}</p>}

      {!loading && inscriptions?.length === 0 && (
        <p className="dashboard__empty">Vous n'êtes inscrit à aucun événement pour le moment.</p>
      )}

      {inscriptions?.length > 0 && (
        <div className="inscriptions-grid">
          {inscriptions.map(insc => (
            <div key={insc.id} className="insc-card">
              <div className="insc-card__top">
                <h3 className="insc-card__titre">{insc.evenement?.titre ?? "Événement"}</h3>
                <StatusBadge statut={insc.statut} type="inscription" />
              </div>

              <p className="insc-card__meta">
                📅 {formatDate(insc.evenement?.date_debut)}
              </p>
              {insc.evenement?.lieu && (
                <p className="insc-card__meta">📍 {insc.evenement.lieu}</p>
              )}
              <p className="insc-card__date">
                Inscrit le {formatDate(insc.date_inscription)}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
