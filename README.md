# Backend-Praktyki-2k22
Jest to pierwsza aplikacja z backendem i frontendem jaka realizowalem w calosci a także w drużynie (co prawda dwuosobowej ale...) do moich zadan głównie należała część backendowa: server łączność z api od pogody baza danych i oblsugiwanie requestów także zhostowanie obu części strony (niestety nie jest ona juz hostowana) dodatkowo zająłem się organizacją projektem wizualnym strony i grafikami sama realizacja części frontendowej nienależała do mnie ale brałem czynny udzial w jej tworzeniu 

# Jak uruchomić server?
Aby uruchomic server nalezy miec pobranego nodeJS i dodana sciezke do jego folderu w zmiennych srodowiskowych. Nastepnie trzeba przejsc do folderu projektu i wpisac pobrac potrzebne moduły komenda:
```
npm i
```
Teraz aby uruchomić server wystarczy jedna z dwóch niżej wymienionych komend
```
1: npm run start
2: node server.js
```
Teraz server dziala i mozna sie doniego dostac w kazdej przegladarce poprzez link:

> <http://localhost:8080>
>>jeżeli server nie odpalił się na porcie 8080 to czesc frontendowa nie bedzie dzialac poprawnie

Przez ograniczenia pogodowego api aby uzyskac swieże dane dotyczące pogody trzeba poczekać z właczonym serverem 2 min 

# End pointy

| Endpoint | Request | Respond |
|----------|---------|---------|
| /CurrentTemp|| zwraca dane pogodowe z warszawy|
| /CurrentTemp/:name| name = nazwa miasta| zwraca dane pogodowe z podanego miasta jezeli takie istnieje w bazie danych|
| /Cities|| zwraca liste miast z bazy danych|
| /Measurments/:nr| nr = ilosc pomiarow | zwraca dana ilosc najnowszych pomiarow z bazy danych |
| /AddCoords| kordynaty do bazy danych| dodaje do bazy danych nowe miasto do trackowania jego temperatury|