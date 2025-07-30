import React from 'react';

const steps = [
  {
    title: '1. Nucleus Insertion',
    description:
      'Pearl farming begins with carefully inserting a nucleus into the mollusk under controlled conditions.',
  },
  {
    title: '2. Conditioning & Healing',
    description:
      'The mollusks are kept in clean water tanks where they heal and adapt to the implanted nucleus.',
  },
  {
    title: '3. Farming in Ponds',
    description:
      'The mollusks are transferred to freshwater ponds for 12–18 months, where pearls begin forming.',
  },
  {
    title: '4. Monitoring & Maintenance',
    description:
      'Regular monitoring ensures healthy growth conditions and maximizes pearl quality.',
  },
  {
    title: '5. Harvesting',
    description:
      'After the growth period, pearls are gently harvested, cleaned, and sorted based on size and luster.',
  },
  {
    title: '6. Quality Check & Packing',
    description:
      'Each pearl undergoes strict quality checks before being polished and packed for sale or export.',
  },
];

export default function Process() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Our Pearl Farming Process</h1>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              {step.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Sustainability Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Our Sustainability Practices
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          We follow eco-friendly farming techniques, ensuring the wellbeing of aquatic life and clean water systems.
          From using biodegradable farming materials to maintaining natural pond ecosystems, our commitment to sustainability is central to our mission.
        </p>
      </div>

      {/* Video Section */}
      <div className="mt-12 flex justify-center">
        <iframe
          className="w-full max-w-2xl aspect-video"
          src="https://www.youtube.com/embed/Vrnekyee0rw"
          title="Pearl Farming Process"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
