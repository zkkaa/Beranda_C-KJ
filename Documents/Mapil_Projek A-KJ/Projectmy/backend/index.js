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


    const dates = DateTime.now().toFormat("yyyy-MM-dd");
    const hours = DateTime.now().toFormat("HH:mm");
    const time = DateTime.now().toFormat("HHmmssddMMyyyy");
    const NamaFile = `${time}.jpg`;

const app = fastify({
  logger: true,
});
app.register(fastifyFormbody);
app.register(fastifyCors),
  {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  };

app.register(multipart, {attachFieldsToBody: true });
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.register((fastifyStatic), {
  root: path.join(__dirname, 'Public'),
  prefix: '/public/',
})

app.listen({ port: 3000 }, function (err, address) {
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

app.post("/transaksi/pengeluaran", (req, res) => {
  database.query(
    getData.transaksiPengeluaran,
    [
      req.body.Harga,
      req.body.Produk,
      dates,
      req.body.uraian, 
      req.body.kuantitas, 
      req.body.Nama,
    ]
  );
res.send({ status: " Berhasil" });
});

app.post("/Transaksi/pemasukan", (req, res) => {
  const getCart = req.body.Cart;
  const getDataPelanggan = req.body.data;
  const getDataTransaksi = req.body.newItem;
  const getDataBarang = getCart[0]["Id_Barang"]
  const getKuantitas = getCart[0]["jumlah"]
  const getNamaPelanggan = getDataPelanggan[0]["Id_Pelanggan"]
  const getNominal = getDataTransaksi[0]['NominalBayar']
  const getKembalian = getDataTransaksi[0]['Kembalian']
  const getTotal = getDataTransaksi[0]['TotalhargaBayar']
  const getDiskon = getDataTransaksi[0]['Diskon']
  const getPajak = getDataTransaksi[0]['Pajak']

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
    ]
  );

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
  console.log(req.body.upPemasukan)
  res.send({status : "berhasil"})
});
