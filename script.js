//-------------------------------------------------------------------
//TIPO DI GIOCO
//-------------------------------------------------------------------
var modalita = 0;  //modalità di gioco 1-singolo 2-doppio
var difficolta = 0; //difficoltà di gioco
const DIM_FACILE = 16;                 //dimensione del campo da gioco difficoltà 1
const DIM_MEDIA = 12;                  //dimensione del campo da gioco difficoltà 2
const DIM_DIFFICILE = 8;              //dimensione del campo da gioco difficoltà 3

var gioc;   //memorizzazione barche gioc
var gioc;   //memorizzazione barche g1
var g2;   //memorizzazione barche g2
var barche = [5,3,3,2,1,1]; //dimensioni barche

var x=0; //cella selezionata
var y=0; //cella selezionata
var gsel=1; //campo della cella selezionata
var nsel=1; //numero da selezionare (- se in vericale)

var campiMemorizzati=0; //campi memorizzati

var pg1; //pulsanti giocatore 1
var pg2; //pulsanti giocatore 2
var turno=0; 

var vittoria=false;
//-------------------------------------------------------------------
//INIZIO
//-------------------------------------------------------------------
function start() {
    selezioneModalita();
}

//-------------------------------------------------------------------
//SELEZIONE DELLA MODALITA
//-------------------------------------------------------------------
function selezioneModalita() {
  //collegamento al div pagina html
  var refDiv = document.getElementById("principale");

  //creazione elementi
  testoSelezione = document.createElement("h1");
  btnSingolo = document.createElement("button");
  btnDoppio = document.createElement("button");

  //associazione id e classi
  testoSelezione.id = "testoSelezione";
  btnSingolo.id = "btnSingolo";
  btnDoppio.id = "btnDoppio";
  testoSelezione.className = "testoSelezione";
  btnSingolo.className = "btnSelezione";
  btnDoppio.className = "btnSelezione";

  //impostazione comportamento tasti
  btnSingolo.onclick = function(){singolo();};
  btnDoppio.onclick = function(){doppio();};

  //inserimento testi
  testoSelezione.innerHTML = "Selezionare la difficoltà:";
  btnSingolo.innerHTML = "1 GIOCATORE";
  btnDoppio.innerHTML = "2 GIOCATORI";
  
  //aggiunta elementi a pagina html
  refDiv.appendChild(testoSelezione);
  refDiv.appendChild(btnSingolo);
  refDiv.appendChild(btnDoppio);
}

function singolo () {
  modalita=1;
  eliminaElementiSelezioneModalita();
  selezioneDifficolta();
}

function doppio () {
  modalita=2;
  eliminaElementiSelezioneModalita();
  selezioneDifficolta();
}

function eliminaElementiSelezioneModalita() {
  //rimozione elementi per la selezione
  testo = document.getElementById("testoSelezione");
  testo.parentNode.removeChild(testo);
  btnUno = document.getElementById("btnSingolo");
  btnUno.parentNode.removeChild(btnUno);
  btnDue = document.getElementById("btnDoppio");
  btnDue.parentNode.removeChild(btnDue);
}

//-------------------------------------------------------------------
//SELEZIONE DELLA DIFFICOLTA
//-------------------------------------------------------------------
function selezioneDifficolta(){
    //collegamento al div pagina html
    var refDiv = document.getElementById("principale");

    //creazione elementi
    testoSelezione = document.createElement("h1");
    btnFacile = document.createElement("button");
    btnMedia = document.createElement("button");
    btnDifficile = document.createElement("button");
  
    //associazione id e classi
    testoSelezione.id = "testoSelezione";
    btnFacile.id = "btnFacile";
    btnMedia.id = "btnMedia";
    btnDifficile.id = "btnDifficile";
    testoSelezione.className = "testoSelezione";
    btnFacile.className = "btnSelezione";
    btnMedia.className = "btnSelezione";
    btnDifficile.className = "btnSelezione";
  
    //impostazione comportamento tasti
    btnFacile.onclick = function(){facile();};
    btnMedia.onclick = function(){media();};
    btnDifficile.onclick = function(){difficile();};
  
    //inserimento testi
    testoSelezione.innerHTML = "Selezionare la difficoltà:";
    btnFacile.innerHTML = "FACILE";
    btnMedia.innerHTML = "MEDIA";
    btnDifficile.innerHTML = "DIFFICILE";
    
    //aggiunta elementi a pagina html
    refDiv.appendChild(testoSelezione);
    refDiv.appendChild(btnFacile);
    refDiv.appendChild(btnMedia);
    refDiv.appendChild(btnDifficile);
}

function facile () {
  difficolta=1;
  eliminaElementiSelezioneDifficolta();
  creaMatrici();
  posizionaBarche();
}

function media () {
  difficolta=2;
  eliminaElementiSelezioneDifficolta();
  creaMatrici();
  posizionaBarche();
}

function difficile () {
  difficolta=3;
  eliminaElementiSelezioneDifficolta();
  creaMatrici();
  posizionaBarche();
}

function eliminaElementiSelezioneDifficolta() {
  //rimozione elementi per la selezione
  testo = document.getElementById("testoSelezione");
  testo.parentNode.removeChild(testo);
  btnUno = document.getElementById("btnFacile");
  btnUno.parentNode.removeChild(btnUno);
  btnDue = document.getElementById("btnMedia");
  btnDue.parentNode.removeChild(btnDue);
  btnTre = document.getElementById("btnDifficile");
  btnTre.parentNode.removeChild(btnTre);
}

