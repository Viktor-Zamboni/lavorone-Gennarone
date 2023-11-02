const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

const data = JSON.parse(fs.readFileSync('fifa23_.json', 'utf8'));

app.use(express.static('./public'));

//pagina iniziale
app.get('/', (req, res) => {
  res.sendFile('./public/index.html', { root: __dirname });
  res.end()
});

//pagina giocatori
app.get('/giocatori', (req, res) => {
  res.end(res.json(data));
});

//pagina giocatori per squadra
app.get('/giocatori-squadra', (req, res) => {
  const squadra = req.query.squadra;
  if (!squadra) {
    res.status(400).json({ error: 'Devi specificare una squadra come parametro.' });
    return;
  }
  console.log(data.squadra)
  const giocatoriSquadra = data.filter((giocatore) => giocatore.Club === squadra);
  res.end(res.json(giocatoriSquadra));
});

//pagine squadre
app.get('/squadre', (req, res) => {
  const squadre = [...new Set(data.map((giocatore) => giocatore.Club))];
  res.end(res.json(squadre));
});

//pagine nazioni
app.get('/nazioni', (req, res) => {
  const nazioni = [...new Set(data.map((giocatore) => giocatore.Nazionalita))];
  res.end(res.json(nazioni));
});

//pagine ruoli
app.get('/posizioni', (req, res) => {
  const posizioni = [...new Set(data.map((giocatore) => giocatore.Posizione))];
  res.end(res.json(posizioni));
});

//pagine giocatore per id
app.get('/giocatore/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const giocatore = data.find((giocatore) => giocatore.id === id);

  if (giocatore) {
    res.end(res.json(giocatore));
  } else {
    res.status(404).json({ error: 'Giocatore non trovato' });
  }
});

//pagina migliori portieri
app.get('/migliori-portieri', (req, res) => {
  const portieri = data.filter((giocatore) => giocatore.Posizione === 'GK');
  const miglioriPortieri = portieri.sort((a, b) => b.Valore - a.Valore).slice(0, 10);
  res.end(res.json(miglioriPortieri));
});

//pagina eta media per squadra
app.get('/eta-media-squadra', (req, res) => {
  const squadra = req.query.squadra;
  if (!squadra) {
    res.status(400).json({ error: 'Devi specificare una squadra come parametro.' });
    return;
  }

  const giocatoriSquadra = data.filter((giocatore) => giocatore.Club === squadra);
  const miglioriGiocatori = giocatoriSquadra.sort((a, b) => b.Valore - a.Valore).slice(0, 15);
  const etaMedia = miglioriGiocatori.reduce((sum, giocatore) => sum + giocatore.Eta, 0) / miglioriGiocatori.length;
  res.end(res.json({ etaMedia }));
});

//pagina valore medio per squadra
app.get('/valore-medio-squadra', (req, res) => {
  const squadra = req.query.squadra;
  if (!squadra) {
    res.status(400).json({ error: 'Devi specificare una squadra come parametro.' });
    return;
  }

  const giocatoriSquadra = data.filter((giocatore) => giocatore.Club === squadra);
  const miglioriGiocatori = giocatoriSquadra.sort((a, b) => b.Valore - a.Valore).slice(0, 15);
  const valoreMedio = miglioriGiocatori.reduce((sum, giocatore) => sum + giocatore.Valore, 0) / miglioriGiocatori.length;
  res.end(res.json({ valoreMedio }));
});

//pagina giocatori per ruolo
app.get('/giocatori-per-ruolo', (req, res) => {
  const ruolo = req.query.ruolo;
  if (!ruolo) {
    res.status(400).json({ error: 'Devi specificare un ruolo come parametro.' });
    return;
  }

  const giocatoriPerRuolo = data.filter((giocatore) => giocatore.Ruolo === ruolo);
  const giocatoriOrdinatiPerValoreCrescente = giocatoriPerRuolo.sort((a, b) => a.Valore - b.Valore);
  res.end(res.json(giocatoriOrdinatiPerValoreCrescente));
});

//pagina migliori giocatori per nazione
app.get('/top-10-giocatori-nazione', (req, res) => {
  const nazione = req.query.nazione;
  if (!nazione) {
    res.status(400).json({ error: 'Devi specificare una nazione come parametro.' });
    return;
  }

  const giocatoriNazione = data.filter((giocatore) => giocatore.Nazionalita === nazione);
  const miglioriGiocatoriNazione = giocatoriNazione.sort((a, b) => b.Valore - a.Valore).slice(0, 10);
  res.end(res.json(miglioriGiocatoriNazione));
});

//pagina percentuale attaccanti piede sinistro
app.get('/percentuale-attaccanti-piede-sinistro', (req, res) => {
  const attaccanti = data.filter((giocatore) => giocatore.Ruolo === 'A');
  const attaccantiPiedeSinistro = attaccanti.filter((giocatore) => giocatore.Piede === 'Left');
  const percentuale = (attaccantiPiedeSinistro.length / attaccanti.length) * 100;
  res.end(res.json({ percentuale: percentuale }));
});

//query per aumentare eta
app.put('/aumenta-eta', (req, res) => {
  const newData = data.map((giocatore) => ({
    ...giocatore,
    Eta: giocatore.Eta + 1,
  }));

  // Sovrascrive i dati originali con i nuovi dati
  fs.writeFileSync('fifa23_.json', JSON.stringify(newData, null, 2), 'utf8');

  res.json({ message: 'Età aumentata di un anno per tutti i giocatori' });
});

//query per eliminare giocatori con valore inferiore a 78
app.delete('/giocatori-valore-inferiore-a-78', (req, res) => {
  const valoreLimite = 78;
  const giocatoriSopraValoreLimite = data.filter((giocatore) => giocatore.Valore >= valoreLimite);

  // Sovrascrivere il JSON originale con i giocatori sopra il valore limite
  fs.writeFileSync('fifa23_.json', JSON.stringify(giocatoriSopraValoreLimite, null, 2), 'utf8');

  res.json({ message: 'Giocatori con valore superiore o uguale a 78 eliminati con successo' });
});

//query per inserire un nuovo giocatore
app.post('/inserisci-giocatore', (req, res) => {
  const nuovoGiocatore = req.body;

  // Verifica se tutti i campi obbligatori sono presenti nel nuovo giocatore
  if (!nuovoGiocatore.Nome || !nuovoGiocatore.Valore || !nuovoGiocatore.Posizione || !nuovoGiocatore.Nazionalita || !nuovoGiocatore.Eta || !nuovoGiocatore.Club || !nuovoGiocatore.Piede || !nuovoGiocatore.Ruolo) {
    res.status(400).json({ error: 'Devi fornire tutti i campi obbligatori per il nuovo giocatore' });
  } else {
    // Genera un nuovo ID per il giocatore (ad esempio, incrementa l'ID dell'ultimo giocatore)
    const nuovoID = data.reduce((maxID, giocatore) => Math.max(maxID, giocatore.id), 0) + 1;
    nuovoGiocatore.id = nuovoID;

    // Aggiungi il nuovo giocatore al JSON esistente
    data.push(nuovoGiocatore);

    // Sovrascrivi il file JSON con il nuovo giocatore incluso
    fs.writeFileSync('fifa23_.json', JSON.stringify(data, null, 2), 'utf8');

    res.json({ message: 'Nuovo giocatore inserito con successo' });
  }
});


app.listen(port, () => {
  console.log(`Server avviato sulla porta: ` + port);
});
