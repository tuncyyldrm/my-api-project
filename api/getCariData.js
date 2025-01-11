const sql = require('mssql');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export default async function handler(req, res) {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query(`
      SELECT 
        CARI_KOD,
        ISNULL(DBO.TRK(CARI_ISIM), '') AS CARI_ISIM,
        ISNULL(DBO.TRK(CARI_ADRES), '') AS CARI_ADRES
      FROM TBLCASABIT
    `);

    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