function creaMatrici(){
  //imposto dimensione campo
  dim = calcolaDifficolta();

  gioc = new Array(dim);
  g1 = new Array(dim);
  g2 = new Array(dim);
  pg1 = new Array(dim);
  pg2 = new Array(dim);
  for (let i = 0; i < dim; i++) {
    gioc[i]= new Array(dim);
    g1[i]= new Array(dim);
    g2[i]= new Array(dim);
    pg1[i]= new Array(dim);
    pg2[i]= new Array(dim);
  }
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
        gioc[i][j]= 0;
        g1[i][j]= 0;
        g2[i][j]= 0;
        pg1[i][j]= 0;
        pg2[i][j]= 0;
    }
  }
}

function calcolaDifficolta(){
  var dim = 0;
  switch(difficolta){
    case 1:
      dim = DIM_FACILE;
      break;
    case 2:
      dim = DIM_MEDIA;
      break;
    case 3:
      dim = DIM_DIFFICILE;
      break;
  }
  return dim;
}

//-------------------------------------------------------------------
//CREAZIONE CAMPO
//-------------------------------------------------------------------
function disegnaCampo(g){
  //collegamento al div pagina html
  var refDiv = document.getElementById("principale");

  //creo la tabella e le variabili per controllarla
  var tabella;
  var riga, cella, btn;

  //imposto dimensione campo
  dim = calcolaDifficolta();

  //creazione tabella
  tabella = document.createElement("table");
  tabella.id = "campo";
  tabella.className = "campo";
  tabella.align = "center";
  //creazione titolo
  titoloTabella = document.createElement("h3");
  titoloTabella.className = "titoloTabella";
  titoloTabella.id = "titoloTabella";
  titoloTabella.innerHTML = "Campo del giocatore " + g;
  //creo una nuova cella
  refDiv.appendChild(titoloTabella);
  for(i=0;i<dim;i++){
    //creo una nuova riga
    riga = document.createElement("tr");
    tabella.appendChild(riga);
    for(j=0;j<dim;j++){
      //creo una nuova cella
      cella = document.createElement("td");
      riga.appendChild(cella);
      //creo il bottone che farà da cella
      btn = document.createElement("button");
      //gli assegno l'id dinamicamente in modo che poi potrò riconoscerlo
      btn.id = "btn_" + 1 + "_" + i + "_" + j;
      //assegno la classe per la parte grafica
      btn.className = "casella";
      //assegno la funzione da svolgere al click
      btn.onclick = function(){cellaSelezionata(this.id);};
      //inserisco il bottone all'interno della cella
      cella.appendChild(btn);
    }
  }
  //inserisco la tabella
  refDiv.appendChild(tabella);
}

function disegnaCampi(){
  //collegamento al div pagina html
  var refDiv = document.getElementById("principale");

  //creo la tabella e le variabili per controllarla
  var tabella;
  var riga, cella, btn;

  //imposto dimensione campo
  dim = calcolaDifficolta();
  
  //ne creo 2 per i 2 giocatori
  for(g=1;g<=2;g++){
    //creazione tabella
    tabella = document.createElement("table");
    tabella.id = "campo_"+g;
    tabella.className = "campo";
    tabella.align = "center";
    //creazione titolo
    titoloTabella = document.createElement("h3");
    titoloTabella.id = "titolo_" + g;
    titoloTabella.className = "titoloTabella";
    titoloTabella.innerHTML = "Campo del giocatore " + g;
    //creo una nuova cella
    refDiv.appendChild(titoloTabella);
    for(i=0;i<dim;i++){
      //creo una nuova riga
      riga = document.createElement("tr");
      tabella.appendChild(riga);
      for(j=0;j<dim;j++){
        //creo una nuova cella
        cella = document.createElement("td");
        riga.appendChild(cella);
        //creo il bottone che farà da cella
        btn = document.createElement("button");
        //gli assegno l'id dinamicamente in modo che poi potrò riconoscerlo
        btn.id = "btn_" + g + "_" + i + "_" + j;
        //assegno la classe per la parte grafica
        btn.className = "casella";
        //assegno la funzione da svolgere al click
        btn.onclick = function(){cellaSelezionata(this.id);};
        //inserisco il bottone all'interno della cella
        cella.appendChild(btn);
      }
    }
    //inserisco la tabella
    refDiv.appendChild(tabella);
  }
}

//-------------------------------------------------------------------
//POSIZIONAMENTO BARCHE
//-------------------------------------------------------------------

function posizionaBarche(){
  selezioneJson(1);
}

var index=0;

function inserimentoBarche(g){
    disegnaCampo(g);
    inserisciBarca(barche[index]);
}

function inserimentoAuto(){
  inserisciAuto(barche[index]);
}

function inserisciBarca(dim){
  //collegamento al div pagina html
  var refDiv = document.getElementById("principale");
  immagineBarca(dim);
  nsel=dim; //anteprima
  resettaPuntatore();
  //bottone ruota
  btnRuota = document.createElement("button");
  btnRuota.id = "ruota";
  btnRuota.innerHTML = "RUOTA";
  btnRuota.className = "conferma";
  refDiv.appendChild(btnRuota);
  //bottone conferma
  btnConferma = document.createElement("button");
  btnConferma.id = "conferma";
  btnConferma.className = "conferma";
  btnConferma.innerHTML = "CONFERMA";
  refDiv.appendChild(btnConferma);
  btnConferma.onclick = function(){piazzaBarca();};
  btnRuota.onclick = function(){ruotaAnteprima();};
}

function inserisciAuto(dim){
  nsel=dim; //anteprima
  val= Math.floor(Math.random() * 2);
  resettaPuntatore();
  if (val==1){
    nsel=-nsel;
  }
  piazzaAuto();
}

