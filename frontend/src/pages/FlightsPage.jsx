import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Card, Spinner, Row, Col } from 'react-bootstrap';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function FlightsPage() {
  const query = useQuery();
  const from = query.get('from');
  const to = query.get('to');
  const depart = query.get('depart');
  const ret = query.get('ret');

  const [loading, setLoading] = useState(true);
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    async function fetchFlights() {
      setLoading(true);

      // Sample outbound flights
      const outboundFlights = [
        { id: 1, from: 'TLV', to: 'LHR', date: '2024-07-01', time: '08:00' },
        { id: 2, from: 'TLV', to: 'LHR', date: '2024-07-03', time: '13:45' },
        { id: 3, from: 'TLV', to: 'LHR', date: '2024-07-05', time: '07:30' }
      ];

      // Sample return flights
      const returnFlights = [
        { id: 101, from: 'LHR', to: 'TLV', date: '2024-07-10', time: '20:30' },
        { id: 102, from: 'LHR', to: 'TLV', date: '2024-07-12', time: '15:00' },
        { id: 103, from: 'LHR', to: 'TLV', date: '2024-07-15', time: '10:15' }
      ];

      const depStart = new Date(depart);
      const retEnd = new Date(ret);

      const filteredOutbound = outboundFlights.filter(f => {
        const d = new Date(f.date);
        return d >= depStart;
      });

      const filteredReturn = returnFlights.filter(f => {
        const d = new Date(f.date);
        return d <= retEnd;
      });

      const flightPairs = [];
      for (let out of filteredOutbound) {
        for (let ret of filteredReturn) {
          if (new Date(out.date) < new Date(ret.date)) {
            flightPairs.push({ outbound: out, return: ret });
          }
        }
      }

      setPairs(flightPairs);
      setLoading(false);
    }

    fetchFlights();
  }, [from, to, depart, ret]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading flights...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">
        Results for {from} → {to}
      </h2>

      {pairs.map((pair, index) => (
        <Card className="mb-4 shadow-sm" key={index}>
          <Card.Header className="bg-primary text-white">
            ✈️ Option {index + 1}
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <h5>Outbound</h5>
                <p>
                  {pair.outbound.from} → {pair.outbound.to}<br />
                  {pair.outbound.date} at {pair.outbound.time}
                </p>
              </Col>
              <Col>
                <h5>Return</h5>
                <p>
                  {pair.return.from} → {pair.return.to}<br />
                  {pair.return.date} at {pair.return.time}
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      {pairs.length === 0 && (
        <p className="text-center">No matching flights found.</p>
      )}
    </Container>
  );
}
