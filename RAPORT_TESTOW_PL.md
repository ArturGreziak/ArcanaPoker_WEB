# Raport testów — Arcana Poker Web

Wykonano:
1. Test składni JavaScript w Node.js.
2. 10 testów silnika: dziewięć kategorii pokerowych, niski as, punktujące karty, wartości figur, kolejność efektów, próby etapów, ostatnia ręka, wymiana kart, brak duplikatów, ograniczenia zakupów, wygrana, porażka i odrzucanie uszkodzonego zapisu.
3. Pełny przegląd 2 598 960 układów pięciokartowych. Liczby kategorii zgadzają się z kombinatoryką klasycznego pokera: wysoka karta 1 302 540; para 1 098 240; dwie pary 123 552; trójka 54 912; strit 10 200; kolor 5 108; full 3 744; kareta 624; poker 40.
4. Test w Chromium przez prawdziwe kliknięcia: nowa gra, wybór kart, zagranie, wymiana, przeładowanie i kontynuacja, zakup, ulepszenie, zmiana kolejności Arcana, następna runda, instrukcja, porażka i restart, ustawienia, uszkodzony zapis.
5. Widok 1280×900 oraz 360×800; brak poziomego przewijania dokumentu. Obejrzano zrzuty i poprawiono odstępy kart na telefonie.
6. Brak błędów JavaScript i błędów konsoli w wykonanej sesji.
7. Gra otwarta pod podścieżką `/ArcanaPoker_WEB/`; względne odwołania działają.

Nie wykonano: publikacji na koncie GitHub użytkownika, testów na fizycznych telefonach, we wszystkich przeglądarkach ani długoterminowych testów balansu z graczami. Testy nie stanowią obietnicy braku wszelkich błędów.

Powtarzalny test silnika: `node tests/engine.test.cjs`.
