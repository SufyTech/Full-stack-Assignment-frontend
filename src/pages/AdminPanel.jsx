import { useState, useEffect } from "react";
import axios from "axios";

// Replace this with your deployed backend URL
const BASE_URL = "https://court-backend-5ifj.onrender.com";

const AdminPanel = () => {
  const [courts, setCourts] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [pricingRules, setPricingRules] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [c, e, co, p, w] = await Promise.all([
        axios.get(`${BASE_URL}/api/courts`),
        axios.get(`${BASE_URL}/api/equipment`),
        axios.get(`${BASE_URL}/api/coaches`),
        axios.get(`${BASE_URL}/api/pricing-rules`),
        axios.get(`${BASE_URL}/api/waitlist`),
      ]);

      setCourts(c.data || []);
      setEquipment(e.data || []);
      setCoaches(co.data || []);
      setPricingRules(p.data || []);
      setWaitlist(
        (w.data || []).map((entry) => ({
          ...entry,
          court: entry.court || { name: "Unknown" },
          date: new Date(entry.date),
        }))
      );
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const promoteUser = async (entryId) => {
    try {
      await axios.post(`${BASE_URL}/api/waitlist/${entryId}/promote`);
      fetchData();
    } catch (err) {
      console.error("Promote error:", err);
    }
  };

  const removeUser = async (entryId) => {
    try {
      await axios.delete(`${BASE_URL}/api/waitlist/${entryId}`);
      fetchData();
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-3 py-4">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Courts */}
          <Section title="Courts">
            {courts.length === 0 ? (
              <Empty />
            ) : (
              courts.map((court) => (
                <Item
                  key={court._id}
                  text={`${court.name || "Unknown Court"} (${
                    court.type || "-"
                  })`}
                  sub={`Base Price: ₹${
                    court.basePrice || (court.type === "indoor" ? 500 : 300)
                  }`}
                />
              ))
            )}
          </Section>

          {/* Equipment */}
          <Section title="Equipment">
            {equipment.length === 0 ? (
              <Empty />
            ) : (
              equipment.map((eq) => (
                <Item
                  key={eq._id}
                  text={eq.name || "Unknown Equipment"}
                  sub={`Qty: ${eq.availableQuantity || 0} | ₹${
                    eq.pricePerHour || 0
                  }/hr`}
                />
              ))
            )}
          </Section>

          {/* Coaches */}
          <Section title="Coaches">
            {coaches.length === 0 ? (
              <Empty />
            ) : (
              coaches.map((coach) => (
                <Item
                  key={coach._id}
                  text={coach.name || "Unknown Coach"}
                  sub={`Fee: ₹${coach.hourlyRate || 0}/hr`}
                />
              ))
            )}
          </Section>

          {/* Pricing Rules */}
          <Section title="Pricing Rules">
            {pricingRules.length === 0 ? (
              <Empty />
            ) : (
              pricingRules.map((rule) => {
                const multiplier = rule.multiplier || 1;
                return (
                  <Item
                    key={rule._id}
                    text={rule.name || "Unnamed Rule"}
                    sub={`${rule.type || "-"} → ${(
                      (multiplier - 1) *
                      100
                    ).toFixed(0)}%`}
                  />
                );
              })
            )}
          </Section>

          {/* Waitlist */}
          <Section title="Waitlist">
            {waitlist.length === 0 ? (
              <Empty text="No users on waitlist 🎉" />
            ) : (
              waitlist
                .sort((a, b) => {
                  const dateDiff = a.date - b.date;
                  if (dateDiff !== 0) return dateDiff;
                  const [aHour, aMin] = a.slot.split(":").map(Number);
                  const [bHour, bMin] = b.slot.split(":").map(Number);
                  return aHour !== bHour ? aHour - bHour : aMin - bMin;
                })
                .map((w) => (
                  <div key={w._id} className="space-y-1">
                    <Item
                      text={`${w.users.join(", ")} — ${w.slot || "-"}`}
                      sub={`Court: ${w.court.name} | ${w.date.toDateString()}`}
                    />
                    <div className="flex space-x-2">
                      <button
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                        onClick={() => promoteUser(w._id)}
                      >
                        Promote
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        onClick={() => removeUser(w._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
            )}
          </Section>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

/* ---------- UI Components ---------- */
const Section = ({ title, children }) => (
  <div className="p-4 border rounded-xl bg-gray-50">
    <h2 className="font-bold mb-3">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const Item = ({ text, sub }) => (
  <div className="p-3 bg-white rounded-lg shadow-sm">
    <p className="font-medium text-gray-800">{text}</p>
    <p className="text-sm text-gray-500">{sub}</p>
  </div>
);

const Empty = ({ text = "No data available" }) => (
  <p className="text-sm text-gray-400 italic">{text}</p>
);
