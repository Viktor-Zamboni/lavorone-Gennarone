# Esercitazione REST API
## Facendo riferimento al file "fifa23.json" allegato, progettare un'interfaccia REST API che risponda alle seguenti richieste
1. Elenco dei giocatori
2. Elenco giocatori di una data squadra (passata come parametro)
3. Elenco delle squadre
4. Elenco delle nazioni
5. Elenco delle posizioni
6. Scheda giocatore
7. I 10 migliori portieri
8. Età media dei migliori 15 giocatori di una data squadra
9. Valore medio dei migliori 15 giocatori di una data squadra
10. Elenco dei giocatori di un certo ruolo in ordine di valore crescente
11. I 10 giocatori più forti di una data nazione
12. La percentuale di attaccanti che usano di preferenza il piede sinistro
13. Aumentare l'età di tutti i giocatori di un anno
14. Eliminazione di tutti i giocatori di valore inferiore a 78
15. Inserimento di un nuovo giocatore
16. Prevedere una pagina iniziale ed una risposta di default
## Creare poi il server con Node.js ed Express.js



# WEBSERVICE
## esempio del prof: https://github.com/andreatrentini/5Bi
## Un webservice è un sistema per far interagire diversi sistemi architteture (per esempio: mac e windows). La codifica ascii è un sistema uguale per tutti i sistemi. 
## XML è un linguaggio di markup che permette di descrivere dati tramite stringhe, però occuperà più spazio e quindi si usa JSON che è più compatto.
## Un webservice restful è un webservice che usa http per trasmettere dati senza usare soap. Sono stateles, quindi non mantengono lo stato. Prevede una struttura di url che permette di accedere univocamente a una o più risorse. I dati che restituisce sono in formato JSON.
## I metodi del protocollo http sono:
- GET: per ottenere dati
- POST: per inviare dati
- PUT: per modificare dati
- DELETE: per eliminare dati
- PATCH: per modificare parzialmente dati
- TRACE: per ottenere informazioni sul percorso
- OPTIONS: per ottenere informazioni sulle opzioni del server
- HEAD: per ottenere informazioni sull'header
- CONNECT: per stabilire una connessione con il server
## Un webservice offre dati non all'utente finale, ma ad altri sistemi, al contrario il website offre dati all'utente finale.
## Un'applicazione che sfrutta webapp che chiede i dati ad un webservice che a sua volta li prende per esempio da un database viene definita multi-tier. Per gestire
## le webapp, i webservice e i database si possono usare i microservizi(docker o kubernetes).

## Il prossimo progetto dovrà seguire questi passaggi:
- progettare network
- progettare database
- progettare webservice
- progettare webapp
- nginx 

## approfondimenti: webservice, webservice restful, http, xml (da fare su un file md).

## webservice e webservice restful
### Un webservice è un servizio che offre a diverse applicazioni di comunicare tra loro attraverso una rete tramite protocolli (Ex:HTTP). I webservice sono fanno in modo da consentire l'interoperabilità tra sistemi diversi, indipendentemente dal linguaggio di programmazione utilizzato. Questo significa che un'applicazione scritta in un linguaggio di programmazione come Java può comunicare con un'applicazione scritta in un linguaggio diverso come Python.
### I webservice restful non sono un'architettura né uno standard, ma un insieme di linee guida per la realizzazione di una "architettura di sistema". Alcuni punti di queste linee guida sono:
- Utilizzo dei metodi HTTP: come per esempio GET, POST, PUT e DELETE, i quali servono per manipolare le risorse
- Stateless: ogni richiesta che un server riceve da un client contiene tutte le informazioni necessarie per comprendere ed elaborare la richiesta, senza che il server debba memorizzare alcuna informazione sullo stato della sessione tra le richieste successive.
- Utilizzo di URLs:  Ogni risorsa all'interno di un webservice RESTful è identificata da un URI univoco
- Rappresentazione dei dati: Le risorse sono rappresentate in un formato specifico (JSON), in modo da rendere facile alla lettura umana.

## HTTP
### HTTP è un protocollo di comunicazione utilizzato per il trasferimento di dati su una rete, comunemente utilizzato per il recupero di risorse, come pagine web. Esso dispone come abbiamo detto di diversi metodi (come per esempio: GET, POST, PUT e DELETE). Il protocollo http dispone di risposte che permettono di conoscere l'esito dell'operazione che si vuole fare(come per esempio: codice 200 indica che la richiesta è stata completata con successo). Esso è inoltre un protocollo stateless, quindi ogni richiesta del client é autonoma e non ci sono informazioni sullo stato tra le varie richieste. Infine le richieste e le risposte sono testuali e di facile compresione umana, il che facilità la comunicazione tra client e server.