function immagineBarca(dim){
  //collegamento al div pagina html
  var refDiv = document.getElementById("principale");
  //creazione immagine grafica
  tabella = document.createElement("table");
  tabella.id = "barca";
  tabella.align = "center";
  //creo una nuova riga
  riga = document.createElement("tr");
  tabella.appendChild(riga);
  //inserisco titolo
  cella = document.createElement("td");
  riga.appendChild(cella);
  barca = document.createElement("h3");
  barca.className = "titoloTabella";
  barca.innerHTML = "Barca: ";
  cella.appendChild(barca);
  for(i=0;i<dim;i++){
    //creo una nuova cella
    cella = document.createElement("td");
    riga.appendChild(cella);
    //creo il bottone che farà da cella
    btn = document.createElement("button");
    btn.disabled = true;
    //assegno la classe per la parte grafica
    btn.className = "casella";
    //inserisco il bottone all'interno della cella
    cella.appendChild(btn);
  }
  refDiv.appendChild(tabella);
}

function distruggiBarca(){
  barca = document.getElementById("barca");
  barca.parentNode.removeChild(barca);
  btn = document.getElementById("conferma");
  btn.parentNode.removeChild(btn);
  btn = document.getElementById("ruota");
  btn.parentNode.removeChild(btn);
}

function piazzaBarca(){
  distruggiBarca();
  //salva posizioni barca
  salvaBarca();
  calcolaMare();
  aggiornaCampo(1);
  index += 1;
  
  if(index<6){
    inserisciBarca(barche[index]);
  }else{
    if(campiMemorizzati==0){
      passaGiocatoreDue();
    }else{
      memorizzaGiocatoreDue();
    }
  }
}

function piazzaAuto(){
  dim= calcolaDifficolta();
  a=x;
  b=y;
  xp=x;
  yp=y;
  while(xp==x&&yp==y){
    a= Math.floor(Math.random() * dim);
    b= Math.floor(Math.random() * dim);
    btn = "btn_" + 1 + "_" + a + "_" + b;
    cellaSelezionata(btn);
  }
  salvaBarca();
  calcolaMare();
  index += 1;
  
  if(index<6){
    inserisciAuto(barche[index]);
  }else{
      memorizzaGiocatoreAuto();
  }
}

function salvaBarca(){
  gioc[x][y]=1;
  if(nsel!=1){
    barcaLunga();
  }
}

function barcaLunga(){
  if(nsel<0){
    barcaVerticale();
  }else{
    barcaOrizzontale();
  }
}

function barcaVerticale(){
  for(i=-1;i>nsel;i-=1){
      gioc[x-i][y]=1;
  }
}

function barcaOrizzontale(){
  for(i=1;i<nsel;i+=1){
      gioc[x][y+i]=1; 
  }
}

function aggiornaCampo(g){
  //imposto dimensione campo
  dim = calcolaDifficolta();

  for(i=0;i<dim;i++){
    for(j=0;j<dim;j++){
      if(g==1){
        if (gioc[i][j]==1){
          coloraBarca(1,i,j);
        }
        if (gioc[i][j]==-1){
          coloraMare(1,i,j);
        }
      }
    }
  }
}

function calcolaMare(){
  //imposto dimensione campo
  dim = calcolaDifficolta();

  for(i=0;i<dim;i++){
    for(j=0;j<dim;j++){
      if (gioc[i][j]==1){
        if(gioc[Math.max(i-1,0)][j]!=1){
          gioc[Math.max(i-1,0)][j]=-1;
        }
        if(gioc[Math.min(i+1,dim-1)][j]!=1){
          gioc[Math.min(i+1,dim-1)][j]=-1;
        }
        if(gioc[i][Math.max(j-1,0)]!=1){
          gioc[i][Math.max(j-1,0)]=-1;
        }
        if(gioc[i][Math.min(j+1,dim-1)]!=1){
          gioc[i][Math.min(j+1,dim-1)]=-1;
        }
        if(gioc[Math.min(i+1,dim-1)][Math.min(j+1,dim-1)]!=1){
          gioc[Math.min(i+1,dim-1)][Math.min(j+1,dim-1)]=-1;
        }
        if(gioc[Math.max(i-1,0)][Math.max(j-1,0)]!=1){
          gioc[Math.max(i-1,0)][Math.max(j-1,0)]=-1;
        }
        if(gioc[Math.max(i-1,0)][Math.min(j+1,dim-1)]!=1){
          gioc[Math.max(i-1,0)][Math.min(j+1,dim-1)]=-1;
        }
        if(gioc[Math.min(i+1,dim-1)][Math.max(j-1,0)]!=1){
          gioc[Math.min(i+1,dim-1)][Math.max(j-1,0)]=-1;
        }
      }
    }
  }
}

function coloraBarca(g,x,y){
  btn = document.getElementById("btn_" + g + "_" + x + "_" + y);
  btn.disabled = true;
  btn.className = "barca";
}

function coloraMare(g,x,y){
  btn = document.getElementById("btn_" + g + "_" + x + "_" + y);
  btn.disabled = true;
  btn.className = "mare";
}

function ruotaAnteprima(){
  var dim=calcolaDifficolta();
  if(nsel>0){
    if(nsel<=(dim-x)){
      for(i=0;i<nsel;i++){
        if(gioc[x+i][y]!=0){
          ok= false;
        }
      }
      if(ok==true){
        nsel=-nsel;
      }
    }
  }else if(nsel<0){
    if(((-nsel)<=(dim-y))){
      for(i=0;i<-nsel;i++){
        if(gioc[x][y+i]!=0){
          ok= false;
        }
      }
      if(ok==true){
        nsel=-nsel;
      }
    }
  }
}

function resettaPuntatore(){
  nsel=Math.abs(nsel);
  dim=calcolaDifficolta();
  stop=true;
  for(i=0;i<dim&&stop;i+=1){
    for(j=0;j<dim&&stop;j+=1){
      if(i<dim-nsel){
        ok=true;
        for(p=0;p<nsel&&ok;p++){
          if(gioc[j][Math.min((i+p),(dim-1))]!=0){
            ok= false;
          }
        }
        if(ok==true){
          x=j;
          y=i;
          stop=false;
        }
      }
    }
  }
}

