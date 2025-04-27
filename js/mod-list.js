// Helper to create file-related links
const createFileLinks = (url) => {
  const fileLink = url.slice(0, url.lastIndexOf("/"));
  const fileName = url.split("/").pop();
  const downloadLink = fileLink.slice(0, fileLink.lastIndexOf("/")) + `/download/${fileName}`;
  return { fileLink, downloadLink };
};

// Helper to generate multiple anchor elements
const generateAnchors = (fileLink, fileUrl, downloadUrl) => [
  generateElement("a", "", "List").attr({ target: "_blank", href: fileLink }),
  generateElement("a", "", "File").attr({ target: "_blank", href: fileUrl }),
  generateElement("a", "", "Download").attr({ target: "_blank", href: downloadUrl }),
];

// Helper to build a row element
const buildRow = (nameEl, versionEl, linkEl) => 
  generateElement("div", "row mod-row").append(nameEl, versionEl, linkEl);

// Clear container by ID
const clearContainer = (id) => $(`#${id}`).empty();

// Sort list alphabetically by name
const sortByName = (list) => list.sort((a, b) => a.name.localeCompare(b.name));

// Generate jQuery element
const generateElement = (tag = "div", className = "", text = "") => 
  $(`<${tag}></${tag}>`).addClass(className).html(text);

// Manage the mod list display
const manageList = (list, includeVersion) => {
  const sortedList = sortByName(list);
  clearContainer("fabric-mods");

  sortedList.forEach((mod) => {
    const { fileLink, downloadLink } = createFileLinks(mod.link);

    const name = generateElement("div", "col-4 mod-name", mod.name);
    if (mod.ext) {
      const externalLink = generateElement("a", "ext-link", mod.extver ? `v${mod.extver}` : "EXT")
        .attr({
          title: `Modrinth (v${mod.version})`,
          target: "_blank",
          href: mod.extlink ?? mod.ext,
        });

      if (mod.extver !== includeVersion) externalLink.css("color", "red");
      name.append(externalLink);
    }

    const version = generateElement("div", "col-4 mod-version", mod.version);
    if (mod.version !== includeVersion) version.css("color", "red");

    const link = generateElement("div", "col-4 mod-link").append(
      ...generateAnchors(fileLink, mod.link, downloadLink)
    );

    const row = buildRow(name, version, link);
    $("#fabric-mods").append(row);
  });
};

// Manage resource or shader packs
const generatePacks = (type, list, includeVersion) => {
  if (!list) return;
  const sortedList = sortByName(list);

  clearContainer(`${type}-packs`);

  sortedList.forEach((pack) => {
    const { fileLink, downloadLink } = createFileLinks(pack.link);

    const name = generateElement("div", "col-4 mod-name", pack.name);
    const version = generateElement("div", "col-4 mod-version", pack.version);
    if (pack.version !== includeVersion) version.css("color", "red");

    const link = generateElement("div", "col-4 mod-link").append(
      ...generateAnchors(fileLink, pack.link, downloadLink)
    );

    const row = buildRow(name, version, link);
    $(`#${type}-packs`).append(row);
  });
};

// Generate additional external links section
const generateAdditionalLinks = () => {
  clearContainer("additional-links");

  additional_links.forEach((entry) => {
    const name = generateElement("div", "col-6 mod-name", entry.name);
    const linkContainer = generateElement("div", "col-6 mod-link");

    entry.links.forEach((link, index) => {
      linkContainer.append(
        generateElement("a", "", link.title).attr({ target: "_blank", href: link.url })
      );
      if (index < entry.links.length - 1) {
        linkContainer.append($("<br/>"));
      }
    });

    const row = buildRow(name, linkContainer);
    $("#additional-links").append(row);
  });
};

// Handle version change
const changeVersion = (version) => {
  const fileVar = getFileVar(version);
  const jsonData = window[fileVar];

  $(".game-header-art").css("background-image", `url(./img/${jsonData.banner ?? 'banner.png'})`);
  manageList(jsonData.modList, version);
  generatePacks("resource", jsonData.resourcePacks, version);
  generatePacks("shader", jsonData.shaderPacks, version);
};

// Get file variable name based on version
const getFileVar = (version) => `list_${version.replaceAll(".", "")}`;

// Default current version
const currentVersion = "1.21.5";

// Initialize when document is ready
$(() => {
  $("#version").change(function () {
    changeVersion(this.value);
  });

  changeVersion(currentVersion);
  generateAdditionalLinks();
});
