function manageList(list, includeVersion) {
  var modList = sort(list);

  document.getElementById("fabric-mods").innerHTML = "";

  modList.forEach((element) => {
    const row = generateElement("div", "row mod-row");

    const name = generateElement("div", "col-4 mod-name", element.name);

    const version = generateElement(
      "div",
      "col-4 mod-version",
      element.version
    );

    if (element.version != includeVersion) {
      version.style.color = "red";
    }

    const link = generateElement("div", "col-4 mod-link");

    const anchorTag = generateElement("a", "", "Download Link");
    anchorTag.setAttribute("target", "_blank");
    anchorTag.setAttribute("href", element.link);

    row.appendChild(name);
    row.appendChild(version);
    link.appendChild(anchorTag);
    row.appendChild(link);

    document.getElementById("fabric-mods").appendChild(row);
  });
}

function generateElement(elementStr = "div", classStr = "", textStr = "") {
  const element = document.createElement(elementStr);
  element.className = classStr;
  element.innerHTML = textStr;
  return element;
}

function sort(list) {
  list.sort((a, b) => {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  return list;
}

function displayList(fileVar) {
  var jsonData = JSON.parse(list).html();
  manageList(jsonData, currentVersion);
}

function getFileVar(version) {
  // return "list" + version.replaceAll(".", "");
  return "list";
}

var currentVersion = "1.18.2";

$(function () {
  displayList(getFileVar(currentVersion));
});