function passaGiocatoreDue(){
  copiaValoriGiocatoreUno();
  cancellaGioc();
  index=0;
  campiMemorizzati=1;
  distruggiSelezioneBarca();
  salvareSuJson(1);  
}

function copiaValoriGiocatoreUno(){
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
        g1[i][j]= gioc[i][j];
    }
  }
}

function copiaValoriGiocatoreDue(){
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
        g2[i][j]= gioc[i][j];
    }
  }
}

function cancellaGioc(){
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
        gioc[i][j]= 0;
    }
  }
}

function distruggiSelezioneBarca(){
  campo = document.getElementById("campo");
  campo.parentNode.removeChild(campo);
  titolo = document.getElementById("titoloTabella");
  titolo.parentNode.removeChild(titolo);
}

function memorizzaGiocatoreDue(){
  copiaValoriGiocatoreDue();
  distruggiSelezioneBarca();
  cancellaGioc();
  campiMemorizzati++;
  salvareSuJson(2);
}

function memorizzaGiocatoreAuto(){
  copiaValoriGiocatoreDue();
  cancellaGioc();
  inizioGioco();
}

//-------------------------------------------------------------------
//SELEZIONE CELLA
//-------------------------------------------------------------------

function PrendiCoordinate(btn){
  //btn_1_1_4 -> g:1 | x: 1 | y: 4
  var vect = btn.split("_");
  return vect; //0:g 1:x 2: y
}

function cellaSelezionata(btnId){
  vect = PrendiCoordinate(btnId);
  dim=calcolaDifficolta();
  ok=true; //controllo se può starci la barca
  if(gioc[parseInt(vect[2])][parseInt(vect[3])]!=1&&gioc[parseInt(vect[2])][parseInt(vect[3])]!=-1){
    if(nsel!=1){
      if(nsel>0){
        if(!(parseInt(vect[3])>dim-nsel)){
          for(i=0;i<nsel;i++){
            if(gioc[vect[2]][(parseInt(vect[3])+i)]!=0){
              ok= false;
            }
          }
          if(ok==true){
            gsel = vect[1];
            x = parseInt(vect[2]);
            y = parseInt(vect[3]);
          }
        }
      }
      if(nsel<0){
        if(!(parseInt(vect[2])>dim+nsel)){
          for(i=0;i<-nsel;i++){
            if(gioc[(parseInt(vect[2])+i)][vect[3]]!=0){
              ok= false;
            }
          }
          if(ok==true){
            gsel = vect[1];
            x = parseInt(vect[2]);
            y = parseInt(vect[3]);
          }
        }
      }
    }else{
      gsel = vect[1];
      x = parseInt(vect[2]);
      y = parseInt(vect[3]);
    }
  }
}

setInterval(function(){
  evidenziaCella();}, 1000);

function evidenziaCella(){
  ripristinaCelle();
  setTimeout(lampeggia, 300);
}

function lampeggia(){
  btn = document.getElementById("btn_"+gsel+"_"+x+"_"+y);
  btn.className = "selezionata";
  if (nsel!=1){
    lampeggiaserie();
  }
}

function lampeggiaserie(){
  if(nsel<0){
    lampeggiaVericale();
  }else{
    lampeggiaOrizzontale();
  }
}

function lampeggiaVericale(){
  for(i=-1;i>nsel;i-=1){
    btn = document.getElementById("btn_"+gsel+"_"+(x-i)+"_"+y);
    btn.className = "selezionata";
  }
}

function lampeggiaOrizzontale(){
  for(i=1;i<nsel;i+=1){
    btn = document.getElementById("btn_"+gsel+"_"+x+"_"+(y+i));
    btn.className = "selezionata";
  }
}

function ripristinaCelle(){
  dim=calcolaDifficolta();
  for(i=0;i<dim;i+=1){
    for(j=0;j<dim;j+=1){
      btn = document.getElementById("btn_"+gsel+"_"+i+"_"+j);
      if(btn.className=="selezionata"){
        btn.className = "casella";
      }
    }
  }
}

//-------------------------------------------------------------------
//GIOCO
//-------------------------------------------------------------------

function inizioGioco(){
  disegnaCampi();
  nsel=1;
  gsel=1;
  bloccaTabella(1);
  //collegamento al div pagina html
  var refDiv = document.getElementById("principale");
  //bottone conferma
  btnConferma = document.createElement("button");
  btnConferma.id = "conferma";
  btnConferma.className = "conferma";
  btnConferma.innerHTML = "CONFERMA";
  refDiv.appendChild(btnConferma);
  spostaPuntatore(pg2);
  btnConferma.onclick = function(){tentativo();};
}

function bloccaTabella(g){
  dim=calcolaDifficolta();
  for(i=0;i<dim;i+=1){
    for(j=0;j<dim;j+=1){
      btn = document.getElementById("btn_"+g+"_"+i+"_"+j);
      btn.disabled = true;
    }
  }
}

function sbloccaTabella(c,g){
  dim=calcolaDifficolta();
  for(i=0;i<dim;i+=1){
    for(j=0;j<dim;j+=1){
      if(c[i][j]==0){
        btn = document.getElementById("btn_"+g+"_"+i+"_"+j);
        btn.disabled = false;
      }
    }
  }
}

function tentativo(){
  if(turno%2==0){
    bombardaBersaglio(g2,pg2);
    coloraCampo(pg2,2);
    spostaPuntatore(pg1);
    bloccaTabella(2);
    sbloccaTabella(pg1,1);
  }else{
    bombardaBersaglio(g1,pg1);
    coloraCampo(pg1,1);
    spostaPuntatore(pg2);
    bloccaTabella(1);
    sbloccaTabella(pg2,2);
  }
  if(modalita==1&&!vittoria){
    mossaAuto();
  }
  controllaVittoria(g1,pg1,2);
  turno++;
  if(!vittoria){
    controllaVittoria(g2,pg2,1);
  }
}

