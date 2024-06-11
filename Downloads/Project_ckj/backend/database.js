import mysql from "mysql2"

export const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project_ckj",
  });

  //  LEFT JOIN data_barang ON pemasukan.Barang = data_barang.Id_Barang LEFT JOIN data_pelanggan ON pemasukan.Nama_Pelanggan = data_pelanggan.Id_Pelanggan
  
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
    transaksiPemasukan : "INSERT INTO pemasukan ( Nominal_Bayar, Uang_Kembalian, Nama_Pelanggan, Barang, Tanggal_Pemasukan, Total_Pemasukan,Diskon, Pajak,  kuantitas, Harga_Satuan, Satuan ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    transaksiPengeluaran : "INSERT INTO pengeluaran ( Nominal_Bayar_Pengeluaran, Barang, Tanggal_Pengeluaran, Uraian, Kuantitas, Nama, Harga_Satuan) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
    rekap_pemasukan :  'SELECT * FROM pemasukan',
    rekap_pengeluaran : "SELECT * FROM pengeluaran",
    Dompet : " SELECT * FROM dana",
    DanaPemasukan : "UPDATE dana SET Pemasukan = ?, Saldo = ? WHERE id_dana = 1",
    DanaPengeluaran : "UPDATE dana SET Pengeluaran = ?, Saldo = ? WHERE id_dana = 1",
    UpdateDataBarang:
      "UPDATE data_barang SET Nama_Barang = ?, Harga_Barang = ?, Stok_Barang = ?, Kode_Barang = ? WHERE Id_Barang = ?",
      DeleteProduk : "DELETE FROM data_barang WHERE Id_Barang = ?",
      UpdateDataLayanan:
      "UPDATE data_layanan SET Nama_Layanan = ?, Harga_Layanan = ?, Stok_Layanan = ?, Kode_Layanan = ? WHERE Id_Layanan = ?",
      DeleteLayanan : "DELETE FROM data_layanan WHERE Id_Layanan = ?",
      UpdateDataPelanggan:
      "UPDATE data_pelanggan SET Nama_Pelanggan = ?, Nomer_Telepon = ?, Alamat_Pelanggan = ? WHERE Id_Pelanggan = ?",
      DeletePelanggan : "DELETE FROM data_pelanggan WHERE Id_Pelanggan = ?",
      DeletePemasukan : "DELETE FROM pemasukan WHERE id_pemasukan = ?",
      DeletePengeluaran : "DELETE FROM pengeluaran WHERE Id_Pengeluaran = ?",
  };