## XML
### XML è un linguaggio di markup testuale utilizzato per rappresentare dati strutturati in un formato leggibile sia dagli esseri umani che dalle macchine. Esso usa un insieme di tag o elementi per definire la struttura dei dati. Gli elementi possono essere disposti in modo da ottenere una gerarchia per organizzare i dati in modo significativo, oltre a contere attributi, ossia coppie chiave-valore. Questo linguaggio è utilizzato in una vasta gamma di applicazioni, tra cui scambio di dati tra applicazioni, rappresentazione di documenti strutturati (come documenti HTML e configurazioni di file). È particolarmente popolare nell'ambito delle web API, dove viene spesso utilizzato per trasmettere dati in formato strutturato. Esso sta venendo sostituito da JSON, il quale è meno pesante del formato XML.

## Architettura multi-tier
### Queste architetture suddividono un'applicazione in più livelli o strati, ciascuno dei quali svolge specifiche funzioni e responsabilità. Ci sono diversi tipi di architettura multi-tier:
- Architettura a Due Livelli: Il client si occupa dell'interfaccia utente, mentre il server gestisce l'accesso ai dati e la logica
- Architettura a Tre Livelli: È composta da tre livelli: il livello di presentazione (client), il livello di logica(middle-tier), e il livello di dati (server).
- Architettura a N Livelli: Essa può includere più di tre livelli intermedi, in  base alle esigenze. Ogni livello ha una specifica responsabilità, come la gestione delle richieste HTTP, la logica di business, la sicurezza, l'accesso ai dati e così via.
- Architettura a Microservizi: suddivide un'applicazione complessa in servizi software autonomi e autosufficienti chiamati "microservizi". Ogni microservizio è responsabile di una singola funzionalità o servizio all'interno dell'applicazione e comunica con altri microservizi tramite API

![appunti](appunti_images/cisco.png)
## quando si parla di host si intende la macchina fisica.
## Per prima cosa abbiamo bisogno della lan privata docker
## mysql non usa il protocollo http per comunicare ma tcp.
## si crea la rete docker network create ws-db-net
## si crea il container mysql docker run -d --name db-server --network ws-db-net -e MYSQL_ROOT_PASSWORD=root -p 3350:3306 mysql:latest
## ci si collega a mysql workbench e si crea un'istanza (con porta 3350)
## creiamo un script per creare e inserire i dati in un database:
```
CREATE DATABASE gestione_ticket;
USE gestione_ticket;
CREATE TABLE Users(
    id int AUTO_INCREMENT, 
    nome VARCHAR(50),
    cognome VARCHAR(50),
    email VARCHAR(100),
    data_nascita DATE,
    username VARCHAR(20),
    --non è la password in chiaro, ma il suo codice hash
    password VARCHAR(200),
    PRIMARY KEY(id)
);
INSERT INTO Users
(nome, cognome, data_nascita, email, username)
VALUES ('Viktor', 'Zamboni', '2023-04-08', 'viktor.zamboni@marconirovereto.it', 'Piardi');
```

## abbiamo bisogno di avere un server per il webservice, quindi creiamo un container nodejs docker run --name cisco -p 3000:3000 -v C:\Lavoro-Temp\s\webservice-nodejs-mysql-Viktor-Zamboni\appunti_images\:/app -w /app --network ws-db-net -itd node:latest (ho usato questa cartella perche sulle altre non funzionava)
## un orm è un modello a oggetti che permette di mappare le tabelle del database in oggetti javascript
## npm init, npm install express, npm install mysql2, npm install -g nodemon, npm install cors, npm install bcrypt, npm install body-parser
## creiamo un file config.js:
```
const config = {
    dbParams: {
        host: 'db-server', //container name
        user: 'root',
        password: 'root',
        database: 'gestione_ticket' //il database che voglio utilizzare
    },
    serverPort: 3000,
    secret: 'cisco',
    saltRounds: 10,
    baseUrl: {
        users: '/users',
    }
};

module.exports = config;
```

