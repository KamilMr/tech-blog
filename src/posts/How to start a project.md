---
title: 'How to work on project'
subtitle: 'Soecond part'
date: '2024-05-12'
---

Chciałbym przedstawić moje przemyślenia na temat tego, jak rozpocząć pracę nad projektem.

Przede wszystkim, jeśli będziecie potrzebować mojej pomocy to piszcie w wiadomości prywatnej lub jeśli toczy się dyskusja jakaś np na Slaku to oznaczcie mnie pod tą wiadomością i wtedy będę wiedział, że mam przeczytać ten wątek i się do niego odnieść.

## Ogólne zasady

**Master branch**  
Branch master powinien zawsze być sprawny i wolny od błędów.

**Mergowanie do mastera**  
Starajcie się, aby branch master był traktowany jako świętość, do której nie można swobodnie mergować zmian. Każdy pull request musi być zatwierdzony przynajmniej przez jedną osobę przed scaleniem. Można również ustawić na GitHubie, aby zabronić bezpośredniego pushowania na master. Master powinien być aktualizowany tylko przez pull requesty. Takie podejście od początku zaoszczędzi wam wiele błędów.

**Synchronizacja**  
Osoba, która pracuje nad zadaniem, powinna co jakiś czas aktualizować swoją branch z masterem.

**Baza danych – jedna dla wszystkich, czy jak?**  
Prawdopodobnie będziecie używać [MongoDB](https://www.mongodb.com/cloud/atlas/register). Z mojej perspektywy najlepiej, aby każdy kto pracuje nad backendem miał swoją własną bazę danych. To ułatwi wam życie. Serwer, który jest wdrożony, powinien mieć jedną, niezależną od środowiska testowego bazę danych. Jeśli zatem czterech deweloperów pracuje nad backendem, każdy powinien mieć swoje konto i swoją bazę danych. Jeśli ktoś z frontendu chce także lokalnie korzystać z backendu, również powinien mieć własną bazę.

**.env**  
Warto stworzyć plik `.env` do przechowywania wrażliwych danych konfiguracyjnych, takich jak hasła czy klucze API. Pomoże to zabezpieczyć wasze ważne informacje. Dodatkowo, utwórzcie plik `.env.example` z przykładowymi, ale nieprawdziwymi danymi, który będzie obecny na githubie, jakie zmienne środowiskowe są wymagane do uruchomienia projektu. Dotyczy to zarówno frontendu, jak i backendu.

**Dwa niezależne repo**
Z moich obserwacji wynika, że najlepiej trzymać repozytoria frontendu i backendu w osobnych miejscach, jako dwa niezależne projekty (chyba że ktoś jest wstanie szybko to ogarnąć). W ten sposób mogą się rozwijać niezależnie i nie będziecie sobie wzajemnie przeszkadzać. 

**Deploy od samego początku**
Od samego początku ktoś powinien zająć się wdrożeniem. Czasami zostawienie wdrożenia serwera na sam koniec może być problematyczne, tzn okazać się trudniejsze niż się wydawało. Dobrze, aby jedna osoba z zespołu frontendu i backendu zadbała o to, by master był wdrożony od początku. Wtedy, na przykład, backend developer pisze kod do funkcji rejestracji. Po lokalnym przetestowaniu i synchronizacji z masterem tworzy pull request. Kolega z zespołu sprawdza kod, testuje go i jeśli wszystko działa, akceptuje PR i scala zmiany z masterem. Następnie master jest automatycznie lub ręcznie aktualizowany na serwerze wdrożeniowym. Teraz na przykład na serwerze Heroku działa już funkcja rejestracji, co jest fantastyczne. Backend developer informuje zespół frontendu o nowych, działających funkcjonalnościach. 

Następnie deweloper frontendu robi zadanie podpięcia do backendu, upewnia się, że wszystko działa poprawnie i tworzy pull request. Po zaakceptowaniu zmian, są one scalane z masterem frontendu, a aplikacja frontendowa (wdrożona) również zyskuje tę funkcjonalność. Możecie wtedy od razu przetestować, czy wszystko działa prawidłowo na serwerze na żywo.

Takie podejście zaoszczędzi wam wielu problemów w przyszłości, a także zapewni, że w każdym momencie będziecie mieli działający projekt, który możecie zaprezentować.
