export default class CadastroDeclaracao {

    constructor(title, theme, description, text) {
        this.id = Math.random().toString(36).substr(2, 5);
        this.title = title;
        this.theme = theme;
        this.description = description;
        this.text = text
    }
}