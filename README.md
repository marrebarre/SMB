Vår tekniska lösning av SMB(SebastianMartinBanken).

BACKEND
Vår backend bygger på Node.js express tillsammans med JavaScript.
Vi använder oss av vår "public" mapp som static folder där vi har alla sidor som alla ska kunna nå,
sedan har vi även en private mapp med filer som man endast ska kunna nå som verifierad USER/ADMIN.
Vi använder tilläggspaket som "body parser" för att enklare kunna jobba med JSON objekt och kunna
 printa det till konsolen.
Ett annat paket vi lagt till är "client-sessions" som låter oss skapa cookies på besökarens browser.

DATABASE
Vi har även lagt till MySQLi plugin som låter oss jobba med MySQL databas. Vår databas består av 
två tabeller, "user" och "account". User-tabellen innehåller kolumnerna id, username, password och
admin, där admin står för om kontot är 1(Admin) eller 0(User). Account-tabellen innehåller kolumner
som id, name, balance och user_id, där user_id är kopplingen till användare. Vår backend samarbetar 
med databasen genom att skicka queries som SELECT, UPDATE, INSERT eller REMOVE.

FRONTEND
Vår frontend är uppbyggt med vanlig HTML, CSS och JavaScript för de dynamiska delarna. Vi har designat
hemsidan dynamiskt med CSS med hjälp av "%" storlekar vilket gör att man kan minska, ljustera och 
förstora utan att hemsidan ska se konstig ut. För att kommunicera med backend så görs submit form 
requests i de statiska sammanhangen och ajax httpxrequests när det behöver vara dynamiskt eller när
man behöver behandla responsmeddelande som skickats från backend routen. I vår frontend så sker login-
validering som bestämmer om besökaren är user eller admin. Därefter visas rätt sida från "private"
mappen som användaren har rättighet till. Client sessionsen används för att navigera fritt på hemsidan
utan att behöva logga in flera gånger.

DEPLOYMENT
Martin har öppnat upp en lucka i sin router(port forwardat) där hemsidan kan ligga öppet för
andra besökare än dem på det lokala nätverket. Han har även en DNS domän med namnet 
"marre.chickenkiller.com". 
Hemsidan kommer endast ligga uppe när datorn är igång och node js startat servern.

Skapad av Martin Malmberg & Sebastian Mårtensson 

