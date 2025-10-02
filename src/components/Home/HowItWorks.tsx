import React from 'react';
import { LogIn, Search, CreditCard, Send, CheckCircle2, Unlock, AlertTriangle } from 'lucide-react';

const steps = [
  {
    title: 'Logg inn med Steam',
    description:
      'Klikk “Logg inn med Steam” på CSRev. Vi henter SteamID via OpenID og bekrefter at inventaret ditt er tilgjengelig.',
    icon: LogIn,
    color: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400',
  },
  {
    title: 'Finn eller legg ut skin',
    description:
      'Selger: Velg et skin fra inventaret, sett pris i NOK og mengde. Kjøper: Bla gjennom listings, velg skin og klikk “Kjøp nå”.',
    icon: Search,
    color: 'bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400',
  },
  {
    title: 'Betaling i siden',
    description:
      'Kjøper fyller inn betalingsdetaljer (integrert Revolut-API) direkte i CSRev. Beløpet reserveres på vår Revolut Business-konto til handelen er ferdig.',
    icon: CreditCard,
    color: 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400',
  },
  {
    title: 'Send Trade-Offer',
    description:
      'Når betaling er godkjent, får selger “Send trade-offer” i Steam. Vår extension fanger opp at traden er sendt og melder til server.',
    icon: Send,
    color: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
  },
  {
    title: 'Godkjenn Trade-Offer',
    description:
      'Kjøper får beskjed om å godkjenne traden i Steam. Når kjøper klikker “Accept”, fanges det opp av extension og sendes til server.',
    icon: CheckCircle2,
    color: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400',
  },
  {
    title: 'Frigjøring av midler',
    description:
      'Når både “offer sent” og “offer accepted” er bekreftet, utbetaler CSRev automatisk til selger (minus provisjon). Skinnet er nå overført uten trade-hold.',
    icon: Unlock,
    color: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400',
  },
  {
    title: 'Klar handling for tvister',
    description:
      'Hvis traden ikke fullføres innen fristen, kan kjøper eller selger klikke “Meld issue”. CSRev-support følger opp manuelt.',
    icon: AlertTriangle,
    color: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Slik fungerer CSRev – alt i én flyt
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Hele handelen skjer direkte på CSRev – fra innlogging til betaling, trade og utbetaling. Ingen eksterne omveier, alt er trygt og sporbart.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className={`${step.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <step.icon size={26} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;