import { Check, X } from 'lucide-react';

export const Pricing = () => {
  const plans = [
    {
      name: "Free Trial",
      duration: "1–2 months",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        { name: "Access to AI Chatbot", included: true },
        { name: "Grant Matching", included: true },
        { name: "Credit Tools", included: false },
        { name: "Personalized Dashboard", included: false },
        { name: "Customer Support", value: "Limited" },
        { name: "Trial Duration", value: "1–2 months" },
        { name: "Conversion After Trial", value: "—" }
      ],
      buttonText: "Start Free Trial",
      popular: false
    },
    {
      name: "Basic",
      duration: "Monthly",
      price: "$25",
      priceUnit: "/mo",
      description: "Essential tools for growing businesses",
      features: [
        { name: "Access to AI Chatbot", included: true },
        { name: "Grant Matching", included: true },
        { name: "Credit Tools", included: false },
        { name: "Personalized Dashboard", included: true },
        { name: "Customer Support", value: "Standard" },
        { name: "Trial Duration", value: "N/A" },
        { name: "Conversion After Trial", value: "80% typical" }
      ],
      buttonText: "Get Started",
      popular: true
    },
    {
      name: "Premium",
      duration: "Monthly",
      price: "$50",
      priceUnit: "/mo",
      description: "Complete solution for serious entrepreneurs",
      features: [
        { name: "Access to AI Chatbot", included: true },
        { name: "Grant Matching", included: true },
        { name: "Credit Tools", included: true },
        { name: "Personalized Dashboard", included: true },
        { name: "Customer Support", value: "Priority" },
        { name: "Trial Duration", value: "N/A" },
        { name: "Conversion After Trial", value: "80% typical" }
      ],
      buttonText: "Go Premium",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-primary">Plan</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start with our free trial and upgrade as your business grows. 
            All plans include access to our comprehensive business support ecosystem.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-primary scale-105' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {plan.description}
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-800 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.priceUnit && (
                    <span className="text-slate-600 dark:text-slate-400">
                      {plan.priceUnit}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {plan.duration}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300 text-sm">
                      {feature.name}
                    </span>
                    <div className="flex items-center">
                      {feature.included !== undefined ? (
                        feature.included ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )
                      ) : (
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {feature.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
              Detailed Feature Comparison
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="text-left p-4 font-medium text-slate-700 dark:text-slate-300">
                    Feature / Plan
                  </th>
                  <th className="text-center p-4 font-medium text-slate-700 dark:text-slate-300">
                    Free Trial<br />
                    <span className="text-sm font-normal">(1–2 months)</span>
                  </th>
                  <th className="text-center p-4 font-medium text-slate-700 dark:text-slate-300">
                    Basic<br />
                    <span className="text-sm font-normal">($25/mo)</span>
                  </th>
                  <th className="text-center p-4 font-medium text-slate-700 dark:text-slate-300">
                    Premium<br />
                    <span className="text-sm font-normal">($50/mo)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">
                    Access to AI Chatbot
                  </td>
                  <td className="p-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">
                    Grant Matching
                  </td>
                  <td className="p-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">
                    Credit Tools
                  </td>
                  <td className="p-4 text-center">
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">
                    Personalized Dashboard
                  </td>
                  <td className="p-4 text-center">
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">
                    Customer Support
                  </td>
                  <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                    Limited
                  </td>
                  <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                    Standard
                  </td>
                  <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                    Priority
                  </td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">
                    Trial Duration
                  </td>
                  <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                    1–2 months
                  </td>
                  <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                    N/A
                  </td>
                  <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                    N/A
                  </td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">
                    Monthly Price
                  </td>
                  <td className="p-4 text-center font-semibold text-green-600">
                    Free
                  </td>
                  <td className="p-4 text-center font-semibold text-slate-800 dark:text-white">
                    $25
                  </td>
                  <td className="p-4 text-center font-semibold text-slate-800 dark:text-white">
                    $50
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-800 dark:text-white">
                    Conversion After Trial
                  </td>
                  <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                    —
                  </td>
                  <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                    80% typical
                  </td>
                  <td className="p-4 text-center text-slate-600 dark:text-slate-400">
                    80% typical
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of Detroit entrepreneurs who are already using Detroit Capital Connect 
            to access funding, build credit, and grow their businesses.
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Start Your Free Trial Today
          </button>
        </div>
      </div>
    </section>
  );
};
