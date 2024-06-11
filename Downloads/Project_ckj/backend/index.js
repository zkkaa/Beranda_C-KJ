import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fs from "fs/promises";
import fastifyFormbody from "@fastify/formbody";
import path from "path";
import url from "url";
import multipart from "@fastify/multipart";
import { DateTime } from "luxon";
import fastifyStatic from "@fastify/static";
import { getData } from "./database.js";
import { database } from "./database.js";



    const dates = DateTime.now().toFormat("yyyy-MMMM-dd");
    
    console.log(dates)

const app = fastify({
  logger: true,
});
app.register(fastifyFormbody);
app.register(fastifyCors),
  {
    origin: "https://bersaku.my.id",
    methods: ["GET", "POST"],
  };

app.register(multipart, {attachFieldsToBody: true });
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.register((fastifyStatic), {
  root: path.join(__dirname, 'Public'),
  prefix: '/public/',
})

app.listen({host:"0.0.0.0", port: 3000 }, function (err, address) {
  if (err) {
    app.log.error(err);
  }
  console.log("server running on port" + address);
});


app.post("/login", (req, res) => {
  try {
    database.query(
      getData.user,
      [req.body.username, req.body.password],
      (err, data) => {
        if (err) return res.send({ error: "error" });
        if (data.length > 0) {
          return res.send({ record: "login succesfully" });
        } else {
          return res.send({ record: "login failed" });
        }
      }
    );
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

app.post("/Data/data_barang/Input_data_barang", async (req, res) => {
  try {
    const file = await req.body.file;
    const Nama = await req.body.NamaBarang.value;
    const Harga = await req.body.HargaBarang.value;
    const Stok = await req.body.StokBarang.value;
    const Kode = await req.body.KodeBarang.value;
    const time = DateTime.now().toFormat("HHmmssddMMyyyy");
    const NamaFile = `${time}.jpg`;
    console.log("Nama :" , Nama)
    console.log("Harga :" , Harga)
    console.log("Stok :" , Stok)
    console.log("Kode :" , Kode)
        console.log("Halo :" , file)
        const gambar = await file.toBuffer();
        console.log("tugas :", gambar)
        const FileUrl = `${__dirname}/Public/${NamaFile}`;
        const result = await new Promise((resolve, reject) => {
          database.query(
            "SELECT * FROM data_barang WHERE Nama_Barang = ?",
            [Nama],
            (err, result) => {
              if (err) reject(err);
              resolve(result);
            }
          );
        });
    
        if (result.length > 0) {
          res.send({ status: "Data Barang Sudah Ada" });
        } else {
          await fs.writeFile(FileUrl, gambar)
          await new Promise((resolve, reject) => {
            database.query(
              getData.inputDataBarang,
              [
                Nama,
                Harga,
                Stok,
                NamaFile,
                Kode,
              ],
              (err, result) => {
                if (err) reject(err);
                resolve(result);
              }
            );
          });
          res.send({ status: "Input Data Barang Berhasil" });
        }
      } catch (error) {
        console.log(error);
      }
});


app.post("/Data/data_layanan/Input_data_layanan", async (req, res) => {
  try {
    const fileLayanan = await req.body.file;
    const NamaLayanan = await req.body.NamaLayanan.value;
    const HargaLayanan = await req.body.HargaLayanan.value;
    const StokLayanan = await req.body.StokLayanan.value;
    const KodeLayanan = await req.body.KodeLayanan.value;
    const time = DateTime.now().toFormat("HHmmssddMMyyyy");
    const NamaFile = `${time}.jpg`;
    console.log("Nama :" , NamaLayanan)
    console.log("Harga :" , HargaLayanan)
    console.log("Stok :" , StokLayanan)
    console.log("Kode :" , KodeLayanan)
        console.log("Halo :" , fileLayanan)
        const gambarLayanan = await fileLayanan.toBuffer();
        console.log("tugas :", gambarLayanan)
        const FileUrl = `${__dirname}/Public/${NamaFile}`;
        const result = await new Promise((resolve, reject) => {
          database.query(
            "SELECT * FROM data_Layanan WHERE Nama_Layanan = ?",
            [NamaLayanan],
            (err, result) => {
              if (err) reject(err);
              resolve(result);
            }
          );
        });
    
        if (result.length > 0) {
          res.send({ status: "Data Layanan Sudah Ada" });
        } else {
          await fs.writeFile(FileUrl, gambarLayanan)
          await new Promise((resolve, reject) => {
            database.query(
              getData.inputDataLayanan,
              [
                NamaLayanan,
                HargaLayanan,
                StokLayanan,
                NamaFile,
                KodeLayanan,
              ],
              (err, result) => {
                if (err) reject(err);
                resolve(result);
              }
            );
          });
          res.send({ status: "Input Data Layanan Berhasil" });
        }
      } catch (error) {
        console.log(error);
      }
});

app.post("/Data/data_pelanggan/Input_data_pelanggan", async (req, res) => {
  try {
      const result = await new Promise((resolve, reject) => {
        database.query(
          "SELECT * FROM data_pelanggan WHERE Nama_Pelanggan = ?",
          [req.body.NamaPelanggan],
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        );
      });
  
      if (result.length > 0) {
        res.send({ status: "Data Pelanggan Sudah Ada" });
      } else {
        await new Promise((resolve, reject) => {
          database.query(
            getData.inputDataPelanggan,
            [
              req.body.NamaPelanggan,
              req.body.NomerTeleponPelanggan,
              req.body.AlamatPelanggan,
            ],
            (err, result) => {
              if (err) reject(err); 
              resolve(result);
            }
          );
        });
        res.send({ status: "Input Data Pelanggan Berhasil" });
      }
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  });

app.get("/Data/data_barang", (req, res) => {
  database.query(getData.data_barang, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/Data/data_layanan", (req, res) => {
  database.query(getData.data_layanan, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/Data/data_pelanggan", (req, res) => {
  database.query(getData.data_pelanggan, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.get("/transaksi", (req, res) => {
  database.query(getData.data_barang, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

console.log(dates)
app.post("/transaksi/pengeluaran", (req, res) => {
  database.query(
    getData.transaksiPengeluaran,
    [
      req.body.totalHarga,
      req.body.Produk,
      dates,
      req.body.uraian, 
      req.body.kuantitas, 
      req.body.Nama,
      req.body.Harga,
    ]
  );
res.send({ status: " Berhasil" });
});

app.post("/Transaksi/pemasukan", (req, res) => {
  const getCart = req.body.Cart;
  const getDataPelanggan = req.body.filteredResults;
  const getDataTransaksi = req.body.newItem;
    for(let x of getCart){
    const getDataBarang = x["Nama_Barang"]
  const getKuantitas = x["jumlah"]
  const getNamaPelanggan = getDataPelanggan[0]["Nama_Pelanggan"]
  const getNominal = getDataTransaksi[0]['NominalBayar']
  const getKembalian = getDataTransaksi[0]['Kembalian']
  const getTotal = parseInt(x['total']) + parseInt(getDataTransaksi[0]['Pajak']/getCart.length) - parseInt(getDataTransaksi[0]['Diskon']/getCart.length)
  const getDiskon = parseInt(getDataTransaksi[0]['Diskon']/getCart.length)
  const getPajak = parseInt(getDataTransaksi[0]['Pajak']/getCart.length)
  const getHarga = getCart[0]['Harga_Barang']
  const getSatuan = getDataTransaksi[0]['Satuan']

  database.query(
    getData.transaksiPemasukan,
    [
      getNominal,
      getKembalian,
      getNamaPelanggan,
      getDataBarang, 
      dates, 
      getTotal,
      getDiskon,
      getPajak,
      getKuantitas,
      getHarga,
      getSatuan,
    ]
  )
    }
res.send({ status: " Berhasil" });
});

app.post("/Transaksi/pemasukanLayanan", (req, res) => {
  const getCart = req.body.Cart;
  const getDataPelanggan = req.body.filteredResults;
  const getDataTransaksi = req.body.newItem;
    for(let x of getCart){
    const getDataBarang = x["Nama_Layanan"]
  const getKuantitas = x["jumlah"]
  const getNamaPelanggan = getDataPelanggan[0]["Nama_Pelanggan"]
  const getNominal = getDataTransaksi[0]['NominalBayar']
  const getKembalian = getDataTransaksi[0]['Kembalian']
  const getTotal = parseInt(x['total']) + parseInt(getDataTransaksi[0]['Pajak']/getCart.length) - parseInt(getDataTransaksi[0]['Diskon']/getCart.length)
  const getDiskon = parseInt(getDataTransaksi[0]['Diskon']/getCart.length)
  const getPajak = parseInt(getDataTransaksi[0]['Pajak']/getCart.length)
  const getHarga = getCart[0]['Harga_Layanan']
  const getSatuan = getDataTransaksi[0]['Satuan']

  database.query(
    getData.transaksiPemasukan,
    [
      getNominal,
      getKembalian,
      getNamaPelanggan,
      getDataBarang, 
      dates, 
      getTotal,
      getDiskon,
      getPajak,
      getKuantitas,
      getHarga,
      getSatuan,
    ]
  )
    }
res.send({ status: " Berhasil" });
});

app.get("/Info", (req, res) => {
  database.query(getData.Dompet, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/Rekap/Rekap_pengeluaran", (req, res) => {
  database.query(getData.rekap_pengeluaran, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/Rekap/Rekap_pemasukan", (req, res) => {
  database.query(getData.rekap_pemasukan, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/pemasukan", (req, res) => {
  database.query(getData.DanaPemasukan, [
    req.body.upPemasukan,
    req.body.upSaldo,
  ]);
  res.send({status : "berhasil"})
});

app.post("/pengeluaran", (req, res) => {
  database.query(getData.DanaPengeluaran, [
    req.body.UpPengeluaran,
    req.body.UpSaldo,
  ]);
  res.send({status : "berhasil"})
});

app.post("/dataStokBarang", (req, res) => {
  const getData = req.body.Cart;
  const getStok = getData[0]['newStok'];
  const getId = getData[0]['Id_Barang'];
  database.query(`UPDATE data_barang SET Stok_Barang = ? WHERE Id_Barang = ${getId}`,
    [
      getStok,
    ]
  );
  res.send({status :"berhasil"})
});

app.post("/dataStokLayanan", (req, res) => {
  const getData = req.body.Cart;
  const getStok = getData[0]['newStok'];
  const getId = getData[0]['Id_Layanan'];
  database.query(`UPDATE data_layanan SET Stok_Layanan = ? WHERE Id_Layanan = ${getId}`,
    [
      getStok,
    ]
  );
  res.send({status :"berhasil"})
});

app.post("/Update_data_barang", async (req, res) => {
  try {
    const Nama = await req.body.Nama_Barang;
    const Harga = await req.body.Harga_Barang;
    const Stok = await parseInt(req.body.Stok_Barang);
    const Kode = await req.body.Kode_Barang;
    const id = await req.body.Id_Barang;
          database.query(getData.UpdateDataBarang,
          [
            Nama,
            parseInt(Harga),
            parseInt(Stok),
            Kode,
            parseInt(id),
          ]
          )
          res.send({ status: "Update Data Barang Berhasil" });
      } catch (error) {
        console.log(error);
      }
});

app.post("/Hapus_data_barang", async (req, res) => {
  try {
    const id = await req.body.Id_Barang;
    console.log(id)
          database.query(getData.DeleteProduk,
          [
            parseInt(id),
          ]
          )
          res.send({ status: "Hapus Data Barang Berhasil" });
      } catch (error) { 
        console.log(error);
      }
});


app.post("/Update_data_layanan", async (req, res) => {
  try {
    const Nama = await req.body.Nama_Layanan;
    const Harga = await req.body.Harga_Layanan;
    const Stok = await parseInt(req.body.Stok_Layanan);
    const Kode = await req.body.Kode_Layanan;
    const id = await req.body.Id_Layanan;
          database.query(getData.UpdateDataLayanan,
          [
            Nama,
            parseInt(Harga),
            parseInt(Stok),
            Kode,
            parseInt(id),
          ]
          )
          res.send({ status: "Update Data Layanan Berhasil" });
      } catch (error) {
        console.log(error);
      }
});

app.post("/Hapus_data_Layanan", async (req, res) => {
  try {
    const id = await req.body.Id_Layanan;
    console.log(id)
          database.query(getData.DeleteLayanan,
          [
            parseInt(id),
          ]
          )
          res.send({ status: "Hapus Data Layanan Berhasil" });
      } catch (error) { 
        console.log(error);
      }
});

app.post("/Update_data_pelanggan", async (req, res) => {
  try {
    const Nama = await req.body.Nama_Pelanggan;
    const id = await req.body.Id_Pelanggan;
    const Alamat = await req.body.Alamat_Pelanggan;
    const NomerTelp = await req.body.Nomer_Telepon;
    console.log(id)
    console.log(NomerTelp)
          database.query(getData.UpdateDataPelanggan,
          [
            Nama,
            NomerTelp,
            Alamat,
            parseInt(id),
          ]
          )
          res.send({ status: "Update Data Pelanggan Berhasil" });
      } catch (error) {
        console.log(error);
      }
});

app.post("/Hapus_data_Pelanggan", async (req, res) => {
  try {
    const id = await req.body.Id_Pelanggan;
    console.log(id)
          database.query(getData.DeletePelanggan,
          [
            parseInt(id),
          ]
          )
          res.send({ status: "Hapus Data Pelanggan Berhasil" });
      } catch (error) { 
        console.log(error);
      }
});


app.post("/Hapus_pemasukan", async (req, res) => {
  try {
    const id = await req.body.Id_Pemasukan;
    console.log(id)
          database.query(getData.DeletePemasukan,
          [
            parseInt(id),
          ]
          )
          res.send({ status: "Hapus Data Layanan Berhasil" });
      } catch (error) { 
        console.log(error);
      }
});

app.post("/Hapus_Pengeluaran", async (req, res) => {
  try {
    const id = await req.body.Id_Pengeluaran;
    console.log(id)
          database.query(getData.DeletePengeluaran,
          [
            parseInt(id),
          ]
          )
          res.send({ status: "Hapus Data Layanan Berhasil" });
      } catch (error) { 
        console.log(error);
      }
});