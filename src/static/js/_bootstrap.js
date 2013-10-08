$(function() {
    $('[data-module]:not([data-initialized])').each(function() {
        var module = ns.Modules[this.getAttribute('data-module')];
        if (module !== undefined) {
            this.setAttribute('data-initialized', true);
            ns.Instances[this.id] = new module(this);
        }
    });
});