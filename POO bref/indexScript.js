// ______________________________ class _________________________________//
class Item {
  constructor(name, marque, prix, date, type, radioCheck) {
    this.name = name;
    this.marque = marque;
    this.prix = prix;
    this.date = date;
    this.type = type;
    this.radioCheck = radioCheck;
    this.details = function () {
      return ` <u>Detail du produit</u>  <br>Nom  :  ${this.name}<br>Marque :  ${this.marque}<br>Date : ${this.date}<br>Type: ${this.type}<br>Et en promotion : ${this.radioCheck}`;
    };
    this.tab = function () {
      return [
        this.name,
        this.marque,
        this.prix,
        this.date,
        this.type,
        this.radioCheck,
        `<div class="rowx"><button id="remove${id}" onclick='remove(this)' class="remove">Supprimer</button><button onclick='edit(this);' id="add${id}" class="add">Edit</button></div>`,
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

// _______________________ Regex validation ____________________________________//
function checkName(name) {
  let nameRex = /^(^[a-z]+['-\s]?[a-z]+)$/gi;
  let validename = nameRex.test(name);
  return validename;
}
function checkmarque(marque) {
  let marqueRex = /^(^[a-z]+['-\s]?[a-z]+)$/gi;
  let validemarque = marqueRex.test(marque);
  return validemarque;
}
function checkprix(prix) {
  let prixRex = /^(^\d+([,.]?\d+$)?)$/;
  let valideprix = prixRex.test(prix);
  return valideprix;
}
function getpromo(listpromo) {
  for (let i = 0; i < listpromo.length; i++) {
    if (listpromo[i].checked) {
      return listpromo[i].value;
    }
  }
}

// ________________________ input _____________________//
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
// ______________________________ Date maximum value __________________//
date_de_production.max = new Date().toLocaleDateString("en-ca");
// ______________________________ validation ___________________________//
function validation(item) {
  // validation
  checkName(item.name);
  checkmarque(item.marque);
  checkprix(item.prix);
  // condition
  let check = true;
  while (check) {
    if (checkName(item.name)) {
      document.getElementById("errorName").classList.remove("error");
    } else {
      document.getElementById("errorName").classList.add("error");
    }
    if (checkmarque(item.marque)) {
      document.getElementById("errorMarque").classList.remove("error");
    } else {
      document.getElementById("errorMarque").classList.add("error");
    }
    if (checkprix(item.prix)) {
      document.getElementById("errorPrix").classList.remove("error");
    } else {
      document.getElementById("errorPrix").classList.add("error");
    }
    if (item.date == "") {
      document.getElementById("errorDate").classList.add("error");
    } else {
      document.getElementById("errorDate").classList.remove("error");
    }
    if (item.radioCheck == undefined) {
      document.getElementById("errorRadio").classList.add("error");
    } else {
      document.getElementById("errorRadio").classList.remove("error");
    }
    if (item.select == "") {
      document.getElementById("errorSelec").classList.add("error");
    } else {
      document.getElementById("errorSelec").classList.remove("error");
    }
    check = false;
  }
  return item;
}
// ____________________________________ L'ordre alphabétique __________________________//
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
// ____________________ Ajouter ____________________
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
  document.getElementById("mod-add").innerHTML = inputvalue().details();
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
document.getElementById("cancel").onclick = function () {
  document.getElementById("modaleremove").style.display = "none";
};
function modaleremove() {
  document.getElementById("modaleremove").style.display = "block";
  document.getElementById("modaleremove").style.display = "grid";
}
// _________________________________ Editer _______________________
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
  if (tab[5] === "yes") {
    document.getElementById("yes").checked = true;
  } else if (tab[5] === "no") {
    document.getElementById("no").checked = true;
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
// ____________________ localstorag  _________________________________//
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
