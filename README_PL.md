# Arcana Poker — Web / GitHub Pages

## Uruchomienie na komputerze
1. Rozpakuj ZIP.
2. Otwórz `index.html` w Chrome, Edge lub Firefox. Gra nie potrzebuje npm ani instalacji bibliotek. W tym trybie zapis może zależeć od zasad przeglądarki dla plików lokalnych.
3. Najpewniejsze uruchomienie z lokalnym serwerem: w folderze zawierającym index.html uruchom `python -m http.server 8000`, potem otwórz `http://localhost:8000`.
4. Wybierz `Nowa wyprawa`. Przycisk `Układy` wyjaśnia zasady. Kliknij 1–5 kart i `Zagraj rękę` albo `Wymień`.

## GitHub Pages
1. Utwórz repozytorium na GitHub.
2. `Add file > Upload files` — wgraj zawartość folderu gry. `index.html` musi leżeć bezpośrednio w katalogu publikowanym, a nie dodatkowy poziom niżej.
3. Dołącz `engine.js`, `app.js`, `style.css` oraz `.nojekyll`. Nie wgrywaj projektu Androida do folderu Web.
4. `Settings > Pages > Build and deployment > Source > Deploy from a branch`.
5. Wybierz `main` i `/(root)`, następnie `Save`.
6. Po ukończeniu publikacji otwórz adres pokazany w Pages.
7. Wszystkie ścieżki są względne; gra obsługuje adres repozytorium, np. `/arcana-poker/`.

## Zapis i ustawienia
- Zapis gry jest automatyczny po ruchu oraz przy ukryciu strony. Rekordy i ustawienia są lokalne.
- `Pauza / Menu` zatrzymuje muzykę. `Kontynuuj` wraca do gry.
- `Ustawienia` pozwalają wyłączyć efekty, włączyć muzykę i usunąć dane z potwierdzeniem.
- Przeglądarka prywatna lub blokada localStorage może uniemożliwiać trwały zapis.
- Offline działa pobrana wersja lokalna. Strona z GitHub Pages wymaga sieci do pierwszego wczytania; pakiet nie jest PWA i nie obiecuje ponownego otwarcia adresu offline.

## Pliki
`engine.js`: punktowanie, talia, sklep, balans.
`app.js`: interfejs, audio, zapis.
`style.css`: wygląd, telefon, animacje.

Web nie zawiera AdMob. Integracja reklam Google AdMob jest wyłącznie w osobnym natywnym projekcie Android.

## Testy punktowania
Jeżeli masz Node.js: `node tests/engine.test.cjs`. Test zawiera pełny przegląd wszystkich 2 598 960 układów pięciu kart.
