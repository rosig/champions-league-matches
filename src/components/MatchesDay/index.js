import React, { useState, useEffect } from "react";
import Matches from "../Matches";
import { Card } from "react-bootstrap";
import { parseISO, getMonth, getDate } from "date-fns";
import { FaRegSadCry } from "react-icons/fa";
import TitleSection from "../TitleSection";
import "./styles.scss";

export default function MatchesDay({ matchesByDate }) {
  const [matchesDay, setMatchesDay] = useState([]);

  useEffect(() => {
    const matchesTdy = matchesByDate.filter((matches) => {
      const formatDate = parseISO(matches.date);
      const currentDate = new Date();
      return (
        getDate(formatDate) === currentDate.getDate() &&
        getMonth(formatDate) === currentDate.getMonth()
      );
    });

    setMatchesDay(matchesTdy);
  }, [matchesByDate]);

  return (
    <section className="matchesDay">
      <TitleSection text="Jogos do dia" />
      {matchesDay.length > 0 ? (
        matchesDay.map((matches) => (
          <Matches key={matches.date} matches={matches} />
        ))
      ) : (
        <div className="matchesDay__warning">
          <Card bg={"dark"} text={"white"} className="mb-2">
            <Card.Header>
              {"Hoje não tem jogos!"}
              <FaRegSadCry
                style={{ marginLeft: "10px", width: "25px", height: "25px" }}
              />
            </Card.Header>
          </Card>
        </div>
      )}
    </section>
  );
}