function mossaAuto(){
  selezionaBersaglio(pg1);
  bombardaBersaglio(g1,pg1);
  coloraCampo(pg1,1);
  spostaPuntatore(pg2);
  bloccaTabella(1);
  sbloccaTabella(pg2,2);
  turno++;
}

function selezionaBersaglio(c){
  dim=calcolaDifficolta();
  var ok=true;
  for(i=0;i<dim&&ok;i+=1){
    for(j=0;j<dim&&ok;j+=1){
      if(c[i][j]==1){
        ok= piazzo(c,i,j);
      }
    }
  }
  if(ok){
    a=x;
    b=y;
    xp=x;
    yp=y;
    while(xp==x&&yp==y){
      a= Math.floor(Math.random() * dim);
      b= Math.floor(Math.random() * dim);
      if(c[a][b]==0){
        x=a;
        y=b;
      }
    }
  }
}

function piazzo(c,i,j){
  if((i>0)&&(c[i-1][j]==0)){
    x=i-1;
    y=j;
    return false;
  }
  if((i<(dim-1))&&(c[i+1][j]==0)){
    x=i+1;
    y=j;
    return false;
  }
  if((j>0)&&(c[i][j-1]==0)){
    x=i;
    y=j-1;
    return false;
  }
  if((j<(dim-1))&&(c[i][j+1]==0)){
    x=i;
    y=j+1;
    return false;
  }
  return true;
}

function spostaPuntatore(c){
  dim=calcolaDifficolta();
  stop=true;
  for(i=0;i<dim&&stop;i+=1){
    for(j=0;j<dim&&stop;j+=1){
      if(c[j][i]==0){
        x=j;
        y=i;
        if(gsel==1){
          gsel=2;
        }else{
          gsel=1;
        }
        stop=false;
      }
    } 
  }
}

function bombardaBersaglio(s,c){
  c[x][y]=s[x][y];
  if(s[x][y]==0){
    c[x][y]=-1;
  }
  if(c[x][y]==1){
    controlloBarche(s,c,x,y);
  }
}

function controllaVittoria(s,c,g){
  //imposto dimensione campo
  dim = calcolaDifficolta();
  ok=true;
  for(i=0;i<dim;i++){
    for(j=0;j<dim;j++){
      if (s[i][j]==1){
        if(c[i][j]!=s[i][j]){
          ok=false;
        }
      }
    }
  }
  vittoria=ok;
  if(vittoria==true){
    distruggiGioco();
    //collegamento al div pagina html
    var refDiv = document.getElementById("principale");
    titoloTabella = document.createElement("h3");
    titoloTabella.className = "titoloTabella";
    titoloTabella.innerHTML = "ha vinto il giocatore "+g+"\nricarica la pagina o clicca ctrl+r per rigiocare";
    refDiv.appendChild(titoloTabella);
    risultati();
  }
}

function distruggiGioco(){
  e=document.getElementById("campo_1");
  e.parentNode.removeChild(e);
  e=document.getElementById("campo_2");
  e.parentNode.removeChild(e);
  e=document.getElementById("titolo_1");
  e.parentNode.removeChild(e);
  e=document.getElementById("titolo_2");
  e.parentNode.removeChild(e);
  e=document.getElementById("conferma");
  e.parentNode.removeChild(e);
}

function coloraCampo(c,ng){
  //imposto dimensione campo
  dim = calcolaDifficolta();

  for(i=0;i<dim;i++){
    for(j=0;j<dim;j++){
      if (c[i][j]==1){
        coloraBarca(ng,i,j);
      }
      if (c[i][j]==-1){
        coloraMare(ng,i,j);
      }
    }
  }
}

function controlloBarche(s,c,i,j){
  if(i!=(dim-1)){
    if(j!=0){
      c[i+1][j-1]=-1;
    }
    if(j!=(dim-1)){
      c[i+1][j+1]=-1;
    }
  }
  if(i!=0){
    if(j!=0){
      c[i-1][j-1]=-1;
    }
    if(j!=(dim-1)){
      c[i-1][j+1]=-1;
    }
  }
  if((((j!=0)&&(s[i][Math.max(0,j-1)]!=1))&&((j!=(dim-1))&&(s[i][Math.min(dim-1,j+1)]!=1)))||((j==0)&&((j!=(dim-1))&&(s[i][Math.min(dim-1,j+1)]!=1)))||(((j!=0)&&(s[i][Math.max(0,j-1)]!=1))&&(j==(dim-1)))){
    if((((i!=0)&&(s[Math.max(0,i-1)][j]!=1))&&((i!=(dim-1))&&(s[Math.min(dim-1,i+1)][j]!=1)))||((i==0)&&(s[i][Math.min(dim-1,j+1)]!=1))||((s[i][Math.max(0,j-1)]!=1)&&(j==(dim-1)))){
      if(s[Math.max(0,i-1)][j]!=1){
        c[Math.max(0,i-1)][j]=-1;
      }
      if(s[Math.min((dim-1),i+1)][j]!=1){
        c[Math.min((dim-1),i+1)][j]=-1;
      }
      if(s[i][Math.max(0,j-1)]!=1){
        c[i][Math.max(0,j-1)]=-1;
      }
      if(s[i][Math.min((dim-1),j+1)]!=1){
        c[i][Math.min((dim-1),j+1)]=-1;
      }
    }
  }
  controlloMare(s,c,i,j);
}

