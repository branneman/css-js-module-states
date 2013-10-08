/**
 * Base object, all modules will inherit from this
 */

'use strict';

// Namespace definition
window.ns = {
    Modules: {},
    Instances: {}
};

// Define Base constructor
ns.Base = function(elem) {
    this.rootNode     = elem;
    this.currentState = this.getState();

    this.bindMethods();
    this.attachEvents();
    this.init();
};

var p = ns.Base.prototype;

// Grab the current CSS state of the modules' rootNode element
p.getState = function() {

    if (!this.rootNode) return undefined;

    var activeState;

    // All modern browsers
    if (window.getComputedStyle) {
        activeState = window.getComputedStyle(this.rootNode, ':before').getPropertyValue('content');
    }

    // oldIE
    else {
        // Use .getCompStyle instead of .getComputedStyle so above check for window.getComputedStyle never
        //  fires true for old browsers
        window.getCompStyle = function(el, pseudo) {
            this.el = el;
            this.getPropertyValue = function(prop) {
                var re = /(\-([a-z]){1})/g;
                if (prop == 'float') prop = 'styleFloat';
                if (re.test(prop)) {
                    prop = prop.replace(re, function () {
                        return arguments[2].toUpperCase();
                    });
                }
                return el.currentStyle[prop] ? el.currentStyle[prop] : null;
            };
            return this;
        };
        var compStyle = window.getCompStyle(this.rootNode, '');
        activeState = compStyle.getPropertyValue('content');
    }

    // Clean up the string
    activeState = activeState
        .replace(/"/g, '')
        .replace(/'/g, '');
    return activeState;
};

// Set the 'this' keyword to the current object
p.bindMethods = function() {
    this.onResize = this.onResize.bind(this);
};

// Bind events
p.attachEvents = function() {
    $(window).on('resizeEnd', this.onResize);
};

// Unbind events
p.detachEvents = function() {
    $(window).off('resizeEnd', this.onResize);
};

// Call onStateChange() if the resize triggered another state
p.onResize = function(e) {
    var oldState = this.currentState,
        newState = this.getState();
    if (this.currentState !== newState) {
        this.currentState = newState;
        this.onStateChange(oldState, newState);
    }
};

// Fired whenever the modules' CSS state changes
p.onStateChange = function(oldState, newState) {};