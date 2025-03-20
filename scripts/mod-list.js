function manageList(list, includeVersion) {
  var modList = sort(list);

  $("#fabric-mods").html("");

  modList.forEach((element) => {
    const fileLink = element.link.slice(0, element.link.lastIndexOf("/"));
    const fileName = element.link.split("/").pop();
    const downloadLink =
      fileLink.slice(0, fileLink.lastIndexOf("/")) + `/download/${fileName}`;

    const row = generateElement("div", "row mod-row");

    const name = generateElement("div", "col-4 mod-name", element.name);
    if (element.ext != null) {
      const externalLink = generateElement("a", "ext-link", element.extver ? `v${element.extver}` : "EXT" );
      externalLink.attr({
        title: `Modrinth (v${element.version})`,
        target: "_blank",
        href: element.extlink == null ? element.ext : element.extlink,
      });
      name.append(externalLink);
    }

    const version = generateElement(
      "div",
      "col-4 mod-version",
      element.version
    );

    if (element.version != includeVersion) {
      version.css("color", "red");
    }

    const link = generateElement("div", "col-4 mod-link");

    const anchorList = generateElement("a", "", "List");
    anchorList.attr({
      target: "_blank",
      href: fileLink,
    });

    const anchorFile = generateElement("a", "", "File");
    anchorFile.attr({
      target: "_blank",
      href: element.link,
    });

    const anchorDownload = generateElement("a", "", "Download");
    anchorDownload.attr({
      target: "_blank",
      href: downloadLink,
    });

    row.append(name);
    row.append(version);
    link.append(anchorList);
    link.append(anchorFile);
    link.append(anchorDownload);
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
  manageList(jsonData.modList, version);
  generatePacks("resource", jsonData.resourcePacks, version);
  generatePacks("shader", jsonData.shaderPacks, version);
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

function generateAdditionalLinks() {
  const linkList = additional_links;

  $("#additional-links").html("");

  linkList.forEach((element) => {
    const row = generateElement("div", "row mod-row");

    const name = generateElement("div", "col-6 mod-name", element.name);

    const linkElement = generateElement("div", "col-6 mod-link");

    element.links.forEach((link, index) => {
      const anchorList = generateElement("a", "", link.title);
      anchorList.attr({
        target: "_blank",
        href: link.url,
      });
      linkElement.append(anchorList);
      if (index != element.links.length) {
        const breakElement = $(`<br/>`);
        linkElement.append(breakElement);
      }
    });

    row.append(name);
    row.append(linkElement);

    $("#additional-links").append(row);
  });
}

function generatePacks(type, list, includeVersion) {
  if (list == null) return;

  var packs = sort(list);

  $(`#${type}-packs`).html("");

  packs.forEach((element) => {
    const fileLink = element.link.slice(0, element.link.lastIndexOf("/"));
    const fileName = element.link.split("/").pop();
    const downloadLink =
      fileLink.slice(0, fileLink.lastIndexOf("/")) + `/download/${fileName}`;

    const row = generateElement("div", "row mod-row");

    const name = generateElement("div", "col-4 mod-name", element.name);

    const version = generateElement(
      "div",
      "col-4 mod-version",
      element.version
    );

    if (element.version != includeVersion) {
      version.css("color", "red");
    }

    const link = generateElement("div", "col-4 mod-link");

    const anchorList = generateElement("a", "", "List");
    anchorList.attr({
      target: "_blank",
      href: fileLink,
    });

    const anchorFile = generateElement("a", "", "File");
    anchorFile.attr({
      target: "_blank",
      href: element.link,
    });

    const anchorDownload = generateElement("a", "", "Download");
    anchorDownload.attr({
      target: "_blank",
      href: downloadLink,
    });

    row.append(name);
    row.append(version);
    link.append(anchorList);
    link.append(anchorFile);
    link.append(anchorDownload);
    row.append(link);

    $(`#${type}-packs`).append(row);
  });
}

var currentVersion = "1.21.4";

$(function () {
  const selectElement = $("#version");
  selectElement.change(function () {
    changeVersion(this.value);
  });
  changeVersion(currentVersion);
  generateAdditionalLinks();
});