function controlloMare(s,c,i,j){
  dim = calcolaDifficolta();
  //acqua
  if((((j!=0)&&(s[i][Math.max(0,j-1)]!=1))&&((j!=(dim-1))&&(s[i][Math.min(dim-1,j+1)]!=1)))||((j==0)&&((j!=(dim-1))&&(s[i][Math.min(dim-1,j+1)]!=1)))||(((j!=0)&&(s[i][Math.max(0,j-1)]!=1))&&(j==(dim-1)))){
    if(s[Math.max(0,i-1)][j]==1&&s[Math.max(0,i-1)][j]==c[Math.max(0,i-1)][j]){
      if(s[Math.max(0,i-2)][j]==1&&s[Math.max(0,i-2)][j]==c[Math.max(0,i-2)][j]){
        if(s[Math.max(0,i-3)][j]==1&&s[Math.max(0,i-3)][j]==c[Math.max(0,i-3)][j]){
          if(s[Math.max(0,i-4)][j]==1&&s[Math.max(0,i-4)][j]==c[Math.max(0,i-4)][j]){
            if(s[Math.max(0,i-5)][j]!=1){
              c[Math.max(0,i-5)][j]=-1;
            }
            if(s[Math.min((dim-1),i+1)][j]!=1){
              c[Math.min((dim-1),i+1)][j]=-1;
            }
          }else if(s[Math.min((dim-1),i+1)][j]==1&&s[Math.min((dim-1),i+1)][j]==c[Math.min((dim-1),i+1)][j]){
            if(s[Math.max(0,i-4)][j]!=1){
              c[Math.max(0,i-4)][j]=-1;
            }
            if(s[Math.min((dim-1),i+2)][j]!=1){
              c[Math.min((dim-1),i+2)][j]=-1;
            }
          }
        }else if(s[Math.min((dim-1),i+1)][j]==1&&s[Math.min((dim-1),i+1)][j]==c[Math.min((dim-1),i+1)][j]){
          if(s[Math.min((dim-1),i+2)][j]==1&&s[Math.min((dim-1),i+2)][j]==c[Math.min((dim-1),i+2)][j]){
            if(s[Math.max(0,i-3)][j]!=1){
              c[Math.max(0,i-3)][j]=-1;
            }
            if(s[Math.min((dim-1),i+3)][j]!=1){
              c[Math.min((dim-1),i+3)][j]=-1;
            }
          }
        }else{
          if(s[Math.max(0,i-4)][j]!=1){
            c[Math.max(0,i-4)][j]=-1;
          }
          if(s[Math.min((dim-1),i+1)][j]!=1){
            c[Math.min((dim-1),i+1)][j]=-1;
          }
        }
      }else if(s[Math.min((dim-1),i+1)][j]==1&&s[Math.min((dim-1),i+1)][j]==c[Math.min((dim-1),i+1)][j]){
        if(s[Math.min((dim-1),i+2)][j]==1&&s[Math.min((dim-1),i+2)][j]==c[Math.min((dim-1),i+2)][j]){
          if(s[Math.min((dim-1),i+3)][j]==1&&s[Math.min((dim-1),i+3)][j]==c[Math.min((dim-1),i+3)][j]){
            if(s[Math.max(0,i-2)][j]!=1){
              c[Math.max(0,i-2)][j]=-1;
            }
            if(s[Math.min((dim-1),i+4)][j]!=1){
              c[Math.min((dim-1),i+4)][j]=-1;
            }
          }
        }else{
          if(s[Math.max(0,i-2)][j]!=1){
            c[Math.max(0,i-2)][j]=-1;
          }
          if(s[Math.min((dim-1),i+2)][j]!=1){
            c[Math.min((dim-1),i+2)][j]=-1;
          }
        }
      }else{
        if(s[Math.max(0,i-2)][j]!=1){
          c[Math.max(0,i-2)][j]=-1;
        }
        if(s[Math.min((dim-1),i+1)][j]!=1){
          c[Math.min((dim-1),i+1)][j]=-1;
        }
      }
    }else if(s[Math.min((dim-1),i+1)][j]==1&&s[Math.min((dim-1),i+1)][j]==c[Math.min((dim-1),i+1)][j]){
      if(s[Math.min((dim-1),i+2)][j]==1&&s[Math.min((dim-1),i+2)][j]==c[Math.min((dim-1),i+2)][j]){
        if(s[Math.min((dim-1),i+3)][j]==1&&s[Math.min((dim-1),i+3)][j]==c[Math.min((dim-1),i+3)][j]){
          if(s[Math.min((dim-1),i+4)][j]==1&&s[Math.min((dim-1),i+4)][j]==c[Math.min((dim-1),i+4)][j]){
            if(s[Math.max(0,i-1)][j]!=1){
              c[Math.max(0,i-1)][j]=-1;
            }
            if(s[Math.min((dim-1),i+5)][j]!=1){
              c[Math.min((dim-1),i+5)][j]=-1;
            }
          }
        }else{
          if(s[Math.max(0,i-1)][j]!=1){
            c[Math.max(0,i-1)][j]=-1;
          }
          if(s[Math.min((dim-1),i+3)][j]!=1){
            c[Math.min((dim-1),i+3)][j]=-1;
          }
        }
      }else{
        if(s[Math.max(0,i-1)][j]!=1){
          c[Math.max(0,i-1)][j]=-1;
        }
        if(s[Math.min((dim-1),i+2)][j]!=1){
          c[Math.min((dim-1),i+2)][j]=-1;
        }
      }
    }else{
      if(s[Math.max(0,i-1)][j]!=1){
        c[Math.max(0,i-1)][j]=-1;
      }
      if(s[Math.min((dim-1),i+1)][j]!=1){
        c[Math.min((dim-1),i+1)][j]=-1;
      }
    }
  }else if(s[i][Math.max(0,j-1)]==1&&s[i][Math.max(0,j-1)]==c[i][Math.max(0,j-1)]){
    if(s[i][Math.max(0,j-2)]==1&&s[i][Math.max(0,j-2)]==c[i][Math.max(0,j-2)]){
      if(s[i][Math.max(0,j-3)]==1&&s[i][Math.max(0,j-3)]==c[i][Math.max(0,j-3)]){
        if(s[i][Math.max(0,j-4)]==1&&s[i][Math.max(0,j-4)]==c[i][Math.max(0,j-4)]){
          if(s[i][Math.max(0,j-5)]!=1){
            c[i][Math.max(0,j-5)]=-1;
          }
          if(s[i][Math.min((dim-1),j+1)]!=1){
            c[i][Math.min((dim-1),j+1)]=-1;
          }
        }else if(s[i][Math.min((dim-1),j+1)]==1&&s[i][Math.min((dim-1),j+1)]==c[i][Math.min((dim-1),j+1)]){
          if(s[i][Math.max(0,j-4)]!=1){
            c[i][Math.max(0,j-4)]=-1;
          }
          if(s[i][Math.min((dim-1),j+2)]!=1){
            c[i][Math.min((dim-1),j+2)]=-1;
          }
        }
      }else if(s[i][Math.min((dim-1),j+1)]==1&&s[i][Math.min((dim-1),j+1)]==c[i][Math.min((dim-1),j+1)]){
        if(s[i][Math.min((dim-1),j+2)]==1&&s[i][Math.min((dim-1),j+2)]==c[i][Math.min((dim-1),j+2)]){
          if(s[i][Math.max(0,j-3)]!=1){
            c[i][Math.max(0,j-3)]=-1;
          }
          if(s[i][Math.min((dim-1),j+3)]!=1){
            c[i][Math.min((dim-1),j+3)]=-1;
          }
        }
      }else{
        if(s[i][Math.max(0,j-2)]!=1){
          c[i][Math.max(0,j-2)]=-1;
        }
        if(s[i][Math.min((dim-1),j+1)]!=1){
          c[i][Math.min((dim-1),j+1)]=-1;
        }
      }
    }else if(s[i][Math.min((dim-1),j+1)]==1&&s[i][Math.min((dim-1),j+1)]==c[i][Math.min((dim-1),j+1)]){
      if(s[i][Math.min((dim-1),j+2)]==1&&s[i][Math.min((dim-1),j+2)]==c[i][Math.min((dim-1),j+2)]){
        if(s[i][Math.min((dim-1),j+3)]==1&&s[i][Math.min((dim-1),j+3)]==c[i][Math.min((dim-1),j+3)]){
          if(s[i][Math.max(0,j-2)]!=1){
            c[i][Math.max(0,j-2)]=-1;
          }
          if(s[i][Math.min((dim-1),j+4)]!=1){
            c[i][Math.min((dim-1),j+4)]=-1;
          }
        }
      }else{
        if(s[i][Math.max(0,j-2)]!=1){
          c[i][Math.max(0,j-2)]=-1;
        }
        if(s[i][Math.min((dim-1),j+2)]!=1){
          c[i][Math.min((dim-1),j+2)]=-1;
        }
      }
    }else{
      if(s[i][Math.max(0,j-2)]!=1){
        c[i][Math.max(0,j-2)]=-1;
      }
      if(s[i][Math.min((dim-1),j+1)]!=1){
        c[i][Math.min((dim-1),j+1)]=-1;
      }
    }
  }else if(s[i][Math.min((dim-1),j+1)]==1&&s[i][Math.min((dim-1),j+1)]==c[i][Math.min((dim-1),j+1)]){
    if(s[i][Math.min((dim-1),j+2)]==1&&s[i][Math.min((dim-1),j+2)]==c[i][Math.min((dim-1),j+2)]){
      if(s[i][Math.min((dim-1),j+3)]==1&&s[i][Math.min((dim-1),j+3)]==c[i][Math.min((dim-1),j+3)]){
        if(s[i][Math.min((dim-1),j+4)]==1&&s[i][Math.min((dim-1),j+4)]==c[i][Math.min((dim-1),j+4)]){
          if(s[i][Math.max(0,j-1)]!=1){
            c[i][Math.max(0,j-1)]=-1;
          }
          if(s[i][Math.min((dim-1),j+5)]!=1){
            c[i][Math.min((dim-1),j+5)]=-1;
          }
        }
      }else{
        if(s[i][Math.max(0,j-1)]!=1){
          c[i][Math.max(0,j-1)]=-1;
        }
        if(s[i][Math.min((dim-1),j+3)]!=1){
          c[i][Math.min((dim-1),j+3)]=-1;
        }
      }
    }else{
      if(s[i][Math.max(0,j-1)]!=1){
        c[i][Math.max(0,j-1)]=-1;
      }
      if(s[i][Math.min((dim-1),j+2)]!=1){
        c[i][Math.min((dim-1),j+2)]=-1;
      }
    }
  }else{
    if(s[i][Math.max(0,j-1)]!=1){
      c[i][Math.max(0,j-1)]=-1;
    }
    if(s[i][Math.min((dim-1),j+1)]!=1){
      c[i][Math.min((dim-1),j+1)]=-1;
    }
  }
}

