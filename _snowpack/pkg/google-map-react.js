import { c as createCommonjsModule, r as react } from './common/index-e66f0a38.js';
import { r as reactDom } from './common/index-6fdd872f.js';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var eventemitter3 = createCommonjsModule(function (module) {

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
{
  module.exports = EventEmitter;
}
});

// do not edit .js files directly - edit src/index.jst



var fastDeepEqual = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at.
 *
 *      Http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_ID = "__googleMapsScriptId";
/**
 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
 * dynamically using
 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 * It works by dynamically creating and appending a script node to the the
 * document head and wrapping the callback function so as to return a promise.
 *
 * ```
 * const loader = new Loader({
 *   apiKey: "",
 *   version: "weekly",
 *   libraries: ["places"]
 * });
 *
 * loader.load().then(() => {
 *   const map = new google.maps.Map(...)
 * })
 * ```
 */
class Loader {
    /**
     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
     * using this library, instead the defaults are set by the Google Maps
     * JavaScript API server.
     *
     * ```
     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
     * ```
     */
    constructor({ apiKey, channel, client, id = DEFAULT_ID, libraries = [], language, region, version, mapIds, nonce, retries = 3, url = "https://maps.googleapis.com/maps/api/js", }) {
        this.CALLBACK = "__googleMapsCallback";
        this.callbacks = [];
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.version = version;
        this.apiKey = apiKey;
        this.channel = channel;
        this.client = client;
        this.id = id || DEFAULT_ID; // Do not allow empty string
        this.libraries = libraries;
        this.language = language;
        this.region = region;
        this.mapIds = mapIds;
        this.nonce = nonce;
        this.retries = retries;
        this.url = url;
        if (Loader.instance) {
            if (!fastDeepEqual(this.options, Loader.instance.options)) {
                throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
            }
            return Loader.instance;
        }
        Loader.instance = this;
    }
    get options() {
        return {
            version: this.version,
            apiKey: this.apiKey,
            channel: this.channel,
            client: this.client,
            id: this.id,
            libraries: this.libraries,
            language: this.language,
            region: this.region,
            mapIds: this.mapIds,
            nonce: this.nonce,
            url: this.url,
        };
    }
    /**
     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
     *
     * @ignore
     */
    createUrl() {
        let url = this.url;
        url += `?callback=${this.CALLBACK}`;
        if (this.apiKey) {
            url += `&key=${this.apiKey}`;
        }
        if (this.channel) {
            url += `&channel=${this.channel}`;
        }
        if (this.client) {
            url += `&client=${this.client}`;
        }
        if (this.libraries.length > 0) {
            url += `&libraries=${this.libraries.join(",")}`;
        }
        if (this.language) {
            url += `&language=${this.language}`;
        }
        if (this.region) {
            url += `&region=${this.region}`;
        }
        if (this.version) {
            url += `&v=${this.version}`;
        }
        if (this.mapIds) {
            url += `&map_ids=${this.mapIds.join(",")}`;
        }
        return url;
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     */
    load() {
        return this.loadPromise();
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     *
     * @ignore
     */
    loadPromise() {
        return new Promise((resolve, reject) => {
            this.loadCallback((err) => {
                if (!err) {
                    resolve();
                }
                else {
                    reject(err);
                }
            });
        });
    }
    /**
     * Load the Google Maps JavaScript API script with a callback.
     */
    loadCallback(fn) {
        this.callbacks.push(fn);
        this.execute();
    }
    /**
     * Set the script on document.
     */
    setScript() {
        if (document.getElementById(this.id)) {
            // TODO wrap onerror callback for cases where the script was loaded elsewhere
            this.callback();
            return;
        }
        const url = this.createUrl();
        const script = document.createElement("script");
        script.id = this.id;
        script.type = "text/javascript";
        script.src = url;
        script.onerror = this.loadErrorCallback.bind(this);
        script.defer = true;
        script.async = true;
        if (this.nonce) {
            script.nonce = this.nonce;
        }
        document.head.appendChild(script);
    }
    deleteScript() {
        const script = document.getElementById(this.id);
        if (script) {
            script.remove();
        }
    }
    resetIfRetryingFailed() {
        const possibleAttempts = this.retries + 1;
        if (this.done && !this.loading && this.errors.length >= possibleAttempts) {
            this.deleteScript();
            this.done = false;
            this.loading = false;
            this.errors = [];
        }
    }
    loadErrorCallback(e) {
        this.errors.push(e);
        if (this.errors.length <= this.retries) {
            const delay = this.errors.length * Math.pow(2, this.errors.length);
            console.log(`Failed to load Google Maps script, retrying in ${delay} ms.`);
            setTimeout(() => {
                this.deleteScript();
                this.setScript();
            }, delay);
        }
        else {
            this.onerrorEvent = e;
            this.callback();
        }
    }
    setCallback() {
        window.__googleMapsCallback = this.callback.bind(this);
    }
    callback() {
        this.done = true;
        this.loading = false;
        this.callbacks.forEach((cb) => {
            cb(this.onerrorEvent);
        });
        this.callbacks = [];
    }
    execute() {
        if (window.google && window.google.maps && window.google.maps.version) {
            console.warn("Aborted attempt to load Google Maps JS with @googlemaps/js-api-loader." +
                "This may result in undesirable behavior as script parameters may not match.");
            this.callback();
        }
        this.resetIfRetryingFailed();
        if (this.done) {
            this.callback();
        }
        else {
            if (this.loading) ;
            else {
                this.loading = true;
                this.setCallback();
                this.setScript();
            }
        }
    }
}

var pointGeometry = Point;

/**
 * A standalone point geometry with useful accessor, comparison, and
 * modification methods.
 *
 * @class Point
 * @param {Number} x the x-coordinate. this could be longitude or screen
 * pixels, or any other sort of unit.
 * @param {Number} y the y-coordinate. this could be latitude or screen
 * pixels, or any other sort of unit.
 * @example
 * var point = new Point(-77, 38);
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype = {

    /**
     * Clone this point, returning a new point that can be modified
     * without affecting the old one.
     * @return {Point} the clone
     */
    clone: function() { return new Point(this.x, this.y); },

    /**
     * Add this point's x & y coordinates to another point,
     * yielding a new point.
     * @param {Point} p the other point
     * @return {Point} output point
     */
    add:     function(p) { return this.clone()._add(p); },

    /**
     * Subtract this point's x & y coordinates to from point,
     * yielding a new point.
     * @param {Point} p the other point
     * @return {Point} output point
     */
    sub:     function(p) { return this.clone()._sub(p); },

    /**
     * Multiply this point's x & y coordinates by point,
     * yielding a new point.
     * @param {Point} p the other point
     * @return {Point} output point
     */
    multByPoint:    function(p) { return this.clone()._multByPoint(p); },

    /**
     * Divide this point's x & y coordinates by point,
     * yielding a new point.
     * @param {Point} p the other point
     * @return {Point} output point
     */
    divByPoint:     function(p) { return this.clone()._divByPoint(p); },

    /**
     * Multiply this point's x & y coordinates by a factor,
     * yielding a new point.
     * @param {Point} k factor
     * @return {Point} output point
     */
    mult:    function(k) { return this.clone()._mult(k); },

    /**
     * Divide this point's x & y coordinates by a factor,
     * yielding a new point.
     * @param {Point} k factor
     * @return {Point} output point
     */
    div:     function(k) { return this.clone()._div(k); },

    /**
     * Rotate this point around the 0, 0 origin by an angle a,
     * given in radians
     * @param {Number} a angle to rotate around, in radians
     * @return {Point} output point
     */
    rotate:  function(a) { return this.clone()._rotate(a); },

    /**
     * Rotate this point around p point by an angle a,
     * given in radians
     * @param {Number} a angle to rotate around, in radians
     * @param {Point} p Point to rotate around
     * @return {Point} output point
     */
    rotateAround:  function(a,p) { return this.clone()._rotateAround(a,p); },

    /**
     * Multiply this point by a 4x1 transformation matrix
     * @param {Array<Number>} m transformation matrix
     * @return {Point} output point
     */
    matMult: function(m) { return this.clone()._matMult(m); },

    /**
     * Calculate this point but as a unit vector from 0, 0, meaning
     * that the distance from the resulting point to the 0, 0
     * coordinate will be equal to 1 and the angle from the resulting
     * point to the 0, 0 coordinate will be the same as before.
     * @return {Point} unit vector point
     */
    unit:    function() { return this.clone()._unit(); },

    /**
     * Compute a perpendicular point, where the new y coordinate
     * is the old x coordinate and the new x coordinate is the old y
     * coordinate multiplied by -1
     * @return {Point} perpendicular point
     */
    perp:    function() { return this.clone()._perp(); },

    /**
     * Return a version of this point with the x & y coordinates
     * rounded to integers.
     * @return {Point} rounded point
     */
    round:   function() { return this.clone()._round(); },

    /**
     * Return the magitude of this point: this is the Euclidean
     * distance from the 0, 0 coordinate to this point's x and y
     * coordinates.
     * @return {Number} magnitude
     */
    mag: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    /**
     * Judge whether this point is equal to another point, returning
     * true or false.
     * @param {Point} other the other point
     * @return {boolean} whether the points are equal
     */
    equals: function(other) {
        return this.x === other.x &&
               this.y === other.y;
    },

    /**
     * Calculate the distance from this point to another point
     * @param {Point} p the other point
     * @return {Number} distance
     */
    dist: function(p) {
        return Math.sqrt(this.distSqr(p));
    },

    /**
     * Calculate the distance from this point to another point,
     * without the square root step. Useful if you're comparing
     * relative distances.
     * @param {Point} p the other point
     * @return {Number} distance
     */
    distSqr: function(p) {
        var dx = p.x - this.x,
            dy = p.y - this.y;
        return dx * dx + dy * dy;
    },

    /**
     * Get the angle from the 0, 0 coordinate to this point, in radians
     * coordinates.
     * @return {Number} angle
     */
    angle: function() {
        return Math.atan2(this.y, this.x);
    },

    /**
     * Get the angle from this point to another point, in radians
     * @param {Point} b the other point
     * @return {Number} angle
     */
    angleTo: function(b) {
        return Math.atan2(this.y - b.y, this.x - b.x);
    },

    /**
     * Get the angle between this point and another point, in radians
     * @param {Point} b the other point
     * @return {Number} angle
     */
    angleWith: function(b) {
        return this.angleWithSep(b.x, b.y);
    },

    /*
     * Find the angle of the two vectors, solving the formula for
     * the cross product a x b = |a||b|sin(θ) for θ.
     * @param {Number} x the x-coordinate
     * @param {Number} y the y-coordinate
     * @return {Number} the angle in radians
     */
    angleWithSep: function(x, y) {
        return Math.atan2(
            this.x * y - this.y * x,
            this.x * x + this.y * y);
    },

    _matMult: function(m) {
        var x = m[0] * this.x + m[1] * this.y,
            y = m[2] * this.x + m[3] * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _add: function(p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    },

    _sub: function(p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    },

    _mult: function(k) {
        this.x *= k;
        this.y *= k;
        return this;
    },

    _div: function(k) {
        this.x /= k;
        this.y /= k;
        return this;
    },

    _multByPoint: function(p) {
        this.x *= p.x;
        this.y *= p.y;
        return this;
    },

    _divByPoint: function(p) {
        this.x /= p.x;
        this.y /= p.y;
        return this;
    },

    _unit: function() {
        this._div(this.mag());
        return this;
    },

    _perp: function() {
        var y = this.y;
        this.y = this.x;
        this.x = -y;
        return this;
    },

    _rotate: function(angle) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = cos * this.x - sin * this.y,
            y = sin * this.x + cos * this.y;
        this.x = x;
        this.y = y;
        return this;
    },

    _rotateAround: function(angle, p) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle),
            x = p.x + cos * (this.x - p.x) - sin * (this.y - p.y),
            y = p.y + sin * (this.x - p.x) + cos * (this.y - p.y);
        this.x = x;
        this.y = y;
        return this;
    },

    _round: function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
};

