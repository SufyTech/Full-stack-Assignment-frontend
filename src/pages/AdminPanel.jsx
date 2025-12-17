import { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [courts, setCourts] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [pricingRules, setPricingRules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [c, e, co, p] = await Promise.all([
          axios.get("http://localhost:5000/api/courts"),
          axios.get("http://localhost:5000/api/equipment"),
          axios.get("http://localhost:5000/api/coaches"),
          axios.get("http://localhost:5000/api/pricing-rules"),
        ]);
        setCourts(c.data);
        setEquipment(e.data);
        setCoaches(co.data);
        setPricingRules(p.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Admin Panel
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Courts */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <h2 className="font-bold mb-2 text-lg">Courts</h2>
            {courts.map((court) => (
              <p key={court.id}>
                {court.name} ({court.type}) - ${court.basePrice}
              </p>
            ))}
          </div>

          {/* Equipment */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <h2 className="font-bold mb-2 text-lg">Equipment</h2>
            {equipment.map((eq) => (
              <p key={eq.id}>
                {eq.name} - Qty: {eq.quantity} - ${eq.price}
              </p>
            ))}
          </div>

          {/* Coaches */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <h2 className="font-bold mb-2 text-lg">Coaches</h2>
            {coaches.map((coach) => (
              <p key={coach.id}>
                {coach.name} - Fee: ${coach.fee}
              </p>
            ))}
          </div>

          {/* Pricing Rules */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <h2 className="font-bold mb-2 text-lg">Pricing Rules</h2>
            {pricingRules.map((rule) => (
              <p key={rule.id}>
                {rule.name} - {rule.type} - {rule.value * 100}%
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