function risultati(){
  disegnaCampi();
  pg1=g1;
  pg2=g2;
  coloraCampo(pg1,1);
  coloraCampo(pg2,2);
  bloccaTabella(1);
  bloccaTabella(2);
  x=-1;
  y=-2;
}

//-------------------------------------------------------------------
//JSON
//-------------------------------------------------------------------

function selezioneJson(g){
  //collegamento al div pagina html
  var refDiv = document.getElementById("principale");

  //creazione elementi
  testoSelezione = document.createElement("h1");
  btnSingolo = document.createElement("button");
  btnDoppio = document.createElement("button");

  //associazione id e classi
  testoSelezione.id = "testoSelezione";
  btnSingolo.id = "btnSi";
  btnDoppio.id = "btnNo";
  testoSelezione.className = "testoSelezione";
  btnSingolo.className = "btnSelezione";
  btnDoppio.className = "btnSelezione";

  //impostazione comportamento tasti
  btnSingolo.onclick = function(){si(g);};
  btnDoppio.onclick = function(){no(g);};

  //inserimento testi
  testoSelezione.innerHTML = "Desideri Caricare il campo da un file json?";
  btnSingolo.innerHTML = "SI";
  btnDoppio.innerHTML = "NO";

  //aggiunta elementi a pagina html
  refDiv.appendChild(testoSelezione);
  refDiv.appendChild(btnSingolo);
  refDiv.appendChild(btnDoppio);
}

