// app/components/VisionMissionValues.tsx
import React from 'react';
import { Target, Award, Heart } from 'lucide-react';

export default function VisionMissionValues() {
  const items = [
    {
      icon: Target,
      title: 'Vision',
      description:
        'Être un acteur de référence dans la transformation institutionnelle et le développement durable dans le monde.',
      color: 'blue',
    },
    {
      icon: Award,
      title: 'Mission',
      description:"Accompagner les organisations vers l'excellence opérationnelle et stratégique",
       
      color: 'red',
    },
    {
      icon: Heart,
      title: 'Valeurs',
      description: 'Excellence • Innovation • Intégrité • Impact Durable',
      color: 'purple',
    },
  ];

  const colorClasses: Record<
    string,
    { border: string; bg: string; text: string }
  > = {
    blue: {
      border: 'border-blue-600',
      bg: 'bg-blue-100',
      text: 'text-blue-600',
    },
    red: {
      border: 'border-red-600',
      bg: 'bg-red-100',
      text: 'text-red-600',
    },
    purple: {
      border: 'border-purple-600',
      bg: 'bg-purple-100',
      text: 'text-purple-600',
    },
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Notre ADN</h2>
          <div className="w-16 h-1 bg-gray-300 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            const color = colorClasses[item.color];

            return (
              <div
                key={i}
                className={`bg-gray-50 rounded-2xl p-10 shadow-lg border-t-4 ${color.border}`}
              >
                <div
                  className={`w-16 h-16 ${color.bg} rounded-full flex items-center justify-center mb-6`}
                >
                  <Icon className={`w-8 h-8 ${color.text}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