## creiamo un file users.js in cui gestiamo le richieste:
```
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const config = require('./config.js');

const router = express.Router();

const parametriConnessione = config.dbParams;


router.get('', (req, res) => {
    let queryString = 'SELECT id, nome, cognome, email FROM Users';
    const connessione = mysql.createConnection(parametriConnessione);
    connessione.query(queryString, (err, dati) => {
        if (err) {
            console.log('Errore: ' + err);
            res.sendStatus(500);
            return;
        }
        res.json(dati);
    })
    connessione.end(); 
});


//il :id è un parametro che cambia che viene passato nell'url
router.get('/:id', (req, res) => {
    //qui prendo il parametro che mi è stato passato
    let id = req.params.id;
    if (id) {
        //id = ? è un parametro che viene passato alla query e viene sostituito con il valore di id
        let queryString = 'SELECT id, nome, cognome, email FROM Users WHERE id = ?';
        const connessione = mysql.createConnection(parametriConnessione);
        connessione.query(queryString, id, (err, dati) => {
            if (err) {
                console.log('Errore: ' + err);
                res.sendStatus(500);
                return;
            }
            res.json(dati);
        }
        )
        connessione.end(() => { });
    }
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    if (id) {
        let queryString = 'DELETE FROM Users WHERE id = ?';
        const connessione = mysql.createConnection(parametriConnessione);
        connessione.query(queryString, id, (err, dati) => {
            if (err) {
                console.log('Errore: ' + err);
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
        }
        )
        connessione.end(() => { })};
}
);

//per inviare dati al server senza l'id perchè è autoincrementale
router.post('', (req, res) => {
    let nome = req.body.nome;
    let cognome = req.body.cognome;
    let data_nascita = req.body.data_nascita;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let saltRounds = bcrypt.genSaltSync(10);
    let cryptPassword = bcrypt.hashSync(password, saltRounds);

    let queryString = 'INSERT INTO Users (nome, cognome, data_nascita, username, email, password) VALUES (?, ?, ?, ?, ?, ?)';
    const connessione = mysql.createConnection(parametriConnessione);
    connessione.query(queryString, [nome, cognome, data_nascita, username, email, cryptPassword], (err, dati) => {
        if (err) {
            console.log('Errore: ' + err);
            res.sendStatus(500);
            return;
        }
        res.json(dati);
    }
    )
    connessione.end(() => { });
}
);

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let nome = req.body.nome;
    let cognome = req.body.cognome;
    let data_nascita = req.body.data_nascita;
    let email = req.body.email;
    let password = req.body.password;
    let queryString = 'UPDATE Users SET nome = ?, cognome = ?, data_nascita = ?, username = ?, email = ?, password = ? WHERE id = ?';
    const connessione = mysql.createConnection(parametriConnessione);
    connessione.query(queryString, [nome, cognome, data_nascita, email, password, id], (err, dati) => {
        if (err) {
            console.log('Errore: ' + err);
            res.sendStatus(500);
            return;
        }
        res.json(dati);
    }
    )
    connessione.end(() => { });
}
);

module.exports = router;
```

## creiamo un file index.js nella cartella del server e scriviamo il codice:
```
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config.js');
const usersRouter = require('./users.js');
const fs = require('fs');

const app = express();
app.use(cors());


//dati in formato json o html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/init', (req, res) => {
    let secret = req.body.secret;
    if (secret === config.secret) {
        const scriptSQL = fs.readFileSync(__dirname + '/init.sql').toString();
        const connessione = mysql.createConnection(config.dbParams);
        connessione.query(scriptSQL, (err, dati) => {
            if (err) {
                console.log('Errore: ' + err);
                res.sendStatus(500);
                return;
            }
            connessione = mysql.createConnection(config.dbParams);
            let queryStr = 'INSERT INTO Users (username, password) VALUES (?, ?)';
            let password = bcrypt.hashSync('admin', config.saltRounds);
            let nuovoUtente = ['admin', password];
            connessione.query(queryStr, nuovoUtente, (err, dati) => {
                if (err) {
                    console.log('Errore: ' + err);
                    res.sendStatus(500);
                    return;
                }
                res.sendStatus(200);
            }
            )
        }
        )
        connessione.end(() => { });
    }
    else {
        res.sendStatus(401);
    }
}
);

app.use(config.baseUrl.users, usersRouter);


const server = app.listen(config.serverPort, () => {
    console.log('Server running on port 3000');
});
```

## Creaiamo un file test-rest.http nella cartella ws-server per vedere le risposte e scriviamo il codice:
```
GET http://localhost:3000/users
DELETE http://localhost:3000/users/1
POST http://localhost:3000/users HTTP/1.1
content-type: application/json

{
    "nome": "Viktor",
    "cognome": "Zamboni",
    "dataNascita": "2023-04-08",
    "username": "Piardi",
    "email": "cisco@cisco.it",
    "password": "cisco"
}
```

## per resettare il database creare un file init.sql:
```
DROP DATABASE IF EXISTS gestione_ticket;

CREATE DATABASE gestione_ticket;
USE gestione_ticket;
CREATE TABLE Users (
	id INT AUTO_INCREMENT,
    nome VARCHAR(50),
    cognome VARCHAR(50),
    email VARCHAR(100),
    data_nascita DATE,
    username VARCHAR(20),
    password VARCHAR(200),
    PRIMARY KEY(id)
);
```
