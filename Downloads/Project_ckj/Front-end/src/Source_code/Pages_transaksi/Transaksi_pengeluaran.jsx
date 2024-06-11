import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import "../CSS/transaksi.css";
import "../CSS/Pages_transaksi/Transaksi_pengeluaran.css";
import { Link } from "react-router-dom";
import QuantitySelector from "../component/fitur_tambahan/tambahkurang_angka";
import { useState, useEffect } from "react";
import axios from "axios";
import { TransaksiPengeluaran } from "../component/PopUp/transaksipengeluaran";

export default function Transaksi_pengeluaran() {
  const [Nama, setNama] = useState("");
  const [Produk, setProduk] = useState("");
  const [uraian, setUraian] = useState("");
  const [kuantitas, setKuantitas] = useState(0);
  const [Harga, setHarga] = useState(0);
  const [dana, setDana] = useState([]);
  const [Pengeluaran, setPengeluaran] = useState(0);
  const [Saldo, setSaldo] = useState(0);
  const [UpPengeluaran, setUpPengeluaran] = useState(0);
  const [UpSaldo, setUpSaldo] = useState(0);
  const [Show, setShow] = useState(false);
  const [totalHarga, setTotal] = useState(0);

  function refreshData() {
    window.location.reload();
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/Info`)
      .then((res) => {
        const responseDana = res.data;
        setDana(responseDana);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    dana.map((item) => {
      const inp = item.Pengeluaran;
      const saldo = item.Saldo;
      setPengeluaran(inp);
      setSaldo(saldo);
    });
    const updateSaldo = parseInt(Saldo) - parseInt(Harga);
    const updatePengeluaran = parseInt(Pengeluaran) + parseInt(Harga);
    setUpSaldo(updateSaldo);
    setUpPengeluaran(updatePengeluaran);
  });

  function SubmitPengeluaran(e) {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API_URL}/transaksi/pengeluaran`, {
        Nama,
        Produk,
        uraian,
        kuantitas,
        Harga,
        totalHarga,
      })
      .then((res) => {
        console.log(res);
      });

    axios
      .post(`${import.meta.env.VITE_API_URL}/pengeluaran`, {
        UpPengeluaran,
        UpSaldo,
      })
      .then((res) => {
        console.log(res);
      });
    setShow(true);
  }

  useEffect(() => {
    const total = kuantitas * Harga;
    setTotal(total);
  });

  return (
    <div>
      {Show && <TransaksiPengeluaran />}
      <Navbar />
      <Sidebar />
      <form onSubmit={SubmitPengeluaran}>
        <div
          className={`contain ${Show ? "blur" : ""}`}
          style={Show ? { overflow: "hidden" } : {}}
        >
          <div className="bungkus">
            <div className="cont_transaksi_pengeluaran">
              <div className="transaksi_menu">
                <div className="div_pemasukan_t">
                  <ul>
                    <li>
                      <Link to={"/transaksi/barang"} className="pemasukan_t">
                        <span>Pemasukan</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="div_pengeluaran_t">
                  <ul>
                    <li>
                      <Link
                        to={"/transaksi/pengeluaran"}
                        className="pengeluaran_t"
                        id="active6"
                      >
                        <span>Pengeluaran</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tbl_inp-pengeluaran">
                <div className="inp-pengeluaran">
                  <table className="pengeluaran-tabel">
                    <tr className="tabel_judul-pengeluaran">
                      <th className="nama_transaksi_pengeluaran">Nama</th>
                      <th className="barangjasa_transaksi_pengeluaran">
                        Barang/Jasa
                      </th>
                      <th className="kuantitas_transaksi_pengeluaran">
                        Kuantitas
                      </th>
                      <th className="uraian_transaksi_pengeluaran">Satuan</th>
                      <th className="harga_transaksi_pengeluaran">Harga</th>
                    </tr>
                    <tr className="masukan-pengeluaran">
                      <td className="nama_pengeluaran">
                        <input
                          type="text"
                          className="nama_tp"
                          placeholder="Masukan nama.."
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </td>
                      <td className="barangjasa_pengeluaran">
                        <input
                          type="text"
                          className="barangjasa_tp"
                          placeholder="Nama barang/jasa.."
                          onChange={(e) => setProduk(e.target.value)}
                        />
                      </td>
                      <td className="kuantitas_pengeluaran">
                        <input
                          type="number"
                          name="qty"
                          id="qty"
                          className="kuantitas"
                          placeholder="masukan kuantitas.."
                          onChange={(e) => setKuantitas(e.target.value)}
                        />
                      </td>
                      <td className="uraian_pengeluaran">
                        <input
                          type="text"
                          className="uraian_tp"
                          placeholder="masukan uraian.."
                          onChange={(e) => setUraian(e.target.value)}
                        />
                      </td>
                      <td className="harga_pengeluaran">
                        <input
                          type="text"
                          className="harga_tp"
                          placeholder="masukan harga.."
                          onChange={(e) => setHarga(e.target.value)}
                        />
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="transaksi_pengeluaran">
                  <div className="div_jumlah-harga-pengeluaran">
                    <div className="div_span">
                      <span>Jumlah Harga :</span>
                    </div>
                    <div className="div_bayar-pengeluaran">
                      <span>Rp. {totalHarga}</span>
                    </div>
                  </div>
                  <div className="div_pesan-pengeluaran">
                    <div className="pengeluaran_batal">
                      <button>
                        <span>Batal</span>
                      </button>
                    </div>
                    <div className="pengeluaran_simpan">
                      <button>
                        <span>Simpan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
