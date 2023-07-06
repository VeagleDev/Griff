function checkServerUrl(value: string) {
  if (!value) {
    return "https://griff.veagle.fr";
  }

  if (!value.startsWith("http")) value = "http://" + value;

  if (value.endsWith("/")) value = value.slice(0, -1);

  return value;
}

function getServerName(value: string) {
  if (!value) return "griff.veagle.fr";

  if (value.startsWith("http://") || value.startsWith("https://"))
    value = value.split("://")[1];

  if (value.endsWith("/")) value = value.slice(0, -1);

  return value;
}

export { checkServerUrl, getServerName };