function si (g) {
  eliminaElementiSelezioneJson();
  caricadaJson(g);
}

function no (g) {
  eliminaElementiSelezioneJson();
  inserimentoBarche(g);
}

function eliminaElementiSelezioneJson() {
  //rimozione elementi per la selezione
  testo = document.getElementById("testoSelezione");
  testo.parentNode.removeChild(testo);
  btnUno = document.getElementById("btnSi");
  btnUno.parentNode.removeChild(btnUno);
  btnDue = document.getElementById("btnNo");
  btnDue.parentNode.removeChild(btnDue);
}

function salvareSuJson(g){
  //collegamento al div pagina html
  var refDiv = document.getElementById("principale");

  //creazione elementi
  testoSelezione = document.createElement("h1");
  btnSingolo = document.createElement("button");
  btnDoppio = document.createElement("button");

  //associazione id e classi
  testoSelezione.id = "testoSelezione";
  btnSingolo.id = "btnSi";
  btnDoppio.id = "btnNo";
  testoSelezione.className = "testoSelezione";
  btnSingolo.className = "btnSelezione";
  btnDoppio.className = "btnSelezione";

  //impostazione comportamento tasti
  btnSingolo.onclick = function(){salva(g);};
  btnDoppio.onclick = function(){nonSalvare(g);};

  //inserimento testi
  testoSelezione.innerHTML = "Desideri Salvare il campo da gioco in un file json?";
  btnSingolo.innerHTML = "SI";
  btnDoppio.innerHTML = "NO";

  //aggiunta elementi a pagina html
  refDiv.appendChild(testoSelezione);
  refDiv.appendChild(btnSingolo);
  refDiv.appendChild(btnDoppio);
}

function salva (g) {
  eliminaElementiSelezioneJson();
  salvaSuJson(g);
  procedi(g);
}

function nonSalvare (g) {
  eliminaElementiSelezioneJson();
  procedi(g);
}

function procedi(g){
  if(campiMemorizzati==1){
    if(modalita==2){
      inserimentoBarche(1);
    }else{
      inserimentoAuto();
    }
  }else{
    inizioGioco();
  }
}

function salvaSuJson(g){
  var myJSON;
  if(g==1){
    myJSON = JSON.stringify(g1);
  }else{
    myJSON = JSON.stringify(g2);
  }
  var blob = new Blob([myJSON], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "disposizione_barche.json");
}

function caricadaJson(g){
	//collegamento al div pagina html
  var refDiv = document.getElementById("principale");

  //creazione elementi
  testoSelezione = document.createElement("h1");
  input = document.createElement("input");

  //associazione id e classi
  testoSelezione.id = "testoSelezione";
  input.id = "input";
  testoSelezione.className = "testoSelezione";
  input.className = "btnSelezione";

  //impostazione comportamento tasti
  input.onchange = function(){controlla(g);};
  input.onload = function(){carica(g);};

  //impostazione proprietà
  input.type = "file";
  input.accept = ".json";

  //inserimento testi
  testoSelezione.innerHTML = "Selezionare il file Json";

  //aggiunta elementi a pagina html
  refDiv.appendChild(testoSelezione);
  refDiv.appendChild(input);
}

//Crea il FileReader
reader = new FileReader();

function controlla(g){
  t = input.files[0];
  s = t.type;
  if (s!="application/json"){
    document.getElementById("testoSelezione").innerHTML = "Il file selezionato non è valido\nSelezionare il file Json";
  }else{
    document.getElementById("testoSelezione").innerHTML = "Selezionare il file Json";
    reader.addEventListener('load', event => {
			carica(event.target.result , g)
    });
      reader.readAsText(t);
  }
}

function carica(file,g){
  try{
    m= JSON.parse(file);
  }catch(e){
    document.getElementById("testoSelezione").innerHTML = "Il file selezionato non è valido\nSelezionare il file Json";
    return;
  }
  dim = calcolaDifficolta();
  tot=0;
  for(i=0;i<dim;i++){
    for(j=0;j<dim;j++){
      if(m[i][j]==1){
        tot+=1;
      }
    }
  }
  if(tot!=15){
    document.getElementById("testoSelezione").innerHTML = "Il file selezionato non è valido\nSelezionare il file Json";
    return;
  }
  caricaBarche(m,g);
}

function caricaBarche(m,g){
  cancellaGioc();
  dim = calcolaDifficolta();
  for(i=0;i<dim;i++){
    for(j=0;j<dim;j++){
      if(m[i][j]==1){
        gioc[i][j]=1;
      }
    }
  }
  distruggiCaricaeAvvia(g);
}

function distruggiCaricaeAvvia(g){
  e = document.getElementById("testoSelezione");
  e.parentNode.removeChild(e);
  e = document.getElementById("input");
  e.parentNode.removeChild(e);
  calcolaMare();
  if(campiMemorizzati==0){
    copiaValoriGiocatoreUno();
    index=0;
    campiMemorizzati=1;
  }else{
    copiaValoriGiocatoreDue();
    campiMemorizzati=2;
  }
  cancellaGioc();
  if(campiMemorizzati==1){
    if(modalita==2){
      selezioneJson(2);
    }else{
      inserimentoAuto();
    }
  }else{
    inizioGioco();
  }
}