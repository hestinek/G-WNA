
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
      
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out" }
      );
    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []);

  const handleClose = () => {
    if (containerRef.current) {
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.4,
            onComplete: onClose
        });
    } else {
        onClose();
    }
  };

  return createPortal(
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-dark/95 backdrop-blur-sm overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/10 bg-dark z-10">
        <h2 className="text-white font-display text-lg md:text-xl tracking-widest">POLITYKA PRYWATNOŚCI</h2>
        <button 
          onClick={handleClose}
          className="group flex items-center gap-2 text-xs uppercase tracking-widest text-white hover:text-gray-300 transition-colors"
        >
          <span>Zamknij</span>
          <div className="relative w-8 h-8 flex items-center justify-center border border-white/20 rounded-full group-hover:border-white transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 1L11 11M1 11L11 1" />
            </svg>
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12">
        <div ref={contentRef} className="max-w-3xl mx-auto text-gray-300 font-body text-sm md:text-base leading-relaxed space-y-8 pb-20">
            
            <section>
                <h2 className="text-white font-display text-xl mb-6">1. Informacje ogólne</h2>
                <ol className="list-decimal pl-5 space-y-4">
                    <li>Niniejsza polityka dotyczy Serwisu www, funkcjonującego pod adresem url: <b>www.ChoinkiGizycko.pl</b></li>
                    <li>Operatorem serwisu oraz Administratorem danych osobowych jest: Plantacja Choinek Soldany</li>
                    <li>Adres kontaktowy poczty elektronicznej operatora: plantacjasoldany@gmail.com</li>
                    <li>Operator jest Administratorem Twoich danych osobowych w odniesieniu do danych podanych dobrowolnie w Serwisie.</li>
                    <li>
                        Serwis realizuje funkcje pozyskiwania informacji o użytkownikach i ich zachowaniu w następujący sposób:
                        <ol className="list-[lower-alpha] pl-5 mt-2 space-y-2 text-gray-400">
                            <li>Poprzez dobrowolnie wprowadzone w formularzach dane, które zostają wprowadzone do systemów Operatora.</li>
                            <li>Poprzez zapisywanie w urządzeniach końcowych plików cookie (tzw. „ciasteczka").</li>
                        </ol>
                    </li>
                </ol>
            </section>

            <section>
                <h2 className="text-white font-display text-xl mb-6">2. Wybrane metody ochrony danych stosowane przez Operatora</h2>
                <p>Miejsca logowania i wprowadzania danych osobowych są chronione w warstwie transmisji (certyfikat SSL). Dzięki temu dane osobowe i dane logowania, wprowadzone na stronie, zostają zaszyfrowane w komputerze użytkownika i mogą być odczytane jedynie na docelowym serwerze.</p>
            </section>

            <section>
                <h2 className="text-white font-display text-xl mb-6">3. Hosting</h2>
                <ol className="list-decimal pl-5 space-y-4">
                    <li>Serwis jest hostowany (technicznie utrzymywany) na serwerze operatora: SeoHost.pl</li>
                    <li>
                        Firma hostingowa w celu zapewnienia niezawodności technicznej prowadzi logi na poziomie serwera. Zapisowi mogą podlegać:
                        <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-400">
                            <li>zasoby określone identyfikatorem URL (adresy żądanych zasobów – stron, plików),</li>
                            <li>czas nadejścia zapytania,</li>
                            <li>czas wysłania odpowiedzi,</li>
                            <li>nazwę stacji klienta – identyfikacja realizowana przez protokół HTTP,</li>
                            <li>informacje o błędach jakie nastąpiły przy realizacji transakcji HTTP,</li>
                            <li>adres URL strony poprzednio odwiedzanej przez użytkownika (referer link) – w przypadku gdy przejście do Serwisu nastąpiło przez odnośnik,</li>
                            <li>informacje o przeglądarce użytkownika,</li>
                            <li>informacje o adresie IP,</li>
                            <li>informacje diagnostyczne związane z procesem samodzielnego zamawiania usług poprzez rejestratory na stronie,</li>
                            <li>informacje związane z obsługą poczty elektronicznej kierowanej do Operatora oraz wysyłanej przez Operatora.</li>
                        </ul>
                    </li>
                </ol>
            </section>

            <section>
                <h2 className="text-white font-display text-xl mb-6">4. Twoje prawa i dodatkowe informacje o sposobie wykorzystania danych</h2>
                <ol className="list-decimal pl-5 space-y-4">
                    <li>Twoje dane osobowe przetwarzane przez Administratora nie dłużej, niż jest to konieczne do wykonania związanych z nimi czynności określonych osobnymi przepisami (np. o prowadzeniu rachunkowości). W odniesieniu do danych marketingowych dane nie będą przetwarzane dłużej niż przez 3 lata.</li>
                    <li>
                        Przysługuje Ci prawo żądania od Administratora:
                        <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-400">
                            <li>dostępu do danych osobowych Ciebie dotyczących,</li>
                            <li>ich sprostowania,</li>
                            <li>usunięcia,</li>
                            <li>ograniczenia przetwarzania,</li>
                            <li>oraz przenoszenia danych.</li>
                        </ul>
                    </li>
                    <li>Przysługuje Ci prawo do złożenia sprzeciwu w zakresie przetwarzania wskazanego w pkt 3.3 c) wobec przetwarzania danych osobowych w celu wykonania prawnie uzasadnionych interesów realizowanych przez Administratora, w tym profilowania, przy czym prawo sprzeciwu nie będzie mogło być wykonane w przypadku istnienia ważnych prawnie uzasadnionych podstaw do przetwarzania, nadrzędnych wobec Ciebie interesów, praw i wolności, w szczególności ustalenia, dochodzenia lub obrony roszczeń.</li>
                    <li>Na działania Administratora przysługuje skarga do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.</li>
                    <li>Podanie danych osobowych jest dobrowolne, lecz niezbędne do obsługi Serwisu.</li>
                    <li>W stosunku do Ciebie mogą być podejmowane czynności polegające na zautomatyzowanym podejmowaniu decyzji, w tym profilowaniu w celu świadczenia usług w ramach zawartej umowy oraz w celu prowadzenia przez Administratora marketingu bezpośredniego.</li>
                    <li>Dane osobowe są przekazywane od krajów trzecich w rozumieniu przepisów o ochronie danych osobowych. Oznacza to, że przesyłamy je poza teren Unii Europejskiej.</li>
                </ol>
            </section>

            <section>
                <h2 className="text-white font-display text-xl mb-6">5. Informacje w formularzach</h2>
                <ol className="list-decimal pl-5 space-y-4">
                    <li>Serwis zbiera informacje podane dobrowolnie przez użytkownika, w tym dane osobowe, o ile zostaną one podane.</li>
                    <li>Serwis może zapisać informacje o parametrach połączenia (oznaczenie czasu, adres IP).</li>
                    <li>Serwis, w niektórych wypadkach, może zapisać informację ułatwiającą powiązanie danych w formularzu z adresem e-mail użytkownika wypełniającego formularz. W takim wypadku adres e-mail użytkownika pojawia się wewnątrz adresu url strony zawierającej formularz.</li>
                    <li>Dane podane w formularzu są przetwarzane w celu wynikającym z funkcji konkretnego formularza, np. w celu dokonania procesu obsługi zgłoszenia serwisowego lub kontaktu handlowego, rejestracji usług itp. Każdorazowo kontekst i opis formularza w czytelny sposób informuje, do czego on służy.</li>
                </ol>
            </section>

            <section>
                <h2 className="text-white font-display text-xl mb-6">6. Logi Administratora</h2>
                <p>Informacje zachowaniu użytkowników w serwisie mogą podlegać logowaniu. Dane te są wykorzystywane w celu administrowania serwisem.</p>
            </section>

            <section>
                <h2 className="text-white font-display text-xl mb-6">7. Istotne techniki marketingowe</h2>
                <p>Operator stosuje analizę statystyczną ruchu na stronie, poprzez Google Analytics (Google Inc. z siedzibą w USA). Operator nie przekazuje do operatora tej usługi danych osobowych, a jedynie zanonimizowane informacje. Usługa bazuje na wykorzystaniu ciasteczek w urządzeniu końcowym użytkownika. W zakresie informacji o preferencjach użytkownika gromadzonych przez sieć reklamową Google użytkownik może przeglądać i edytować informacje wynikające z plików cookies przy pomocy narzędzia: https://www.google.com/ads/preferences/</p>
            </section>

            <section>
                <h2 className="text-white font-display text-xl mb-6">8. Informacja o plikach cookies</h2>
                <ol className="list-decimal pl-5 space-y-4">
                    <li>Serwis korzysta z plików cookies.</li>
                    <li>Pliki cookies (tzw. „ciasteczka") stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu. Cookies zazwyczaj zawierają nazwę strony internetowej, z której pochodzą, czas przechowywania ich na urządzeniu końcowym oraz unikalny numer.</li>
                    <li>Podmiotem zamieszczającym na urządzeniu końcowym Użytkownika Serwisu pliki cookies oraz uzyskującym do nich dostęp jest operator Serwisu.</li>
                    <li>
                        Pliki cookies wykorzystywane są w następujących celach:
                        <ol className="list-[lower-alpha] pl-5 mt-2 space-y-2 text-gray-400">
                            <li>utrzymanie sesji użytkownika Serwisu (po zalogowaniu), dzięki której użytkownik nie musi na każdej podstronie Serwisu ponownie wpisywać loginu i hasła;</li>
                            <li>realizacji celów określonych powyżej w części "Istotne techniki marketingowe";</li>
                        </ol>
                    </li>
                    <li>W ramach Serwisu stosowane są dwa zasadnicze rodzaje plików cookies: „sesyjne" (session cookies) oraz „stałe" (persistent cookies). Cookies „sesyjne" są plikami tymczasowymi, które przechowywane są w urządzeniu końcowym Użytkownika do czasu wylogowania, opuszczenia strony internetowej lub wyłączenia oprogramowania (przeglądarki internetowej). „Stałe" pliki cookies przechowywane są w urządzeniu końcowym Użytkownika przez czas określony w parametrach plików cookies lub do czasu ich usunięcia przez Użytkownika.</li>
                    <li>Oprogramowanie do przeglądania stron internetowych (przeglądarka internetowa) zazwyczaj domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać zmiany ustawień w tym zakresie. Przeglądarka internetowa umożliwia usunięcie plików cookies. Możliwe jest także automatyczne blokowanie plików cookies Szczegółowe informacje na ten temat zawiera pomoc lub dokumentacja przeglądarki internetowej.</li>
                    <li>Ograniczenia stosowania plików cookies mogą wpłynąć na niektóre funkcjonalności dostępne na stronach internetowych Serwisu.</li>
                    <li>Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika Serwisu wykorzystywane mogą być również przez współpracujące z operatorem Serwisu podmioty, w szczególności dotyczy to firm: Google (Google Inc. z siedzibą w USA), Facebook (Facebook Inc. z siedzibą w USA), Twitter (Twitter Inc. z siedzibą w USA).</li>
                </ol>
            </section>

            <section>
                <h2 className="text-white font-display text-xl mb-6">9. Zarządzanie plikami cookies – jak w praktyce wyrażać i cofać zgodę?</h2>
                <ol className="list-decimal pl-5 space-y-4">
                    <li>Jeśli użytkownik nie chce otrzymywać plików cookies, może zmienić ustawienia przeglądarki. Zastrzegamy, że wyłączenie obsługi plików cookies niezbędnych dla procesów uwierzytelniania, bezpieczeństwa, utrzymania preferencji użytkownika może utrudnić, a w skrajnych przypadkach może uniemożliwić korzystanie ze stron www.</li>
                    <li>
                        W celu zarządzania ustawienia cookies wybierz z listy poniżej przeglądarkę internetową, której używasz i postępuj zgodnie z instrukcjami:
                        <ul className="list-disc pl-5 mt-2 space-y-2 text-blue-400">
                            <li><a href="https://support.microsoft.com/pl-pl/help/10607/microsoft-edge-view-delete-browser-history" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Edge</a></li>
                            <li><a href="https://support.microsoft.com/pl-pl/help/278835/how-to-delete-cookie-files-in-internet-explorer" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Internet Explorer</a></li>
                            <li><a href="http://support.google.com/chrome/bin/answer.py?hl=pl&amp;answer=95647" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Chrome</a></li>
                            <li><a href="http://support.apple.com/kb/PH5042" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Safari</a></li>
                            <li><a href="http://support.mozilla.org/pl/kb/W%C5%82%C4%85czanie%20i%20wy%C5%82%C4%85czanie%20obs%C5%82ugi%20ciasteczek" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Firefox</a></li>
                            <li><a href="http://help.opera.com/Windows/12.10/pl/cookies.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Opera</a></li>
                        </ul>
                        <p className="mt-4">Urządzenia mobilne:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-2 text-blue-400">
                            <li><a href="http://support.google.com/chrome/bin/answer.py?hl=pl&amp;answer=95647" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Android</a></li>
                            <li><a href="http://support.apple.com/kb/HT1677?viewlocale=pl_PL" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Safari (iOS)</a></li>
                            <li><a href="http://www.windowsphone.com/pl-pl/how-to/wp7/web/changing-privacy-and-other-browser-settings" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Windows Phone</a></li>
                        </ul>
                    </li>
                </ol>
            </section>
        </div>
      </div>
    </div>,
    document.body
  );
};
