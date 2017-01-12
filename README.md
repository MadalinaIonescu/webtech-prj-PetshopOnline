# webtech-prj-PetshopOnline
The repo for my project. 
In acest proiect este implementat un magazin de animale online. 
Site-ul inca nu este foarte bine organizat deoarece am facut o parte din el doar folosind jquery, iar mai apoi l-am extins pentru a folosi si angular.
Pagina se deschide din postura de admin (Products), un acesta poate vizualiza toate produsele din baza de date si sterge unul ales (DELETE WHERE ID=, SELECT * ).
Pagina ”Orders” arata toate comenzile inregistrate in baza de Date
Pagina ”Client-View” schimba infatisarea siteului (dispar cele doua butoane de vizualizare a paginilor ”Products” și ”Orders”
si apar altele doua ”See the products” si ”Make an order”-varianta initiala a proiectului fara Angular)
In ”See the products” se pot realiza toate operatiile REST pe Tabela PRODUCTS din baza de date, incluzand INSERT, UPDATE, SELECT.. WHERE ID=
In ”Make an order” clientul poate face o comanda prin completarea unui formular si  adaugarea de produse in cos folosind interogari catre produsele din baza de date. 
La click pe  butonul ”Send the order” se inregistreaza o noua inregistrare in tabela ORDERS și una sau mai multe inregistrări in tabela TRANZACTIONS 
(in functie de cate produse s-au pus in cosul de cumparaturi)
Tabele din baza de date:
PRODUCTS(relatie 1:many cu TRANZACTIONS)
ORDERS(relatie 1:many cu TRANZACTIONS)
TRANZACTIONS

