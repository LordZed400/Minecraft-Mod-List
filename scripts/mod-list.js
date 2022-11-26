function manageList(list, includeVersion) {
  var modList = sort(list);

  $("#fabric-mods").html("");

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
    anchorTag.attr({
      target: "_blank",
      href: element.link,
    });

    row.append(name);
    row.append(version);
    link.append(anchorTag);
    row.append(link);

    $("#fabric-mods").append(row);
  });
}

function generateElement(elementStr = "div", classStr = "", textStr = "") {
  const element = $(`<${elementStr}></${elementStr}>`);
  element.addClass(classStr);
  element.html(textStr);
  return element;
}

function changeVersion(version) {
  const fileVar = getFileVar(version);
  var jsonData = window[fileVar];
  $(".game-header-art").css("background-image", `url(${jsonData.banner})`);
  manageList(jsonData.modList, currentVersion);
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

function getFileVar(version) {
  return "list_" + version.replaceAll(".", "");
}

var currentVersion = "1.18.2";

$(function () {
  changeVersion(currentVersion);
});
