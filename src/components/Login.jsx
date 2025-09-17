import { useState } from "react";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    password: "",
    industry: "",
    zip: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/login" : "/api/signup";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert(isLogin ? "Welcome back 👋" : "Account created! 🎉");
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <section id="Login" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          {isLogin ? "Log in" : "Sign up"}{" "}
          <span className="text-primary">to DCC</span>
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          {isLogin
            ? "Welcome back! Log in to continue your funding journey."
            : "Create an account to unlock grants, loans, and impact rewards."}
        </p>

        <div className="border rounded-2xl bg-card shadow-sm p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={form.companyName}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3"
                  required
                />
                <input
                  type="text"
                  name="industry"
                  placeholder="Industry"
                  value={form.industry}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3"
                />
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  value={form.zip}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3"
                />
              </>
            )}

            <input
              type="email"
              name="email"
              placeholder="Business Email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border p-3"
              required
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline"
            >
              {isLogin ? "Sign up here" : "Log in here"}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};
