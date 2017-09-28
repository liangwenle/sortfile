'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
// import fs from "fs";
var root_path = process.argv[2];

var T = function () {
  function T(opt) {
    _classCallCheck(this, T);

    this.root = opt.root || '';
  }

  _createClass(T, [{
    key: 'getAllFiles',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        var root, res, files;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                root = this.root;
                res = [], files = fs.readdirSync(root);

                files.map(function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
                    var pathname, stat;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            pathname = root + '/' + file, stat = fs.lstatSync(pathname);

                            if (!stat.isDirectory()) {
                              res.push(pathname.replace(root_path, '.'));
                            } else {
                              //res = res.concat(await this.getAllFiles(pathname));
                            }

                          case 2:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }());
                return _context2.abrupt('return', res);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAllFiles() {
        return _ref.apply(this, arguments);
      }

      return getAllFiles;
    }()
  }, {
    key: 'mkDir',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dirName) {
        var dir;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                dir = this.root + '/' + dirName;

                fs.mkdirSync(dir);
                return _context3.abrupt('return', dir);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function mkDir(_x2) {
        return _ref3.apply(this, arguments);
      }

      return mkDir;
    }()
  }, {
    key: 'hasDir',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dirName) {
        var stat;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                stat = void 0;
                _context4.prev = 1;

                stat = fs.lstatSync(this.root + '/' + dirName);
                _context4.next = 8;
                break;

              case 5:
                _context4.prev = 5;
                _context4.t0 = _context4['catch'](1);
                return _context4.abrupt('return', false);

              case 8:
                return _context4.abrupt('return', stat.isDirectory());

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 5]]);
      }));

      function hasDir(_x3) {
        return _ref4.apply(this, arguments);
      }

      return hasDir;
    }()
  }, {
    key: 'getDirName',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(stat) {
        var date, year, month, day;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                date = new Date(stat.mtime);
                year = date.getFullYear();
                month = date.getMonth() + 1;
                day = date.getDate();

                month = month.toString().length < 2 ? '0' + month : month;
                day = day.toString().length < 2 ? '0' + day : day;
                return _context5.abrupt('return', '' + year + month + day);

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getDirName(_x4) {
        return _ref5.apply(this, arguments);
      }

      return getDirName;
    }()
  }, {
    key: 'init',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var list, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, stat, dirName, isDir, oldPath, f, newPath;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.getAllFiles();

              case 2:
                list = _context6.sent;


                //遍历
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context6.prev = 6;
                _iterator = list[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context6.next = 29;
                  break;
                }

                item = _step.value;
                stat = fs.statSync(item);
                _context6.next = 13;
                return this.getDirName(stat);

              case 13:
                dirName = _context6.sent;

                console.log(dirName);
                _context6.next = 17;
                return this.hasDir(dirName);

              case 17:
                isDir = _context6.sent;

                if (isDir) {
                  _context6.next = 21;
                  break;
                }

                _context6.next = 21;
                return this.mkDir(dirName);

              case 21:
                oldPath = item;
                f = item.replace(new RegExp(this.root), '');
                newPath = this.root + '/' + dirName + f;

                console.log(oldPath, newPath);
                //剪切
                fs.renameSync(oldPath, newPath);

              case 26:
                _iteratorNormalCompletion = true;
                _context6.next = 8;
                break;

              case 29:
                _context6.next = 35;
                break;

              case 31:
                _context6.prev = 31;
                _context6.t0 = _context6['catch'](6);
                _didIteratorError = true;
                _iteratorError = _context6.t0;

              case 35:
                _context6.prev = 35;
                _context6.prev = 36;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 38:
                _context6.prev = 38;

                if (!_didIteratorError) {
                  _context6.next = 41;
                  break;
                }

                throw _iteratorError;

              case 41:
                return _context6.finish(38);

              case 42:
                return _context6.finish(35);

              case 43:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[6, 31, 35, 43], [36,, 38, 42]]);
      }));

      function init() {
        return _ref6.apply(this, arguments);
      }

      return init;
    }()
  }]);

  return T;
}();

module.exports = T;

// let t = new T();
// t.init();