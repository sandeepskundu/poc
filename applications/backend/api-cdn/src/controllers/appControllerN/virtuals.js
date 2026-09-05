module.exports = {
    kundu:{
        get() {
            //debugger;
            return `${this.meta.part} ${this.author}`;
        },

        set(v) {
            //debugger;
            this.name.first = v.substr(0, v.indexOf(' '));
            this.name.last = v.substr(v.indexOf(' ') + 1);
        }
    }
}