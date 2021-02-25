const pool = require('../utils/pool');

module.exports = class UploadFile {

  id;
  name;
  size;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.size = row.size;
    this.type = row.type;
  }

  static async insert({ name, size, type }) {
    const { rows } = await pool.query(
      'INSERT INTO uploads (name, size, type) VALUES ($1, $2, $3) RETURNING *',
      [name, size, type]
    );
    return new UploadFile(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM uploads'
    );
    return rows.map(rows => new UploadFile(rows));
  }
};
