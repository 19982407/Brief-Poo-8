// ______________________________ class _________________________________//
class Item {
  constructor(name, marque, prix, date, type, radioCheck) {
    this.name = name;
    this.marque = marque;
    this.prix = prix;
    this.date = date;
    this.type = type;
    this.radioCheck = radioCheck;
    this.modalproduct = function () {
      return ` <b>Les informations de produit</b>  <br>Nom  :  ${this.name}<br>Marque :  ${this.marque}<br>
      Date : ${this.date}<br>Type: ${this.type}<br>Et en promotion : ${this.radioCheck}`;
    };
    this.tab = function () {
      return [
        this.name,
        this.marque,
        this.prix,
        this.date,
        this.type,
        this.radioCheck,
        `<div class="row1"><button id="remove${id}" onclick='remove(this)' class="remove">Supprimer</button><button onclick='edit(this);' id="add${id}" class="add">Modifier</button></div>`,
      ];
    };
  }
}
// _______________________ validation ____________________________________//
function checkP() {
  let p = document.querySelectorAll("form p");
  let result = true;
  for (let i = 0; i < p.length; i++) {
    if (p[i].classList.contains("error")) {
      return (result = false);
    }
  }
  return result;
}
function save(tab) {
  let row = document.createElement("tr");
  row.setAttribute("id", "tr" + id);
  document.getElementById("tab").appendChild(row);
  for (let i = 0; i < tab.length; i++) {
    let cell = document.createElement("td");
    cell.setAttribute("id", "td" + id + i);
    document.getElementById("tr" + id).appendChild(cell);
    document.getElementById("td" + id + i).innerHTML = tab[i];
  }
}

