import mysql from "mysql2"

export const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project_ckj",
  });
  
export const getData = {
    user: "SELECT * FROM user_account  WHERE username = ? AND password = ?",
    inputDataBarang:
      "INSERT INTO data_barang ( Nama_Barang, Harga_Barang, Stok_Barang, Poto_Barang, Kode_Barang ) VALUES ( ?, ?, ?, ?, ?)",
    inputDataLayanan:
      "INSERT INTO data_layanan ( Nama_Layanan, Harga_Layanan, Stok_Layanan, Poto_Layanan, Kode_Layanan ) VALUES ( ?, ?, ?, ?, ?)",
    inputDataPelanggan:
      "INSERT INTO data_pelanggan ( Nama_Pelanggan, Nomer_Telepon, Alamat_Pelanggan ) VALUES ( ?, ?, ?)",
    data_barang: "SELECT * FROM data_barang",
    data_layanan : "SELECT * FROM data_layanan",
    data_pelanggan : "SELECT * FROM data_pelanggan",
    transaksiPemasukan : "INSERT INTO pemasukan ( Nominal_Bayar, Uang_Kembalian, Nama_Pelanggan, Barang, Tanggal_Pemasukan, Total_Pemasukan,Diskon, Pajak,  kuantitas ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    transaksiPengeluaran : "INSERT INTO pengeluaran ( Nominal_Bayar_Pengeluaran, Barang, Tanggal_Pengeluaran, Uraian, Kuantitas, Nama) VALUES ( ?, ?, ?, ?, ?, ?)",
    rekap_pemasukan :  'SELECT * FROM pemasukan',
    rekap_pengeluaran : "SELECT * FROM pengeluaran",
    Dompet : " SELECT * FROM dana",
    DanaPemasukan : "UPDATE dana SET Pemasukan = ?, Saldo = ? WHERE id_dana = 1"

  };