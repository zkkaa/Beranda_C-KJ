import { useState } from "react";
import axios from "axios";
import { DataTerhapus } from "./data-tersimpan";
import "../component-css/PopUp_css/hapus-data-pelanggan.css";
import "../component-css/PopUp_css/hapus-produk.css"
import "../component-css/PopUp_css/hapus-transaksi-pemasukan.css"

// <!-- ==========Hapus-Data-Pelanggan========== -->
export function HapusDataPelanggan({ DataPelanggan }) {
  function refreshData() {
    window.location.reload();
  }
  console.log(DataPelanggan);
  const [IdPelanggan, setIdPelanggan] = useState({
    Id_Pelanggan: DataPelanggan[0].Id_Pelanggan,
  });
  const [hapus, setHapus] = useState(false);
  function Handle_inputPelanggan(event) {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/Hapus_data_Pelanggan`, IdPelanggan)
      .then((res) => {
        console.log(res);
      });
    setHapus(true);
  }
  return (
    <>
      {hapus && <DataTerhapus />}
      <div
        className={`contain ${hapus ? "blur" : ""}`}
        style={hapus ? { overflow: "hidden" } : {}}
      >
        <div class="Div_Hapus-Data-Pelanggan">
          <div class="Hapus-Data-Pelanggan">
            <div class="popup-judul">
              <span>Hapus Data Pelanggan?</span>
            </div>
            <div class="popup-des">
              <span>Hapus data pelanggan ini?</span>
            </div>
            <div class="btn_tidak-ya">
              <button class="btn-tidak" onClick={refreshData}>
                Tidak
              </button>
              <button class="btn-ya-hpel" onClick={Handle_inputPelanggan}>
                Ya
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// <!-- ==========PopUp_Hapus-Produk========== -->
export function HapusProduk({ DataBarang }) {
  function refreshData() {
    window.location.reload();
  }
  const [IdBarang, setIdBarang] = useState({
    Id_Barang: DataBarang[0].Id_Barang,
  });
  const [hapus, setHapus] = useState(false);
  function Handle_inputBarang(event) {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/Hapus_data_barang`, IdBarang)
      .then((res) => {
        console.log(res);
      });
    setHapus(true);
  }
  return (
    <>
      {hapus && <DataTerhapus />}
      <div
        className={`contain ${hapus ? "blur" : ""}`}
        style={hapus ? { overflow: "hidden" } : {}}
      >
        <div class="Div_PopUp_Hapus-Produk">
          <div class="PopUp_Hapus-Produk">
            <div class="popup-judul">
              <span>Hapus Produk?</span>
            </div>
            <div class="popup-des">
              <span>Hapus produk ini?</span>
            </div>
            <div class="btn_tidak-ya">
              <button class="btn-tidak" onClick={refreshData}>
                Tidak
              </button>
              <button class="btn-ya-hpro" onClick={Handle_inputBarang}>
                Ya
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function HapusLayanan({ DataLayanan }) {
  const [hapus, setHapus] = useState(false);
  function refreshData() {
    window.location.reload();
  }
  const [IdLayanan, setIdLayanan] = useState({
    Id_Layanan: DataLayanan[0].Id_Layanan,
  });
  function Handle_inputLayanan(event) {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/Hapus_data_Layanan`, IdLayanan)
      .then((res) => {
        console.log(res);
      });
    setHapus(true);
  }
  return (
    <>
      {hapus && <DataTerhapus />}
      <div
        className={`contain ${hapus ? "blur" : ""}`}
        style={hapus ? { overflow: "hidden" } : {}}
      >
        <div class="Div_PopUp_Hapus-Produk">
          <div class="PopUp_Hapus-Produk">
            <div class="popup-judul">
              <span>Hapus Produk?</span>
            </div>
            <div class="popup-des">
              <span>Hapus produk ini?</span>
            </div>
            <div class="btn_tidak-ya">
              <button class="btn-tidak" onClick={refreshData}>
                Tidak
              </button>
              <button class="btn-ya-hpro" onClick={Handle_inputLayanan}>
                Ya
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// <!-- ==========PopUp_Hapus-Data========== -->
export function HapusTransaksiPemasukan({ Pemasukan_Data }) {
  function refreshData() {
    window.location.reload();
  }
  const [hapus, setHapus] = useState(false);
  console.log(Pemasukan_Data);
  const [IdPemasukan, setIdPemasukan] = useState({
    Id_Pemasukan: Pemasukan_Data[0].id_pemasukan,
  });
  function Handle_inputLayanan(event) {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/Hapus_pemasukan`, IdPemasukan)
      .then((res) => {
        console.log(res);
      });
    setHapus(true);
  }
  return (
    <>
      {hapus && <DataTerhapus />}
      <div
        className={`contain ${hapus ? "blur" : ""}`}
        style={hapus ? { overflow: "hidden" } : {}}
      >
        <div class="Div_Hapus-transaksi-pemasukan">
          <div class="PopUp_Hapus-transaksi-pemasukan">
            <div class="popup-judul">
              <span>Hapus Data?</span>
            </div>
            <div class="popup-des">
              <span>Hapus transaksi pemasukan?</span>
            </div>
            <div class="btn_tidak-ya">
              <button class="btn-tidak" onClick={refreshData}>
                Tidak
              </button>
              <button class="btn-ya-pem" onClick={Handle_inputLayanan}>
                Ya
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function HapusTransaksiPengeluaran({ Pengeluaran_Data }) {
  function refreshData() {
    window.location.reload();
  }
  const [hapus, setHapus] = useState(false);
  const [IdPengeluaran, setIdPengeluaran] = useState({
    Id_Pengeluaran: Pengeluaran_Data[0].Id_Pengeluaran,
  });
  function Handle_inputLayanan(event) {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_URL}/Hapus_Pengeluaran`, IdPengeluaran)
      .then((res) => {
        console.log(res);
      });
    setHapus(true);
  }
  return (
    <>
      {hapus && <DataTerhapus />}
      <div
        className={`contain ${hapus ? "blur" : ""}`}
        style={hapus ? { overflow: "hidden" } : {}}
      >
        <div class="Div_Hapus-transaksi-pengeluaran">
          <div class="PopUp_Hapus-transaksi-pemasukan">
            <div class="popup-judul">
              <span>Hapus Data?</span>
            </div>
            <div class="popup-des">
              <span>Hapus transaksi pemasukan?</span>
            </div>
            <div class="btn_tidak-ya">
              <button class="btn-tidak" onClick={refreshData}>
                Tidak
              </button>
              <button class="btn-ya-peng" onClick={Handle_inputLayanan}>
                Ya
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
