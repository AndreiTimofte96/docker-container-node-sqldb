module.exports = (() => {
  'use strict';

  const squel = require('squel');

  class ApplicationRecord {
    constructor(db, table, table2, onCond) {
      this.db = db;
      this.table = table;

      this.__value = null;

      this.query = squel.select()
        .from(table);
      if (table2 && onCond) {
        this.query = this.query.join(table2, null, onCond);
      }
    }

    update() {
      this.query = squel
        .update()
        .table(this.table);
      return this;
    }

    insert() {
      this.query = squel
        .insert()
        .into(this.table);
      return this;
    }

    delete() {
      this.query = squel
        .delete()
        .from(this.table);
      return this;
    }

    valueOf() {
      if (this.__value) return this.__value;
      console.log(this.query.toString());
      this.__value = this.db.query(this.query.toString() + ';');

      return this.__value;
    }
  }

  ['field', 'where', 'limit', 'order', 'group', 'set'].forEach((fnc) => {
    ApplicationRecord.prototype[fnc] = function (...params) {
      this.query = this.query[fnc](...params);
      return this;
    };
  });

  return ApplicationRecord;
})();
