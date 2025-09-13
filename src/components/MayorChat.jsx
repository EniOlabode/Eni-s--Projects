import { useEffect, useRef, useState } from "react";

export const MayorChat = () => {
  // chat state
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to Mayor Chat 👋 Tell me about your business (ZIP, stage, industry) and I’ll coach you through federal, state, city, and private grants.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // lightweight intake to tailor answers
  const [profile, setProfile] = useState({
    businessName: "",
    zip: "",
    stage: "idea",
    industry: "",
    employees: "",
    isReturningCitizenHiring: false,
    youthHiring: false,
  });

  const listRef = useRef(null);
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const suggested = [
    "What Detroit small-business grants are open right now?",
    "Am I eligible for a microloan if I have thin credit?",
    "Draft a 150-word problem statement for my grant app.",
    "What documents do I need for SBIR/STTR?",
    "Grants for hiring returning citizens this quarter?",
  ];

  async function sendMessage(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setIsLoading(true);

    const coachContext = {
      profile,
      guidance: {
        locale: "Detroit, MI",
        focus: ["federal", "state", "city", "private foundations", "CDFI/credit-union microloans"],
        outputs: ["eligibility checklist", "deadlines", "document list", "short draft answers"],
      },
    };

    try {
      const apiUrl = import.meta.env.DEV ? "http://localhost:3001/api/coach" : "/api/coach";
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: text }],
          context: coachContext,
        }),
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "⚠️ I couldn’t reach the coach. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          Mayor <span className="text-primary">Chat</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Get guided help applying for federal, local, and private grants.
        </p>

        {/* Intake card */}
        <div className="grid md:grid-cols-2 gap-4 mb-6 bg-card border rounded-2xl p-4">
          <div className="space-y-3">
            <input
              className="w-full border rounded-xl px-3 py-2"
              placeholder="Business name"
              value={profile.businessName}
              onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
            />
            <div className="flex gap-3">
              <input
                className="flex-1 border rounded-xl px-3 py-2"
                placeholder="ZIP (e.g., 48226)"
                value={profile.zip}
                onChange={(e) => setProfile({ ...profile, zip: e.target.value })}
              />
              <select
                className="border rounded-xl px-3 py-2"
                value={profile.stage}
                onChange={(e) => setProfile({ ...profile, stage: e.target.value })}
              >
                <option value="idea">Idea</option>
                <option value="pre-revenue">Pre-revenue</option>
                <option value="revenue">Revenue</option>
                <option value="growth">Growth</option>
              </select>
            </div>
            <input
              className="w-full border rounded-xl px-3 py-2"
              placeholder="Industry (e.g., food, retail, services)"
              value={profile.industry}
              onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
            />
            <input
              className="w-full border rounded-xl px-3 py-2"
              placeholder="Employees (number)"
              value={profile.employees}
              onChange={(e) => setProfile({ ...profile, employees: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={profile.isReturningCitizenHiring}
                onChange={(e) =>
                  setProfile({ ...profile, isReturningCitizenHiring: e.target.checked })
                }
              />
              <span>We hire / plan to hire returning citizens</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={profile.youthHiring}
                onChange={(e) => setProfile({ ...profile, youthHiring: e.target.checked })}
              />
              <span>We hire youth/apprentices</span>
            </label>
            <div className="text-xs text-muted-foreground">
              Do not enter SSNs or bank details. Guidance only—verify on official portals.
            </div>
          </div>
        </div>

        {/* Suggested prompts */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {suggested.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(s);
                setTimeout(() => document.querySelector('button[type="submit"]').focus(), 100);
              }}
              className="rounded-full px-3 py-1 text-sm border hover:bg-secondary"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Chat panel */}
        <div className="border rounded-2xl overflow-hidden bg-card shadow-sm">
          <div ref={listRef} className="h-[65vh] overflow-y-auto p-3 space-y-2 bg-secondary/30">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "mr-auto bg-background border"
                } rounded-xl px-3 py-2`}
              >
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto bg-background border rounded-xl px-3 py-2 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2 p-3 border-t bg-background">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about eligibility, deadlines, documents…"
              className="flex-1 rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="rounded-xl px-4 py-2 text-sm bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
              disabled={isLoading || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
