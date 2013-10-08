/**
 * Nav module
 */

'use strict';

// Constructor
ns.Modules.Nav = function(elem) {
    ns.Base.call(this, elem);
};

// Inherit from ns.Base
var p = ns.Modules.Nav.prototype = Object.create(ns.Base.prototype);

// Initialize the module
p.init = function() {
    $('.state', this.rootNode).html('initial state set: ' + this.getState());
};

// Fired whenever the modules' CSS state changes
p.onStateChange = function(oldState, newState) {
    $('.state', this.rootNode).html('state change, from ' + oldState + ' to ' + newState);
};