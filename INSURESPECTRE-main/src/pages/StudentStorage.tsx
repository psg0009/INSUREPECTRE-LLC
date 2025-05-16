export default function StudentStorage() {
  const packingGuidelines = [
    {
      title: "Boxes",
      description:
        "Use sturdy cardboard boxes. Tape all seams securely. Label each box with your name and order number clearly."
    },
    {
      title: "Electronics",
      description:
        "Use original boxes when possible. Wrap electronics with bubble wrap and pack tightly to prevent movement."
    },
    {
      title: "Furniture",
      description:
        "Disassemble furniture if possible. Cover with moving blankets. We are not liable for unwrapped items like futons or dressers."
    },
    {
      title: "Fragile Items",
      description:
        'Wrap all glass, ceramics, and delicate items carefully. Place "FRAGILE" labels on boxes containing breakables.'
    },
    {
      title: "Prohibited Items",
      description:
        "No perishables, liquids, explosives, flammable items, illegal substances, or live plants are allowed in storage."
    }
  ];

  const pricing = [
    {
      title: "Small",
      includes: "Handbag, Desk Lamp, Mirror, Ironing Board",
      summer: "$28",
      monthly: "$7"
    },
    {
      title: "Standard / Mega Box",
      includes: "Mega Box, Cube Fridge, Carry on, Microwave",
      summer: "$36",
      monthly: "$9"
    },
    {
      title: "Large",
      includes: "TV<40\", Guitar, Headboard, Duffel Bag",
      summer: "$44",
      monthly: "$11"
    },
    {
      title: "Extra Large",
      includes: "XL Fridge, TV<50\", Luggage, Bicycle, Gaming Desk Chair",
      summer: "$52",
      monthly: "$13"
    }
  ];

  return (
    <div className="bg-[#2e0249] text-white font-sans min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="flex items-center justify-between py-4 px-6 bg-[#2e0249] border-b border-white">
        <div className="flex space-x-8 text-white font-medium text-sm md:text-base">
          <a href="/" className="hover:underline">Home</a>
          <a href="/about" className="hover:underline">About us</a>
          <a href="/breakbus" className="hover:underline">Break Bus</a>
          <a href="/studentstorage" className="underline">Student Storage</a>
        </div>
        <img src="/images/insurespectre-logo.png" alt="InsureSpectre Logo" className="h-10 md:h-12" />
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Student Storage Services</h1>
        <p className="text-lg max-w-3xl mx-auto mb-8">
          Affordable, reliable storage for Penn State students. Reserve early and use code <strong>INSURE10</strong> for a
          priority pick up and drop off at checkout!
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-6">Packing Guidelines</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packingGuidelines.map((item, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-xl p-6 shadow-md min-h-[200px] transition-all"
            >
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-16 mb-6">Penn State Pricing</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricing.map((item, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-xl p-6 shadow-md min-h-[200px] transition-all"
            >
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p><strong>Includes:</strong> {item.includes}</p>
              <p><strong>Storage for the Summer:</strong> {item.summer}</p>
              <p><strong>Monthly Avg:</strong> {item.monthly}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="https://buy.stripe.com/fZe6pO4xKgkp1nGcMO"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-[#2e0249] font-bold text-lg rounded-full transition"
          >
            Reserve Storage Now
          </a>
        </div>
      </div>
    </div>
  );
}
