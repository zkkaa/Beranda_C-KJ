import Sidebar from "../../../component/Sidebar";
import Navbar from "../../../component/Navbar";
import "../../../CSS/Pages_transaksi/InputTransaksi/input_transaksi.css";
import { Car, MagnifyingGlass } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { PembayaranBerhasil } from "../../../component/PopUp/pembayaran_berhasil";

export default function InputTransaksi_pemasukan({ total, Cart }) {
  const [data, setData] = useState([]);
  const [totalHarga, setTotal] = useState(parseInt(total));
  const [Diskon, setDiskon] = useState(0);
  const [Pajak, setPajak] = useState(0);
  const [NominalBayar, setNominal] = useState(0);
  const [Kembalian, setKembalian] = useState(0);
  const [dana, setDana] = useState([]);
  const [pemasukan, setPemasukan] = useState(0);
  const [Saldo, setSaldo] = useState(0);
  const [upSaldo, setUpSaldo] = useState(0);
  const [upPemasukan, setUpPemasukan] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState(false);
  const [statusPelanggan, setStatusPelanggan] = useState(false);
  const [Show, setShow] = useState(false);
  const [Satuan, setSatuan] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/Data/data_pelanggan`)
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const searchItems = (searchValue) => {
    setFilteredResults();
    setStatus(true);
    setStatusPelanggan(false);
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  };

  function InputSatuan(e){    
    setSatuan(e);
  }


  function InputDiskon(e) {
    setDiskon(e);
  }

  function InputPajak(e) {
    setPajak(e);
  }

  function InputNominal(e) {
    setNominal(e);
  }
  useEffect(() => {
    const tes = parseInt(total) + parseInt(Pajak) - parseInt(Diskon);
    setTotal(tes);
    const balik = parseInt(NominalBayar) - parseInt(totalHarga);
    setKembalian(balik);
  });

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
    dana.map((e) => {
      const inp = e.Pemasukan;
      const saldo = e.Saldo;
      setPemasukan(inp);
      setSaldo(saldo);
    });

    console.log(Kembalian);

    const update = Saldo + totalHarga;
    const updatePemasukan = pemasukan + totalHarga;
    setUpSaldo(update);
    setUpPemasukan(updatePemasukan);
    console.log(upSaldo);
    console.log(upPemasukan);
  });

  function GetStatus() {
    setStatus(false);
    if (filteredResults.length > 1) {
      setStatusPelanggan(false);
    } else {
      setStatusPelanggan(true);
    }
  }

  console.log(filteredResults);

  function KirimData(e) {
    e.preventDefault();

    let newItem = [
      {
        TotalhargaBayar: totalHarga,
        Diskon: Diskon,
        Pajak: Pajak,
        NominalBayar: NominalBayar,
        Kembalian: Kembalian,
        Satuan: Satuan,
      },
    ];
    axios
      .post(`${import.meta.env.VITE_API_URL}/Transaksi/pemasukan`, {
        filteredResults,
        newItem,
        Cart,
      })
      .then((res) => {
        console.log(res);
      });

    axios
      .post(`${import.meta.env.VITE_API_URL}/pemasukan`, {
        upPemasukan,
        upSaldo,
      })
      .then((res) => {
        console.log(res);
      });

    axios
      .post(`${import.meta.env.VITE_API_URL}/dataStokBarang`, { Cart })
      .then((res) => {
        console.log(res);
      });

    setShow(true);
  }

  return (
    <div>
      {Show && <PembayaranBerhasil />}
      <Navbar />
      <Sidebar />
      <form onSubmit={KirimData}>
        <div
          className={`contain ${Show ? "blur" : ""}`}
          style={Show ? { overflow: "hidden" } : {}}
        >
          <div className="cont_T-pelanggan_terdaftar">
            <div className="pelanggan_terdaftar">
              <div className="judul_T-pel_terdaftar">
                <span className="terdaftar_judul">Pelanggan</span>
              </div>
              <div className="terdaftar_cari">
                <div className="cari">
                  <button className="btn_cari">
                    <MagnifyingGlass size={32} />
                  </button>
                  <input
                    type="search"
                    className="terdaftar_input-cari"
                    placeholder="Masukkan nama pelanggan.."
                    onChange={(e) => searchItems(e.target.value)}
                  />
                </div>
                {status && (
                  <div className="hasil">
                    {searchInput.length > 1
                      ? filteredResults.map((item) => {
                          return (
                            <div key={item.Id_Pelanggan}>
                              <button
                                onClick={GetStatus}
                                className="click_nama"
                              >
                                {item.Nama_Pelanggan}
                              </button>
                            </div>
                          );
                        })
                      : data.map((item) => {
                          return (
                            <div key={item.Id_Pelanggan}>
                              {item.Nama_Pelanggan}
                            </div>
                          );
                        })}
                  </div>
                )}
              </div>
              {statusPelanggan && (
                <div>
                  {filteredResults.map((item) => (
                    <div className="terdaftar_identitas">
                      <div className="divnama">
                        <div className="nama_p">
                          <span>Nama</span>
                        </div>
                        <div className="titik-dua">
                          <span>:</span>
                        </div>
                        <div className="input_T_nama">
                          <span>{item.Nama_Pelanggan}</span>
                        </div>
                      </div>
                      <div className="divnomer">
                        <div className="nomer-telepon_p">
                          <span>Nomer Telepon</span>
                        </div>
                        <div className="titik-dua">
                          <span>:</span>
                        </div>
                        <div className="input_T_nomer">
                          <span>{item.Nomer_Telepon}</span>
                        </div>
                      </div>
                      <div className="divalamat">
                        <div className="alamat_p">
                          <span>Alamat</span>
                        </div>
                        <div className="titik-dua">
                          <span>:</span>
                        </div>
                        <div className="input_T_alamat">
                          <span>{item.Alamat_Pelanggan}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="judul_T-pel_terdaftar">
                <span className="terdaftar_judul">Pembayaran</span>
              </div>
              <div className="terdaftar_pembayaran">
                <div className="div_total_harga-pt">
                  <span className="span_input_t">Total Tagihan</span>
                  <div>
                    <span>{totalHarga}</span>
                  </div>
                </div>
                <div className="div_diskon_pajak-pt">
                  <div className="div_diskon-pt">
                    <span className="span_input_t">Diskon</span>
                    <div>
                      <input
                        type="text"
                        className="input_diskon-pt"
                        placeholder="Masukan diskon.."
                        onChange={(e) => InputDiskon(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="div_pajak-pt">
                    <span className="span_input_t">Pajak</span>
                    <div>
                      <input
                        type="text"
                        className="input_pajak-pt"
                        placeholder="Masukan pajak.."
                        onChange={(e) => InputPajak(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="div_nominal_bayar-pt">
                  <span className="span_input_t">Satuan</span>
                  <div>
                    <input
                      type="text"
                      className="input_nominal-pt"
                      placeholder="Masukan satuan.."
                      onChange={(e) => InputSatuan(e.target.value)}
                    />
                  </div>
                </div>
                <div className="div_nominal_bayar-pt">
                  <span className="span_input_t">Nominal Bayar</span>
                  <div>
                    <input
                      type="text"
                      className="input_nominal-pt"
                      placeholder="Masukan nominal.."
                      onChange={(e) => InputNominal(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="btn_simpan-pelanggan_t">
                <button className="simpan-pelanggan_t">Bayar</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
