"use strict";

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const express = require('express');
const write = require('./write');
const getFullURL = require('./get-full-url');
const delay = require('./delay');
module.exports = (db, name, opts) => {
  const router = express.Router();
  router.use(delay);
  function show(req, res, next) {
    res.locals.data = db.get(name).value();
    next();
  }
  function create(req, res, next) {
    if (opts._isFake) {
      res.locals.data = req.body;
    } else {
      db.set(name, req.body).value();
      res.locals.data = db.get(name).value();
    }
    res.setHeader('Access-Control-Expose-Headers', 'Location');
    res.location(`${getFullURL(req)}`);
    res.status(201);
    next();
  }
  function update(req, res, next) {
    if (opts._isFake) {
      if (req.method === 'PUT') {
        res.locals.data = req.body;
      } else {
        const resource = db.get(name).value();
        res.locals.data = _objectSpread(_objectSpread({}, resource), req.body);
      }
    } else {
      if (req.method === 'PUT') {
        db.set(name, req.body).value();
      } else {
        db.get(name).assign(req.body).value();
      }
      res.locals.data = db.get(name).value();
    }
    next();
  }
  const w = write(db);
  router.route('/').get(show).post(create, w).put(update, w).patch(update, w);
  return router;
};