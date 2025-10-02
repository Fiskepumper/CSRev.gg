import React from 'react';
import './FAQ.css';

const FAQ: React.FC = () => (
  <div className="faq-bg">
    <div className="faq-container">
      <h1 className="faq-title">📖 CSRev - Ofte stilte spørsmål (FAQ)</h1>
      <p className="faq-desc">
        Velkommen til vår FAQ! Her finner du svar på de vanligste spørsmålene om hvordan CSRev fungerer, betaling, sikkerhet, tvister og mer.
      </p>
      <hr />

      <h2 className="faq-section-title">🔐 Konto og pålogging</h2>
      <h3>Hvordan logger jeg inn på CSRev?</h3>
      <p>
        Du logger inn med din Steam-konto ved å klikke på <b>"Logg inn med Steam"</b>. Vi henter kun din SteamID og tilgang til ditt inventar (hvis det er offentlig eller du bruker vårt nettlesertillegg).
      </p>
      <h3>Er det trygt å logge inn med Steam?</h3>
      <p>
        Ja. Vi bruker Steam sin offisielle OAuth-pålogging. Vi kan ikke hente passord eller sensitive personopplysninger.
      </p>
      <h3>Må jeg gjøre inventaret mitt offentlig?</h3>
      <p>
        Ja, enten offentlig eller tilgjengelig via vårt nettlesertillegg. Dette er nødvendig for å vise dine skins og fullføre handler.
      </p>

      <hr />

      <h2 className="faq-section-title">💰 Kjøp og salg av skins</h2>
      <h3>Hvordan fungerer kjøp og salg på CSRev?</h3>
      <ol>
        <li><b>Selger</b> velger skin fra sitt Steam-inventar, setter pris og publiserer annonsen.</li>
        <li><b>Kjøper</b> betaler beløpet (pris + kjøpergebyr) direkte inne på CSRev.</li>
        <li>Når betaling er bekreftet, får selger tilgang til å sende trade via vårt Steam-integrerte system.</li>
        <li>Når kjøper har akseptert traden, frigjøres pengene til selger.</li>
      </ol>
      <h3>Hvorfor trenger jeg CSRev sitt nettlesertillegg?</h3>
      <ul>
        <li>Overvåker "Send Trade Offer" og "Accept Offer" i sanntid.</li>
        <li>Hindrer delvise handler og sikrer at betaling kun skjer når varen er overført.</li>
        <li>Bypasser 7-dagers hold med Steam Mobile Authenticator aktivert.</li>
      </ul>
      <h3>Kan jeg kansellere en handel?</h3>
      <p>
        Så lenge betalingen ikke er gjort, kan både kjøper og selger fjerne annonser. Etter betaling starter en bindende prosess som kun kan avbrytes via support.
      </p>

      <hr />

      <h2 className="faq-section-title">💳 Betaling og gebyrer</h2>
      <h3>Hvilke betalingsmetoder støtter CSRev?</h3>
      <p>
        Alle betalinger går via Revolut Business. Både kjøper og selger må ha Revolut for sømløse overføringer.
      </p>
      <h3>Hva koster det å handle på CSRev?</h3>
      <p>Vi opererer med et lojalitetsbasert gebyrsystem:</p>
      <table className="faq-table">
        <thead>
          <tr>
            <th>Nivå</th>
            <th>Kjøpergebyr</th>
            <th>Selgergebyr</th>
            <th>Totalt gebyr</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1-2</td><td>2.0 %</td><td>2.0 %</td><td>4.0 %</td></tr>
          <tr><td>3-4</td><td>1.8 %</td><td>1.8 %</td><td>3.6 %</td></tr>
          <tr><td>5-6</td><td>1.5 %</td><td>1.5 %</td><td>3.0 %</td></tr>
          <tr><td>7-8</td><td>1.0 %</td><td>1.0 %</td><td>2.0 %</td></tr>
          <tr><td>9-10</td><td>0.5 %</td><td>0.5 %</td><td>1.0 %</td></tr>
        </tbody>
      </table>
      <h3>Finnes det skjulte avgifter?</h3>
      <ul>
        <li>0 % uttaksgebyr.</li>
        <li>0 % valutapåslag.</li>
        <li>Ingen deposit-gebyrer.</li>
      </ul>

      <hr />

      <h2 className="faq-section-title">🔐 Sikkerhet og personvern</h2>
      <h3>Hvor trygt er det å handle på CSRev?</h3>
      <p>
        Veldig trygt. Hele prosessen er koblet til Steam og Revolut sine API-er. Midlene holdes i escrow (sperret konto) inntil varen er levert og bekreftet.
      </p>
      <h3>Hva slags data lagrer CSRev?</h3>
      <ul>
        <li>SteamID</li>
        <li>Trade-ID</li>
        <li>Revolut-betalingstatus</li>
        <li>Event-flagg (betalt, tilbud sendt, tilbud akseptert, utbetaling fullført)</li>
      </ul>
      <p>Vi lagrer aldri kortdata, passord eller KYC-dokumentasjon.</p>

      <hr />

      <h2 className="faq-section-title">⚠️ Tvister og uenigheter</h2>
      <h3>Hva skjer hvis det oppstår problemer med handelen?</h3>
      <p>
        Vi har et strukturert tvistesystem:
        <ul>
          <li>Etter 24 timer uten gjennomført varelevering sendes første påminnelse.</li>
          <li>Etter 72 timer sendes ny påminnelse.</li>
          <li>Etter 7 dager går saken til manuell behandling.</li>
        </ul>
      </p>
      <h3>Hva skjer hvis en part ikke leverer varen?</h3>
      <ul>
        <li>Fakturere motpart for full markedsverdi.</li>
        <li>Legge på renter (inntil 8 % p.a.).</li>
        <li>Sende kravet til inkasso via Forliksrådet eller Namsmannen.</li>
      </ul>

      <hr />

      <h2 className="faq-section-title">🏆 Lojalitetsprogram</h2>
      <h3>Hvordan oppnår jeg lavere gebyrer?</h3>
      <p>Ved økt samlet handelsvolum:</p>
      <table className="faq-table">
        <thead>
          <tr>
            <th>Nivå</th>
            <th>Omsetning (NOK)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>0 – 10 000</td></tr>
          <tr><td>2</td><td>10 001 – 25 000</td></tr>
          <tr><td>3</td><td>25 001 – 50 000</td></tr>
          <tr><td>4</td><td>50 001 – 100 000</td></tr>
          <tr><td>5</td><td>100 001 – 200 000</td></tr>
          <tr><td>6</td><td>200 001 – 350 000</td></tr>
          <tr><td>7</td><td>350 001 – 500 000</td></tr>
          <tr><td>8</td><td>500 001 – 750 000</td></tr>
          <tr><td>9</td><td>750 001 – 1 000 000</td></tr>
          <tr><td>10</td><td>Over 1 000 000</td></tr>
        </tbody>
      </table>
      <h3>Hva er fordelene med høyere nivå?</h3>
      <ul>
        <li>Reduserte gebyrer (ned til 0.5 % per side).</li>
        <li>Prioritert kundestøtte fra nivå 5 og opp.</li>
      </ul>

      <hr />
      <p className="faq-contact">
        Har du fortsatt spørsmål?<br />
        👉 Kontakt oss via support-systemet på CSRev.
      </p>
    </div>
  </div>
);

export default FAQ;