function resetform() {
  let name = (document.getElementById("name").value = "");
  let marque = (document.getElementById("marque").value = "");
  let prix = (document.getElementById("prix").value = "");
  let date = (document.getElementById("date_de_production").value = "");
  let select = (document.getElementById("type").value = "");
  let radioCheck = document.getElementsByName("radioCheck");
  for (let i = 0; i < radioCheck.length; i++) {
    radioCheck[i].checked = false;
  }
}
// ________________________ inputvalue _____________________//
function inputvalue() {
  let name = document.getElementById("name").value;
  let marque = document.getElementById("marque").value;
  let prix = document.getElementById("prix").value;
  let date = document.getElementById("date_de_production").value;
  let select = document.getElementById("type").value;
  let radioCheck = document.getElementsByName("radioCheck");
  let item;
  return (item = new Item(
    name,
    marque,
    prix,
    date,
    select,
    getpromo(radioCheck)
  ));
  
}
// ______________________________ validation et Regular expression ___________________________//
function validation(item) {
  checkName(item.name);
  checkmarque(item.marque);
  checkprix(item.prix);
  let check = true;
  while (check) {
    if (checkName(item.name)) {
      document.getElementById("ObligName").classList.remove("error");
    } else {
      document.getElementById("ObligName").classList.add("error");
    }
    if (checkmarque(item.marque)) {
      document.getElementById("ObligMarque").classList.remove("error");
    } else {
      document.getElementById("ObligMarque").classList.add("error");
    }
    if (checkprix(item.prix)) {
      document.getElementById("ObligPrix").classList.remove("error");
    } else {
      document.getElementById("ObligPrix").classList.add("error");
    }
    if (item.date == "") {
      document.getElementById("ObligDate").classList.add("error");
    } else {
      document.getElementById("ObligDate").classList.remove("error");
    }
    if (item.radioCheck == undefined) {
      document.getElementById("ObligRadio").classList.add("error");
    } else {
      document.getElementById("ObligRadio").classList.remove("error");
    }
    if (item.select == "") {
      document.getElementById("ObligSelec").classList.add("error");
    } else {
      document.getElementById("ObligSelec").classList.remove("error");
    }
    check = false;
  }
  return item;
}
function checkName(name) {
  let nameRegex = /^(^[a-z]+['-\s]?[a-z]+)$/gi;
  let validename = nameRegex.test(name);
  return validename;
}
function checkmarque(marque) {
  let marqueRegex = /^(^[a-z]+['-\s]?[a-z]+)$/gi;
  let validemarque = marqueRegex.test(marque);
  return validemarque;
}
function checkprix(prix) {
  let prixRegex = /^(^\d+([,.]?\d+$)?)$/;
  let valideprix = prixRegex.test(prix);
  return valideprix;
}
function getpromo(listpromo) {
  for (let i = 0; i < listpromo.length; i++) {
    if (listpromo[i].checked) {
      return listpromo[i].value;
    }
  }
}
// ____________________________________ L'ordre alphabétique(Sort) __________________________//
function sorttab() {
  let tab, rows, switching, i, x, y, shouldSwitch, cont;
  tab = document.getElementById("tab");
  switching = true;
  cont = 0
  while (switching) {
    switching = false;
    rows = tab.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      cont++
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
// ____________________ Ajouter ____________________//
let id = 0;
document.getElementById("button").onclick = function (e) {
  validation(inputvalue());
  checkP();
  if (checkP() === true) {
    id++;
    save(inputvalue().tab());
    modaleadd();
    document.getElementById("hide").onclick = function () {
      document.getElementById("modaleadd").style.display = "none";
    };
    window.localStorage.setItem(
      inputvalue().name,
      JSON.stringify(inputvalue().tab())
    );
    resetform();
    sorttab();
  } else {
    e.preventDefault();
  }
};
function modaleadd() {
  document.getElementById("modaleadd").style.display = "block";
  document.getElementById("modaleadd").style.display = "grid";
  document.getElementById("modal_add").innerHTML = inputvalue().modalproduct();
}
// ____________________________________ Supprimer ____________________________________//
function remove(that) {
  modaleremove();
  document.getElementById("delete").onclick = function () {
    if ((document.getElementById("delete").value = "delete")) {
      let deletedata = that.closest("tr");
      let alldata = deletedata.querySelectorAll("td");
      let tab = new Array();
      alldata.forEach((data) => tab.push(data.innerHTML));
      console.log(tab[0]);
      removstorag(tab[0]);
      that.closest("tr").remove();
      document.getElementById("modaleremove").style.display = "none";
    }
  };
}
function removstorag(that) {
  window.localStorage.removeItem(that);
}
document.getElementById("annuler").onclick = function () {
  document.getElementById("modaleremove").style.display = "none";
};
function modaleremove() {
  document.getElementById("modaleremove").style.display = "block";
  document.getElementById("modaleremove").style.display = "grid";
}
// _________________________________ Editer _______________________//
function edit(that) {
  let save = document.getElementById("save");
  let button = document.getElementById("button");
  save.style.display = "block";
  button.style.display = "none";
  let data = that.closest("tr");
  let td = data.querySelectorAll("td");
  let tab = [];
  let inputtab = [];
  td.forEach((e) => tab.push(e.innerHTML));
  let input = document.querySelectorAll("form input,select");
  input.forEach((e) => inputtab.push(e));
  for (let i = 0; i < tab.length - 2; i++) {
    inputtab[i].value = tab[i];
  }
  if (tab[5] === "oui") {
    document.getElementById("oui").checked = true;
  } else if (tab[5] === "non") {
    document.getElementById("non").checked = true;
  }
  save.onclick = function () {
    validation(inputvalue());
    checkP();
    if (checkP() === true) {
      for (let i = 0; i < inputvalue().tab().length - 1; i++) {
        td[i].innerHTML = inputvalue().tab()[i];
      }
    }
    save.style.display = "none";
    button.style.display = "block";
    removstorag(tab[0]);
    window.localStorage.setItem(
      inputvalue().name,
      JSON.stringify(inputvalue().tab())
    );
    sorttab();
    resetform();
  }
}
// ____________________ localstorage  _________________________________//
function allStorage() {
  let values = []
    keys = Object.keys(localStorage)
    i = keys.length;
  while (i--) {
    values.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  return values;
}
window.addEventListener("DOMContentLoaded", function () {
  allStorage();
  for (let i = 0; i < allStorage().length; i++) {
    save(allStorage()[i]);
    id++;
  }
  sorttab();
});
// ______________________________ Date maximum value __________________//
date_de_production.max = new Date().toLocaleDateString("en-ca");