/**
 * Construct a point from an array if necessary, otherwise if the input
 * is already a Point, or an unknown type, return it unchanged
 * @param {Array<Number>|Point|*} a any kind of input value
 * @return {Point} constructed point, or passed-through value.
 * @example
 * // this
 * var point = Point.convert([0, 1]);
 * // is equivalent to
 * var point = new Point(0, 1);
 */
Point.convert = function (a) {
    if (a instanceof Point) {
        return a;
    }
    if (Array.isArray(a)) {
        return new Point(a[0], a[1]);
    }
    return a;
};

function a(){return (a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);}return e}).apply(this,arguments)}function p(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t;}function l(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var u={width:"100%",height:"100%",left:0,top:0,margin:0,padding:0,position:"absolute"},h=function(t){function o(){return t.apply(this,arguments)||this}p(o,t);var n=o.prototype;return n.shouldComponentUpdate=function(){return !1},n.render=function(){return react.createElement("div",{ref:this.props.registerChild,style:u})},o}(react.Component),c=function(e){function t(t){var o;return (o=e.call(this)||this).gmapInstance=t,o}p(t,e);var o=t.prototype;return o.getChildren=function(){return this.gmapInstance.props.children},o.getMousePosition=function(){return this.gmapInstance.mouse_},o.getUpdateCounter=function(){return this.gmapInstance.updateCounter_},o.dispose=function(){this.gmapInstance=null,this.removeAllListeners();},t}(eventemitter3),d=function(e,t){for(var o=a({},e),n=0;n<t.length;n++){var r=t[n];r in o&&delete o[r];}return o},m=Object.prototype.hasOwnProperty;function g(e,t){return e===t?0!==e||0!==t||1/e==1/t:e!=e&&t!=t}function _(e,t){if(g(e,t))return !0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return !1;var o=Object.keys(e),n=Object.keys(t);if(o.length!==n.length)return !1;for(var r=0;r<o.length;r++)if(!m.call(t,o[r])||!g(e[o[r]],t[o[r]]))return !1;return !0}var f={width:"100%",height:"100%",left:0,top:0,margin:0,padding:0,position:"absolute"},v={width:0,height:0,left:0,top:0,backgroundColor:"transparent",position:"absolute"},M=function(t){function o(o){var n;return (n=t.call(this,o)||this)._getState=function(){return {children:n.props.dispatcher.getChildren(),updateCounter:n.props.dispatcher.getUpdateCounter()}},n._onChangeHandler=function(){if(n.dimensionsCache_){var e=(n.state.children||[]).length,t=n._getState();n.setState(t,function(){return (t.children||[]).length!==e&&n._onMouseChangeHandler()});}},n._onChildClick=function(){n.props.onChildClick&&n.hoverChildProps_&&n.props.onChildClick(n.hoverKey_,n.hoverChildProps_);},n._onChildMouseDown=function(){n.props.onChildMouseDown&&n.hoverChildProps_&&n.props.onChildMouseDown(n.hoverKey_,n.hoverChildProps_);},n._onChildMouseEnter=function(e,t){n.dimensionsCache_&&(n.props.onChildMouseEnter&&n.props.onChildMouseEnter(e,t),n.hoverChildProps_=t,n.hoverKey_=e,n.setState({hoverKey:e}));},n._onChildMouseLeave=function(){if(n.dimensionsCache_){var e=n.hoverKey_;null!=e&&(n.props.onChildMouseLeave&&n.props.onChildMouseLeave(e,n.hoverChildProps_),n.hoverKey_=null,n.hoverChildProps_=null,n.setState({hoverKey:null}));}},n._onMouseAllow=function(e){e||n._onChildMouseLeave(),n.allowMouse_=e;},n._onMouseChangeHandler=function(){n.allowMouse_&&n._onMouseChangeHandlerRaf();},n._onMouseChangeHandlerRaf=function(){if(n.dimensionsCache_){var t=n.props.dispatcher.getMousePosition();if(t){var o=[],r=n.props.getHoverDistance();if(react.Children.forEach(n.state.children,function(e,i){if(e&&(void 0!==e.props.latLng||void 0!==e.props.lat||void 0!==e.props.lng)){var s=null!=e.key?e.key:i,a=n.props.distanceToMouse(n.dimensionsCache_[s],t,e.props);a<r&&o.push({key:s,dist:a,props:e.props});}}),o.length){o.sort(function(e,t){return e.dist-t.dist});var i=o[0].key,s=o[0].props;n.hoverKey_!==i&&(n._onChildMouseLeave(),n._onChildMouseEnter(i,s));}else n._onChildMouseLeave();}else n._onChildMouseLeave();}},n._getDimensions=function(e){return n.dimensionsCache_[e]},n.dimensionsCache_={},n.hoverKey_=null,n.hoverChildProps_=null,n.allowMouse_=!0,n.state=a({},n._getState(),{hoverKey:null}),n}p(o,t);var n=o.prototype;return n.componentDidMount=function(){this.props.dispatcher.on("kON_CHANGE",this._onChangeHandler),this.props.dispatcher.on("kON_MOUSE_POSITION_CHANGE",this._onMouseChangeHandler),this.props.dispatcher.on("kON_CLICK",this._onChildClick),this.props.dispatcher.on("kON_MDOWN",this._onChildMouseDown);},n.shouldComponentUpdate=function(e,t){return !0===this.props.experimental?!_(this.props,e)||!_(d(this.state,["hoverKey"]),d(t,["hoverKey"])):!_(this.props,e)||!_(this.state,t)},n.componentWillUnmount=function(){this.props.dispatcher.removeListener("kON_CHANGE",this._onChangeHandler),this.props.dispatcher.removeListener("kON_MOUSE_POSITION_CHANGE",this._onMouseChangeHandler),this.props.dispatcher.removeListener("kON_CLICK",this._onChildClick),this.props.dispatcher.removeListener("kON_MDOWN",this._onChildMouseDown),this.dimensionsCache_=null;},n.render=function(){var t=this,o=this.props.style||f;this.dimensionsCache_={};var n=react.Children.map(this.state.children,function(o,n){if(o){if(void 0===o.props.latLng&&void 0===o.props.lat&&void 0===o.props.lng)return react.cloneElement(o,{$geoService:t.props.geoService,$onMouseAllow:t._onMouseAllow,$prerender:t.props.prerender});var r=void 0!==o.props.latLng?o.props.latLng:{lat:o.props.lat,lng:o.props.lng},i=t.props.insideMapPanes?t.props.geoService.fromLatLngToDivPixel(r):t.props.geoService.fromLatLngToCenterPixel(r),s={left:i.x,top:i.y};if(void 0!==o.props.seLatLng||void 0!==o.props.seLat&&void 0!==o.props.seLng){var p=void 0!==o.props.seLatLng?o.props.seLatLng:{lat:o.props.seLat,lng:o.props.seLng},l=t.props.insideMapPanes?t.props.geoService.fromLatLngToDivPixel(p):t.props.geoService.fromLatLngToCenterPixel(p);s.width=l.x-i.x,s.height=l.y-i.y;}var u=t.props.geoService.fromLatLngToContainerPixel(r),h=null!=o.key?o.key:n;return t.dimensionsCache_[h]=a({x:u.x,y:u.y},r),react.createElement("div",{key:h,style:a({},v,s),className:o.props.$markerHolderClassName},react.cloneElement(o,{$hover:h===t.state.hoverKey,$getDimensions:t._getDimensions,$dimensionKey:h,$geoService:t.props.geoService,$onMouseAllow:t._onMouseAllow,$prerender:t.props.prerender}))}});return react.createElement("div",{style:o},n)},o}(react.Component);M.propTypes={geoService:propTypes.any,style:propTypes.any,distanceToMouse:propTypes.func,dispatcher:propTypes.any,onChildClick:propTypes.func,onChildMouseDown:propTypes.func,onChildMouseLeave:propTypes.func,onChildMouseEnter:propTypes.func,getHoverDistance:propTypes.func,insideMapPanes:propTypes.bool,prerender:propTypes.bool},M.defaultProps={insideMapPanes:!1,prerender:!1};var y={width:"50%",height:"50%",left:"50%",top:"50%",margin:0,padding:0,position:"absolute"};function C(t){return react.createElement("div",{style:y},react.createElement(M,a({},t,{prerender:!0})))}var w,L,b,D=new Promise(function(e){b=e;}),z=function(e,t){if(!e)return D;if(L)return L;e.libraries||(e.libraries=[]);var o=[].concat(e.libraries);if(t&&(0!==o.length&&o.includes("visualization")||o.push("visualization"),console.warn("heatmapLibrary will be deprecated in the future. Please use { libraries: ['visualization'] } in bootstrapURLKeys property instead")),"production"!=="production");if("undefined"==typeof window)throw new Error("google map cannot be loaded outside browser env");var r=e.key,s=function(e,t){if(null==e)return {};var o,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)t.indexOf(o=i[n])>=0||(r[o]=e[o]);return r}(e,["key"]);return w||(w=new Loader(a({apiKey:r||""},s,{libraries:o}))),L=w.load().then(function(){return b(window.google.maps),window.google.maps}),b(L),L};function k(e,t,o){var n=o-t;return e===o?e:((e-t)%n+n)%n+t}var O=function(){function e(e,t){if(isNaN(e)||isNaN(t))throw new Error("Invalid LatLng object: ("+e+", "+t+")");this.lat=+e,this.lng=+t;}return e.prototype.wrap=function(){return new e(this.lat,k(this.lng,-180,180))},e}();O.convert=function(e){return e instanceof O?e:Array.isArray(e)?new O(e[0],e[1]):"lng"in e&&"lat"in e?new O(e.lat,e.lng):e};var x=function(){function e(e,t,o){this.tileSize=e||512,this._minZoom=t||0,this._maxZoom=o||52,this.latRange=[-85.05113,85.05113],this.width=0,this.height=0,this.zoom=0,this.center=new O(0,0),this.angle=0;}var t,o=e.prototype;return o.zoomScale=function(e){return Math.pow(2,e)},o.scaleZoom=function(e){return Math.log(e)/Math.LN2},o.project=function(e,t){return new pointGeometry(this.lngX(e.lng,t),this.latY(e.lat,t))},o.unproject=function(e,t){return new O(this.yLat(e.y,t),this.xLng(e.x,t))},o.lngX=function(e,t){return (180+e)*(t||this.worldSize)/360},o.latY=function(e,t){return (180-180/Math.PI*Math.log(Math.tan(Math.PI/4+e*Math.PI/360)))*(t||this.worldSize)/360},o.xLng=function(e,t){return 360*e/(t||this.worldSize)-180},o.yLat=function(e,t){return 360/Math.PI*Math.atan(Math.exp((180-360*e/(t||this.worldSize))*Math.PI/180))-90},o.locationPoint=function(e){var t=this.project(e);return this.centerPoint._sub(this.point._sub(t)._rotate(this.angle))},o.pointLocation=function(e){var t=this.centerPoint._sub(e)._rotate(-this.angle);return this.unproject(this.point.sub(t))},(t=[{key:"minZoom",get:function(){return this._minZoom},set:function(e){this._minZoom=e,this.zoom=Math.max(this.zoom,e);}},{key:"maxZoom",get:function(){return this._maxZoom},set:function(e){this._maxZoom=e,this.zoom=Math.min(this.zoom,e);}},{key:"worldSize",get:function(){return this.tileSize*this.scale}},{key:"centerPoint",get:function(){return new pointGeometry(0,0)}},{key:"size",get:function(){return new pointGeometry(this.width,this.height)}},{key:"bearing",get:function(){return -this.angle/Math.PI*180},set:function(e){this.angle=-k(e,-180,180)*Math.PI/180;}},{key:"zoom",get:function(){return this._zoom},set:function(e){var t=Math.min(Math.max(e,this.minZoom),this.maxZoom);this._zoom=t,this.scale=this.zoomScale(t),this.tileZoom=Math.floor(t),this.zoomFraction=t-this.tileZoom;}},{key:"x",get:function(){return this.lngX(this.center.lng)}},{key:"y",get:function(){return this.latY(this.center.lat)}},{key:"point",get:function(){return new pointGeometry(this.x,this.y)}}])&&function(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n);}}(e.prototype,t),e}(),T=function(){function e(e){this.hasSize_=!1,this.hasView_=!1,this.transform_=new x(e||512);}var t=e.prototype;return t.setView=function(e,t,o){this.transform_.center=O.convert(e),this.transform_.zoom=+t,this.transform_.bearing=+o,this.hasView_=!0;},t.setViewSize=function(e,t){this.transform_.width=e,this.transform_.height=t,this.hasSize_=!0;},t.setMapCanvasProjection=function(e,t){this.maps_=e,this.mapCanvasProjection_=t;},t.canProject=function(){return this.hasSize_&&this.hasView_},t.hasSize=function(){return this.hasSize_},t.fromLatLngToCenterPixel=function(e){return this.transform_.locationPoint(O.convert(e))},t.fromLatLngToDivPixel=function(e){if(this.mapCanvasProjection_){var t=new this.maps_.LatLng(e.lat,e.lng);return this.mapCanvasProjection_.fromLatLngToDivPixel(t)}return this.fromLatLngToCenterPixel(e)},t.fromLatLngToContainerPixel=function(e){if(this.mapCanvasProjection_){var t=new this.maps_.LatLng(e.lat,e.lng);return this.mapCanvasProjection_.fromLatLngToContainerPixel(t)}var o=this.fromLatLngToCenterPixel(e);return o.x-=this.transform_.worldSize*Math.round(o.x/this.transform_.worldSize),o.x+=this.transform_.width/2,o.y+=this.transform_.height/2,o},t.fromContainerPixelToLatLng=function(e){if(this.mapCanvasProjection_){var t=this.mapCanvasProjection_.fromContainerPixelToLatLng(e);return {lat:t.lat(),lng:t.lng()}}var o=a({},e);o.x-=this.transform_.width/2,o.y-=this.transform_.height/2;var n=this.transform_.pointLocation(pointGeometry.convert(o));return n.lng-=360*Math.round(n.lng/360),n},t.getWidth=function(){return this.transform_.width},t.getHeight=function(){return this.transform_.height},t.getZoom=function(){return this.transform_.zoom},t.getCenter=function(){return this.transform_.pointLocation({x:0,y:0})},t.getBounds=function(e,t){var o=e&&e[0]||0,n=e&&e[1]||0,r=e&&e[2]||0,i=e&&e[3]||0;if(this.getWidth()-n-i>0&&this.getHeight()-o-r>0){var a=this.transform_.pointLocation(pointGeometry.convert({x:i-this.getWidth()/2,y:o-this.getHeight()/2})),p=this.transform_.pointLocation(pointGeometry.convert({x:this.getWidth()/2-n,y:this.getHeight()/2-r})),l=[a.lat,a.lng,p.lat,p.lng,p.lat,a.lng,a.lat,p.lng];return t&&(l=l.map(function(e){return Math.round(e*t)/t})),l}return [0,0,0,0]},e}();function S(e){if(window.requestAnimationFrame)return window.requestAnimationFrame(e);var t=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;return t?t(e):window.setTimeout(e,1e3/60)}var E=Math.log2?Math.log2:function(e){return Math.log(e)/Math.LN2};function P(e,t){return Object.keys(e).reduce(function(o,n){return t(e[n])&&(o[n]=e[n]),o},{})}var A=function(e){if(null!==e&&"object"==typeof e){if(0===Object.keys(e).length)return !0}else if(null==e||""===e)return !0;return !1},I=Object.prototype.toString;function N(e){return "number"==typeof e||function(e){return !!e&&"object"==typeof e}(e)&&"[object Number]"===I.call(e)}var Z=null;function j(){if(Z)return Z;if("undefined"!=typeof navigator){var e=navigator.userAgent.indexOf("MSIE")>-1,t=navigator.userAgent.indexOf("Firefox")>-1,o=navigator.userAgent.toLowerCase().indexOf("op")>-1,n=navigator.userAgent.indexOf("Chrome")>-1,r=navigator.userAgent.indexOf("Safari")>-1;return n&&r&&(r=!1),n&&o&&(n=!1),Z={isExplorer:e,isFirefox:t,isOpera:o,isChrome:n,isSafari:r}}return Z={isChrome:!0,isExplorer:!1,isFirefox:!1,isOpera:!1,isSafari:!1}}var U=function(e){return Function.prototype.toString.call(e)};function H(e){if(!e||"object"!=typeof e)return !1;var t="function"==typeof e.constructor?Object.getPrototypeOf(e):Object.prototype;if(null===t)return !0;var o=t.constructor;return "function"==typeof o&&o instanceof o&&U(o)===U(Object)}function K(e,t,o,n){e.addEventListener(t,o,function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0;}});window.addEventListener("test",t,t),window.removeEventListener("test",t,t);}catch(t){e=!1;}return e}()?{capture:n,passive:!0}:n);}var R,G=!("undefined"==typeof window||!window.document||!window.document.createElement);R=G?window:"undefined"!=typeof self?self:void 0;var B,W="undefined"!=typeof document&&document.attachEvent,V=!1;if(G&&!W){var F=function(){var e=R.requestAnimationFrame||R.mozRequestAnimationFrame||R.webkitRequestAnimationFrame||function(e){return R.setTimeout(e,20)};return function(t){return e(t)}}(),$=(B=R.cancelAnimationFrame||R.mozCancelAnimationFrame||R.webkitCancelAnimationFrame||R.clearTimeout,function(e){return B(e)}),q=function(e){var t=e.__resizeTriggers__,o=t.firstElementChild,n=t.lastElementChild,r=o.firstElementChild;n.scrollLeft=n.scrollWidth,n.scrollTop=n.scrollHeight,r.style.width=o.offsetWidth+1+"px",r.style.height=o.offsetHeight+1+"px",o.scrollLeft=o.scrollWidth,o.scrollTop=o.scrollHeight;},Y=function(e){var t=this;q(this),this.__resizeRAF__&&$(this.__resizeRAF__),this.__resizeRAF__=F(function(){(function(e){return e.offsetWidth!=e.__resizeLast__.width||e.offsetHeight!=e.__resizeLast__.height})(t)&&(t.__resizeLast__.width=t.offsetWidth,t.__resizeLast__.height=t.offsetHeight,t.__resizeListeners__.forEach(function(o){o.call(t,e);}));});},X=!1,J="",Q="animationstart",ee="Webkit Moz O ms".split(" "),te="webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" ");if(G){var oe=document.createElement("fakeelement");if(void 0!==oe.style.animationName&&(X=!0),!1===X)for(var ne=0;ne<ee.length;ne++)if(void 0!==oe.style[ee[ne]+"AnimationName"]){J="-"+ee[ne].toLowerCase()+"-",Q=te[ne],X=!0;break}}var re="resizeanim",ie="@"+J+"keyframes "+re+" { from { opacity: 0; } to { opacity: 0; } } ",se=J+"animation: 1ms "+re+"; ";}var ae=void 0!==reactDom.createPortal,pe=ae?reactDom.createPortal:reactDom.unstable_renderSubtreeIntoContainer,le=function(e){return H(e)?e:{lat:e[0],lng:e[1]}},ue=function(e,t){return t<e?e:t},he=function(t){function o(o){var r;if((r=t.call(this,o)||this)._getMinZoom=function(){if(r.geoService_.getWidth()>0||r.geoService_.getHeight()>0){var e=Math.ceil(r.geoService_.getWidth()/256)+2,t=Math.ceil(r.geoService_.getHeight()/256)+2,o=Math.max(e,t);return Math.ceil(E(o))}return 3},r._computeMinZoom=function(e){return A(e)?r._getMinZoom():e},r._mapDomResizeCallback=function(){if(r.resetSizeOnIdle_=!0,r.maps_){var e=r.props.center||r.props.defaultCenter,t=r.map_.getCenter();r.maps_.event.trigger(r.map_,"resize"),r.map_.setCenter(r.props.resetBoundsOnResize?e:t);}},r._setLayers=function(e){e.forEach(function(e){r.layers_[e]=new r.maps_[e],r.layers_[e].setMap(r.map_);});},r._renderPortal=function(){return react.createElement(M,{experimental:r.props.experimental,onChildClick:r._onChildClick,onChildMouseDown:r._onChildMouseDown,onChildMouseEnter:r._onChildMouseEnter,onChildMouseLeave:r._onChildMouseLeave,geoService:r.geoService_,insideMapPanes:!0,distanceToMouse:r.props.distanceToMouse,getHoverDistance:r._getHoverDistance,dispatcher:r.markersDispatcher_})},r._initMap=function(){if(!r.initialized_){r.initialized_=!0;var e=le(r.props.center||r.props.defaultCenter);r.geoService_.setView(e,r.props.zoom||r.props.defaultZoom,0),r._onBoundsChanged();var t=a({},r.props.apiKey&&{key:r.props.apiKey},r.props.bootstrapURLKeys);r.props.googleMapLoader(t,r.props.heatmapLibrary).then(function(e){if(r.mounted_){var t,o,i=r.geoService_.getCenter(),s={zoom:r.props.zoom||r.props.defaultZoom,center:new e.LatLng(i.lat,i.lng)};r.props.heatmap.positions&&(Object.assign(l(r),{heatmap:(t=e,o=r.props.heatmap,new t.visualization.HeatmapLayer({data:o.positions.reduce(function(e,o){var n=o.weight,r=void 0===n?1:n;return e.push({location:new t.LatLng(o.lat,o.lng),weight:r}),e},[])}))}),function(e,t){var o=t.options,n=void 0===o?{}:o;Object.keys(n).map(function(t){return e.set(t,n[t])});}(r.heatmap,r.props.heatmap));var p=P(e,H),u="function"==typeof r.props.options?r.props.options(p):r.props.options,h=!A(r.props.draggable)&&{draggable:r.props.draggable},c=r._computeMinZoom(u.minZoom);r.minZoom_=c;var d=a({},{overviewMapControl:!1,streetViewControl:!1,rotateControl:!0,mapTypeControl:!1,styles:[{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]}],minZoom:3},{minZoom:c},u,s);r.defaultDraggableOption_=A(d.draggable)?r.defaultDraggableOption_:d.draggable;var m=a({},d,h);m.minZoom=ue(m.minZoom,c);var g=new e.Map(reactDom.findDOMNode(r.googleMapDom_),m);r.map_=g,r.maps_=e,r._setLayers(r.props.layerTypes);var _=e.version.match(/^3\.(\d+)\./),f=_&&Number(_[1]),v=l(r),M=Object.assign(new e.OverlayView,{onAdd:function(){var t="undefined"!=typeof screen?screen.width+"px":"2000px",o="undefined"!=typeof screen?screen.height+"px":"2000px",n=document.createElement("div");if(n.style.backgroundColor="transparent",n.style.position="absolute",n.style.left="0px",n.style.top="0px",n.style.width=t,n.style.height=o,v.props.overlayViewDivStyle){var r=v.props.overlayViewDivStyle;"object"==typeof r&&Object.keys(r).forEach(function(e){n.style[e]=r[e];});}this.getPanes().overlayMouseTarget.appendChild(n),v.geoService_.setMapCanvasProjection(e,M.getProjection()),ae?v.setState({overlay:n}):pe(v,v._renderPortal(),n,function(){return v.setState({overlay:n})});},onRemove:function(){var e=v.state.overlay;e&&!ae&&reactDom.unmountComponentAtNode(e),v.setState({overlay:null});},draw:function(){if(v.updateCounter_++,v._onBoundsChanged(g,e,!v.props.debounced),v.googleApiLoadedCalled_||(v._onGoogleApiLoaded({map:g,maps:e,ref:v.googleMapDom_}),v.googleApiLoadedCalled_=!0),v.mouse_){var t=v.geoService_.fromContainerPixelToLatLng(v.mouse_);v.mouse_.lat=t.lat,v.mouse_.lng=t.lng;}v._onChildMouseMove(),v.markersDispatcher_&&(v.markersDispatcher_.emit("kON_CHANGE"),v.fireMouseEventOnIdle_&&v.markersDispatcher_.emit("kON_MOUSE_POSITION_CHANGE"));}});r.overlay_=M,M.setMap(g),r.props.heatmap.positions&&r.heatmap.setMap(g),r.props.onTilesLoaded&&e.event.addListener(g,"tilesloaded",function(){v._onTilesLoaded();}),e.event.addListener(g,"zoom_changed",function(){v.geoService_.getZoom()!==g.getZoom()&&(v.zoomAnimationInProgress_||(v.zoomAnimationInProgress_=!0,v._onZoomAnimationStart(g.zoom)),f<32)&&((new Date).getTime()-r.zoomControlClickTime_<300?S(function(){return S(function(){v.updateCounter_++,v._onBoundsChanged(g,e);})}):(v.updateCounter_++,v._onBoundsChanged(g,e)));}),e.event.addListener(g,"idle",function(){if(r.resetSizeOnIdle_){r._setViewSize();var t=r._computeMinZoom(u.minZoom);t!==r.minZoom_&&(r.minZoom_=t,g.setOptions({minZoom:t})),r.resetSizeOnIdle_=!1;}v.zoomAnimationInProgress_&&(v.zoomAnimationInProgress_=!1,v._onZoomAnimationEnd(g.zoom)),v.updateCounter_++,v._onBoundsChanged(g,e),v.dragTime_=0,v.markersDispatcher_&&v.markersDispatcher_.emit("kON_CHANGE");}),e.event.addListener(g,"mouseover",function(){v.mouseInMap_=!0;}),e.event.addListener(g,"click",function(){v.mouseInMap_=!0;}),e.event.addListener(g,"mouseout",function(){v.mouseInMap_=!1,v.mouse_=null,v.markersDispatcher_.emit("kON_MOUSE_POSITION_CHANGE");}),e.event.addListener(g,"drag",function(){v.dragTime_=(new Date).getTime(),v._onDrag(g);}),e.event.addListener(g,"dragend",function(){var t=e.event.addListener(g,"idle",function(){e.event.removeListener(t),v._onDragEnd(g);});}),e.event.addListener(g,"maptypeid_changed",function(){v._onMapTypeIdChange(g.getMapTypeId());});}}).catch(function(e){throw r._onGoogleApiLoaded({map:null,maps:null,ref:r.googleMapDom_}),console.error(e),e});}},r._onGoogleApiLoaded=function(){var e;r.props.onGoogleApiLoaded&&((e=r.props).onGoogleApiLoaded.apply(e,arguments));},r._getHoverDistance=function(){return r.props.hoverDistance},r._onDrag=function(){var e;return r.props.onDrag&&(e=r.props).onDrag.apply(e,arguments)},r._onDragEnd=function(){var e;return r.props.onDragEnd&&(e=r.props).onDragEnd.apply(e,arguments)},r._onMapTypeIdChange=function(){var e;return r.props.onMapTypeIdChange&&(e=r.props).onMapTypeIdChange.apply(e,arguments)},r._onZoomAnimationStart=function(){var e;return r.props.onZoomAnimationStart&&(e=r.props).onZoomAnimationStart.apply(e,arguments)},r._onZoomAnimationEnd=function(){var e;return r.props.onZoomAnimationEnd&&(e=r.props).onZoomAnimationEnd.apply(e,arguments)},r._onTilesLoaded=function(){return r.props.onTilesLoaded&&r.props.onTilesLoaded()},r._onChildClick=function(){var e;if(r.props.onChildClick)return (e=r.props).onChildClick.apply(e,arguments)},r._onChildMouseDown=function(e,t){r.childMouseDownArgs_=[e,t],r.props.onChildMouseDown&&r.props.onChildMouseDown(e,t,a({},r.mouse_));},r._onChildMouseUp=function(){var e;r.childMouseDownArgs_&&(r.props.onChildMouseUp&&(e=r.props).onChildMouseUp.apply(e,r.childMouseDownArgs_.concat([a({},r.mouse_)])),r.childMouseDownArgs_=null,r.childMouseUpTime_=(new Date).getTime());},r._onChildMouseMove=function(){var e;r.childMouseDownArgs_&&r.props.onChildMouseMove&&(e=r.props).onChildMouseMove.apply(e,r.childMouseDownArgs_.concat([a({},r.mouse_)]));},r._onChildMouseEnter=function(){var e;if(r.props.onChildMouseEnter)return (e=r.props).onChildMouseEnter.apply(e,arguments)},r._onChildMouseLeave=function(){var e;if(r.props.onChildMouseLeave)return (e=r.props).onChildMouseLeave.apply(e,arguments)},r._setViewSize=function(){if(r.mounted_){if(document.fullscreen||document.webkitIsFullScreen||document.mozFullScreen||document.msFullscreenElement)r.geoService_.setViewSize(window.innerWidth,window.innerHeight);else {var e=reactDom.findDOMNode(r.googleMapDom_);r.geoService_.setViewSize(e.clientWidth,e.clientHeight);}r._onBoundsChanged();}},r._onWindowResize=function(){r.resetSizeOnIdle_=!0;},r._onMapMouseMove=function(e){if(r.mouseInMap_){var t=(new Date).getTime();t-r.mouseMoveTime_>50&&(r.boundingRect_=e.currentTarget.getBoundingClientRect()),r.mouseMoveTime_=t;var o=e.clientX-r.boundingRect_.left,n=e.clientY-r.boundingRect_.top;r.mouse_||(r.mouse_={x:0,y:0,lat:0,lng:0}),r.mouse_.x=o,r.mouse_.y=n;var i=r.geoService_.fromContainerPixelToLatLng(r.mouse_);r.mouse_.lat=i.lat,r.mouse_.lng=i.lng,r._onChildMouseMove(),t-r.dragTime_<100?r.fireMouseEventOnIdle_=!0:(r.markersDispatcher_.emit("kON_MOUSE_POSITION_CHANGE"),r.fireMouseEventOnIdle_=!1);}},r._onClick=function(){var e;return r.props.onClick&&!r.childMouseDownArgs_&&(new Date).getTime()-r.childMouseUpTime_>300&&0===r.dragTime_&&(e=r.props).onClick.apply(e,arguments)},r._onMapClick=function(e){r.markersDispatcher_&&(r._onMapMouseMove(e),(new Date).getTime()-r.dragTime_>100&&(r.mouse_&&r._onClick(a({},r.mouse_,{event:e})),r.markersDispatcher_.emit("kON_CLICK",e)));},r._onMapMouseDownNative=function(e){r.mouseInMap_&&r._onMapMouseDown(e);},r._onMapMouseDown=function(e){r.markersDispatcher_&&(new Date).getTime()-r.dragTime_>100&&(r._onMapMouseMove(e),r.markersDispatcher_.emit("kON_MDOWN",e));},r._onMapMouseDownCapture=function(){j().isChrome&&(r.zoomControlClickTime_=(new Date).getTime());},r._onKeyDownCapture=function(){j().isChrome&&(r.zoomControlClickTime_=(new Date).getTime());},r._isCenterDefined=function(e){return e&&(H(e)&&N(e.lat)&&N(e.lng)||2===e.length&&N(e[0])&&N(e[1]))},r._onBoundsChanged=function(e,t,o){if(e){var n=e.getCenter();r.geoService_.setView([n.lat(),n.lng()],e.getZoom(),0);}if((r.props.onChange||r.props.onBoundsChange)&&r.geoService_.canProject()){var i=r.geoService_.getZoom(),s=r.geoService_.getBounds(),p=r.geoService_.getCenter();if(!function(e,t,o){if(e&&t){for(var n=0;n!==e.length;++n)if(Math.abs(e[n]-t[n])>1e-5)return !1;return !0}return !1}(s,r.prevBounds_)&&!1!==o){var l=r.geoService_.getBounds(r.props.margin);r.props.onBoundsChange&&r.props.onBoundsChange(r.centerIsObject_?a({},p):[p.lat,p.lng],i,s,l),r.props.onChange&&r.props.onChange({center:a({},p),zoom:i,bounds:{nw:{lat:s[0],lng:s[1]},se:{lat:s[2],lng:s[3]},sw:{lat:s[4],lng:s[5]},ne:{lat:s[6],lng:s[7]}},marginBounds:{nw:{lat:l[0],lng:l[1]},se:{lat:l[2],lng:l[3]},sw:{lat:l[4],lng:l[5]},ne:{lat:l[6],lng:l[7]}},size:r.geoService_.hasSize()?{width:r.geoService_.getWidth(),height:r.geoService_.getHeight()}:{width:0,height:0}}),r.prevBounds_=s;}}},r._registerChild=function(e){r.googleMapDom_=e;},r.mounted_=!1,r.initialized_=!1,r.googleApiLoadedCalled_=!1,r.map_=null,r.maps_=null,r.prevBounds_=null,r.heatmap=null,r.layers_={},r.mouse_=null,r.mouseMoveTime_=0,r.boundingRect_=null,r.mouseInMap_=!0,r.dragTime_=0,r.fireMouseEventOnIdle_=!1,r.updateCounter_=0,r.markersDispatcher_=new c(l(r)),r.geoService_=new T(256),r.centerIsObject_=H(r.props.center),r.minZoom_=3,r.defaultDraggableOption_=!0,r.zoomControlClickTime_=0,r.childMouseDownArgs_=null,r.childMouseUpTime_=0,r.googleMapDom_=null,r._isCenterDefined(r.props.center||r.props.defaultCenter)){var i=le(r.props.center||r.props.defaultCenter);r.geoService_.setView(i,r.props.zoom||r.props.defaultZoom,0);}return r.zoomAnimationInProgress_=!1,r.state={overlay:null},r}p(o,t);var r=o.prototype;return r.componentDidMount=function(){var e=this;this.mounted_=!0,K(window,"resize",this._onWindowResize,!1),K(window,"keydown",this._onKeyDownCapture,!0);var t=reactDom.findDOMNode(this.googleMapDom_);t&&K(t,"mousedown",this._onMapMouseDownNative,!0),K(window,"mouseup",this._onChildMouseUp,!1);var o=a({},this.props.apiKey&&{key:this.props.apiKey},this.props.bootstrapURLKeys);this.props.googleMapLoader(o,this.props.heatmapLibrary),setTimeout(function(){e._setViewSize(),e._isCenterDefined(e.props.center||e.props.defaultCenter)&&e._initMap();},0,this),this.props.resetBoundsOnResize&&function(e,t){if(void 0===e.parentNode){var o=document.createElement("div");e.parentNode=o;}e=e.parentNode,W?e.attachEvent("onresize",t):(e.__resizeTriggers__||("static"==getComputedStyle(e).position&&(e.style.position="relative"),function(){if(!V){var e=(ie||"")+".resize-triggers { "+(se||"")+'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',t=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css",o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e)),t.appendChild(o),V=!0;}}(),e.__resizeLast__={},e.__resizeListeners__=[],(e.__resizeTriggers__=document.createElement("div")).className="resize-triggers",e.__resizeTriggers__.innerHTML='<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>',e.appendChild(e.__resizeTriggers__),q(e),K(e,"scroll",Y,!0),Q&&e.__resizeTriggers__.addEventListener(Q,function(t){t.animationName==re&&q(e);})),e.__resizeListeners__.push(t));}(t,this._mapDomResizeCallback);},r.shouldComponentUpdate=function(e,t){return !_(d(this.props,["draggable"]),d(e,["draggable"]))||!_(this.state,t)},r.componentDidUpdate=function(e){var t=this;if(!this._isCenterDefined(e.center)&&this._isCenterDefined(this.props.center)&&setTimeout(function(){return t._initMap()},0),this.map_){var o=this.geoService_.getCenter();if(this._isCenterDefined(this.props.center)){var n=le(this.props.center),r=this._isCenterDefined(e.center)?le(e.center):null;(!r||Math.abs(n.lat-r.lat)+Math.abs(n.lng-r.lng)>1e-5)&&Math.abs(n.lat-o.lat)+Math.abs(n.lng-o.lng)>1e-5&&this.map_.panTo({lat:n.lat,lng:n.lng});}if(A(this.props.zoom)||Math.abs(this.props.zoom-e.zoom)>0&&this.map_.setZoom(this.props.zoom),!A(e.draggable)&&A(this.props.draggable)?this.map_.setOptions({draggable:this.defaultDraggableOption_}):_(e.draggable,this.props.draggable)||this.map_.setOptions({draggable:this.props.draggable}),!A(this.props.options)&&!_(e.options,this.props.options)){var i=P(this.maps_,H),s="function"==typeof this.props.options?this.props.options(i):this.props.options;if("minZoom"in(s=d(s,["zoom","center","draggable"]))){var a=this._computeMinZoom(s.minZoom);s.minZoom=ue(s.minZoom,a);}this.map_.setOptions(s);}_(this.props.layerTypes,e.layerTypes)||(Object.keys(this.layers_).forEach(function(e){t.layers_[e].setMap(null),delete t.layers_[e];}),this._setLayers(this.props.layerTypes)),this.heatmap&&!_(this.props.heatmap.positions,e.heatmap.positions)&&this.heatmap.setData(this.props.heatmap.positions.map(function(e){return {location:new t.maps_.LatLng(e.lat,e.lng),weight:e.weight}})),this.heatmap&&!_(this.props.heatmap.options,e.heatmap.options)&&Object.keys(this.props.heatmap.options).forEach(function(e){t.heatmap.set(e,t.props.heatmap.options[e]);});}this.markersDispatcher_.emit("kON_CHANGE"),_(this.props.hoverDistance,e.hoverDistance)||this.markersDispatcher_.emit("kON_MOUSE_POSITION_CHANGE");},r.componentWillUnmount=function(){this.mounted_=!1;var e,t,o=reactDom.findDOMNode(this.googleMapDom_);o&&o.removeEventListener("mousedown",this._onMapMouseDownNative,!0),window.removeEventListener("resize",this._onWindowResize),window.removeEventListener("keydown",this._onKeyDownCapture),window.removeEventListener("mouseup",this._onChildMouseUp,!1),this.props.resetBoundsOnResize&&(t=this._mapDomResizeCallback,e=(e=o).parentNode,W?e.detachEvent("onresize",t):(e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(t),1),e.__resizeListeners__.length||(e.removeEventListener("scroll",Y),e.__resizeTriggers__=!e.removeChild(e.__resizeTriggers__)))),this.overlay_&&this.overlay_.setMap(null),this.maps_&&this.map_&&this.props.shouldUnregisterMapOnUnmount&&(this.map_.setOptions({scrollwheel:!1}),this.maps_.event.clearInstanceListeners(this.map_)),this.props.shouldUnregisterMapOnUnmount&&(this.map_=null,this.maps_=null),this.markersDispatcher_.dispose(),this.resetSizeOnIdle_=!1,this.props.shouldUnregisterMapOnUnmount&&(delete this.map_,delete this.markersDispatcher_);},r.render=function(){var t=this.state.overlay,o=t?null:react.createElement(C,{experimental:this.props.experimental,onChildClick:this._onChildClick,onChildMouseDown:this._onChildMouseDown,onChildMouseEnter:this._onChildMouseEnter,onChildMouseLeave:this._onChildMouseLeave,geoService:this.geoService_,insideMapPanes:!1,distanceToMouse:this.props.distanceToMouse,getHoverDistance:this._getHoverDistance,dispatcher:this.markersDispatcher_});return react.createElement("div",{style:this.props.style,onMouseMove:this._onMapMouseMove,onMouseDownCapture:this._onMapMouseDownCapture,onClick:this._onMapClick},react.createElement(h,{registerChild:this._registerChild}),ae&&t&&pe(this._renderPortal(),t),o)},o}(react.Component);he.propTypes={apiKey:propTypes.string,bootstrapURLKeys:propTypes.any,defaultCenter:propTypes.oneOfType([propTypes.array,propTypes.shape({lat:propTypes.number,lng:propTypes.number})]),center:propTypes.oneOfType([propTypes.array,propTypes.shape({lat:propTypes.number,lng:propTypes.number})]),defaultZoom:propTypes.number,zoom:propTypes.number,onBoundsChange:propTypes.func,onChange:propTypes.func,onClick:propTypes.func,onChildClick:propTypes.func,onChildMouseDown:propTypes.func,onChildMouseUp:propTypes.func,onChildMouseMove:propTypes.func,onChildMouseEnter:propTypes.func,onChildMouseLeave:propTypes.func,onZoomAnimationStart:propTypes.func,onZoomAnimationEnd:propTypes.func,onDrag:propTypes.func,onDragEnd:propTypes.func,onMapTypeIdChange:propTypes.func,onTilesLoaded:propTypes.func,options:propTypes.any,distanceToMouse:propTypes.func,hoverDistance:propTypes.number,debounced:propTypes.bool,margin:propTypes.array,googleMapLoader:propTypes.any,onGoogleApiLoaded:propTypes.func,yesIWantToUseGoogleMapApiInternals:propTypes.bool,draggable:propTypes.bool,style:propTypes.any,resetBoundsOnResize:propTypes.bool,layerTypes:propTypes.arrayOf(propTypes.string),shouldUnregisterMapOnUnmount:propTypes.bool},he.defaultProps={distanceToMouse:function(e,t){return Math.sqrt((e.x-t.x)*(e.x-t.x)+(e.y-t.y)*(e.y-t.y))},hoverDistance:30,debounced:!0,options:function(){return {overviewMapControl:!1,streetViewControl:!1,rotateControl:!0,mapTypeControl:!1,styles:[{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]}],minZoom:3}},googleMapLoader:z,yesIWantToUseGoogleMapApiInternals:!1,style:{width:"100%",height:"100%",margin:0,padding:0,position:"relative"},layerTypes:[],heatmap:{},heatmapLibrary:!1,shouldUnregisterMapOnUnmount:!0},he.googleMapLoader=z;

export default he;
