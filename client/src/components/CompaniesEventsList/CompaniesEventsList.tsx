import { Link } from "react-router-dom";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./CompaniesEventsList.css";

const CompaniesEventsList: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => state.auth);
  const { exhibitions }: any = currentUser;
  return (
    <div className="events-list-wrapper">
      {exhibitions.map((item: any) => (
        <div
          key={item.id}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            {" "}
            {item.title}
            <br /> количество билетов: {item.tickets.length}
          </div>
          <Link to={`/companies-event-card/${item.id}`}>Подробнее</Link>
        </div>
      ))}
    </div>
  );
};

export default CompaniesEventsList;
