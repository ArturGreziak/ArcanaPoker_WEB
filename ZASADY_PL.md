# Arcana Poker — zasady i stan projektu

Oryginalna gra strategiczna inspirowana gatunkiem pokerowego roguelike. Nie jest kopią ani oficjalną wersją Balatro. Grafika, nazwa, opisy i reguły dodatkowych kart są własne. Gra nie zawiera zakładów ani zakupów za prawdziwe pieniądze.

## Pętla rozgrywki
- 8 etapów: cele 250, 600, 1200, 2000, 3400, 5500, 9000, 15000 pkt.
- Talia 52 kart bez jokerów. Ręka 8 kart. Każda runda: 4 zagrania, 3 wymiany.
- Wybór 1–5 kart. Ocena najlepszej kategorii w wybranych kartach. Strit/kolor wymagają pięciu kart.
- Żetony × mnożnik. Tylko karty należące do punktującego układu dodają wartość do żetonów. A=11, figury=10.
- 16 rodzajów Arcana. Maksymalnie 5 jednocześnie. Efekty działają kolejno w kolejności kolekcji. W sklepie można zmieniać tę kolejność.
- Sklep po wygranej; ulepszenia układów, odświeżanie ofert, sprzedaż kart.
- Nagroda: 5 monet + niewykorzystane ręce + odsetki (1 za każde 5 monet, do 5).
- Etap 3: −2 bazowego mnożnika, minimum 1. Etap 6: −20 bazowych żetonów, minimum 1.
- Menu, pauza, nowa gra, kontynuacja, ustawienia, instrukcja, wygrana, porażka, rekordy, potwierdzenie usunięcia danych.
- Efekty dźwiękowe i delikatna muzyka generowane matematycznie; bez cudzych nagrań.

## Parametry
Web: `engine.js` (TARGETS, BASE, ARCANA, startRound).
Android: `GameEngine.kt` (targets, base, arcana, startRound).
Zmieniaj te parametry osobno dla obu platform, zachowując zgodność zasad, jeżeli tego oczekujesz.

## Punkt powrotu
Etap zakończony: utworzone oddzielne implementacje Web/JavaScript oraz Android/Kotlin. W ZIP-ach znajduje się raport faktycznie przeprowadzonych testów. Następny etap u Ciebie: otwarcie projektu, test na własnym urządzeniu, dopiero potem przygotowanie publikacji.
