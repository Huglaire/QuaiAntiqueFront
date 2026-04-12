export default class Route {
    constructor(url, title, pathHtml, authorize, pathJS = "") {
      this.url = url;
      this.title = title;
      this.pathHtml = pathHtml;
      this.pathJS = pathJS;
      this.authorize = authorize;
    }
}

/*
Explication tableau des rôles :
[] : accessible à tous
["disconnected"] : accessible uniquement aux utilisateurs non connectés
["client"] : accessible uniquement aux clients connectés
["admin"] : accessible uniquement aux administrateurs connectés
["client", "admin"] : accessible uniquement aux clients et administrateurs connectés
*/
