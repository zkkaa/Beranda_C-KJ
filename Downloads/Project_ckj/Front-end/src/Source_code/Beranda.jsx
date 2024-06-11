import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import "./CSS/Beranda.css";
import { Tampilan_Data } from "../Source_code/pages_data/Page_data_barang";
import { TampilanLayanan } from "../Source_code/pages_data/Page_data_layanan";
import UpdateBarang from "./component/UpdateData/UpdateBarang";
import { HapusProduk } from "./component/PopUp/hapus";
import "./component/component-css/PopUp_css/hapus-produk.css";

import {
  BoxArrowUp,
  BoxArrowDown,
  CashRegister,
  MagnifyingGlass,
  Funnel,
} from "@phosphor-icons/react";
import axios from "axios";
import { useState, useEffect } from "react";

function Cont() {
  const [data, setData] = useState([]);
  const [dana, setDana] = useState([]);
  const [ShowUp, setShowUp] = useState(false);
  const [ShowHapus, setShowHapus] = useState(false);

  const selectOption = {
    StokTerbanyak: "Stok Terbanyak",
    StokTerkecil: "Stok Terkecil",
  };

  const [DataBarang, setDataBarang] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/Data/data_barang`)
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
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
    axios
      .get(`${import.meta.env.VITE_API_URL}/Data/data_layanan`)
      .then((res) => {
        const responseData = res.data;
        setDataLayanan(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function OnChange(value) {
    if (value == "volvo") {
      const terbanyak = [...data].sort((a, b) =>
        a.Stok_Barang < b.Stok_Barang ? 1 : -1
      );
      setData(terbanyak);
    } else if (value == "saab") {
      const terkecil = [...data].sort((a, b) =>
        a.Stok_Barang > b.Stok_Barang ? 1 : -1
      );
      setData(terkecil);
    }
  }

  const handle = async (item) => {
    let findData = await DataBarang.find((i) => {
      return i.Id_Barang === item.Id_Barang;
    });
    if (findData) {
      setDataBarang([]);
    } else {
      let addProduct = {
        ...item,
      };
      setDataBarang([...DataBarang, addProduct]);
      setShowUp(true);
    }
  };

  const hapus = async (item) => {
    let findData = await DataBarang.find((i) => {
      return i.Id_Barang === item.Id_Barang;
    });
    if (findData) {
      setDataBarang([]);
    } else {
      let addProduct = {
        ...item,
      };
      setDataBarang([...DataBarang, addProduct]);
      setShowHapus(true);
    }
  };

  return (
    <>
      {ShowHapus && <HapusProduk DataBarang={DataBarang} />}
      {ShowUp && <UpdateBarang DataBarang={DataBarang} />}
      <div
        className={`contain ${ShowUp ? "blur" : ""} && `}
        style={ShowUp ? { overflow: "hidden" } : {}}
      >
        <div
          className={`contain ${ShowHapus ? "blur" : ""} && `}
          style={ShowHapus ? { overflow: "hidden" } : {}}
        >
          <div className="bungkus">
            <div className="Cont_Beranda">
              <div className="Cont_Atas">
                <ul>
                  {dana.map((item) => (
                    <li key={item.id_dana}>
                      <span className="title">Data Keuangan</span>
                      <div className="tabel">
                        <div className="tbl_pemasukan">
                          <div className="top1">
                            <div className="judul_tabel">
                              <div id="icon_tabel">
                                <i className="ph-box-arrow-down">
                                  <BoxArrowDown />{" "}
                                </i>
                              </div>
                              <div className="ket_tabel">
                                <span>Pemasukan</span>
                              </div>
                            </div>
                          </div>
                          <div className="div_tabel_harga_beranda">
                            <div className="B_harga_pemasukan">
                              <span>Rp. </span>
                              <span>{item.Pemasukan}</span>
                            </div>
                          </div>
                        </div>
                        <div className="tbl_pengeluaran">
                          <div className="top2">
                            <div className="judul_tabel">
                              <div id="icon_tabel">
                                <i className="ph-box-arrow-up">
                                  <BoxArrowUp />
                                </i>
                              </div>
                              <div className="ket_tabel">
                                <span>Pengeluaran</span>
                              </div>
                            </div>
                          </div>
                          <div className="div_tabel_harga_beranda">
                            <div className="B_harga_pengeluaran">
                              <span>Rp. </span>
                              <span>{item.Pengeluaran}</span>
                            </div>
                          </div>
                        </div>
                        <div className="tbl_saldo">
                          <div className="top3">
                            <div className="judul_tabel">
                              <div id="icon_tabel">
                                <i className="ph-cash-register">
                                  <CashRegister />
                                </i>
                              </div>
                              <div className="ket_tabel">
                                <span>Saldo</span>
                              </div>
                            </div>
                          </div>
                          <div className="div_tabel_harga_beranda">
                            <div className="B_harga_saldo">
                              <span>Rp. </span>
                              <span>{item.Saldo}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="Cont_Bawah">
                <span className="title">Data Stok Barang</span>
                <div className="tabel_stok">
                  <div className="div-filtercari">
                    <div className="filter">
                      <button className="btn-filter">
                        <i>
                          <Funnel size={32} />
                        </i>
                      </button>
                      {/* {data.map((item) => */}
                      <select
                        name="cabanyakdikitrs"
                        onChange={(e) => OnChange(e.target.value)}
                        id="banyakdikit"
                        className="in-filter"
                      >
                        <option value="volvo">
                          {selectOption.StokTerbanyak}
                        </option>
                        <option value="saab">
                          {selectOption.StokTerkecil}
                        </option>
                      </select>
                      {/* )} */}
                    </div>
                    <div className="cari">
                      <button className="btn-cari">
                        <i>
                          <MagnifyingGlass size={32} />
                        </i>
                      </button>

                      <input
                        type="search"
                        placeholder="Telusuri barang.."
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="tbl_data_barang-beranda">
                    {data
                      .filter((item) =>
                        item.Nama_Barang.toLowerCase().includes(search)
                      )
                      .map((item) => (
                        <ul class="produk-terdaftar-p-barang">
                          <li class="li-produk-p-barang" key={item.Id_Barang}>
                            <div class="box_barang">
                              <div class="gambar_terdaftar-box">
                                <img
                                  src={`${
                                    import.meta.env.VITE_API_URL
                                  }/public/${item.Poto_Barang}`}
                                  alt=""
                                />
                              </div>
                              <div class="keterangan_terdaftar-box-b">
                                <div class="div-top-box-b">
                                  <div class="nama_terdaftar-box">
                                    <div>
                                      <span class="produk-box-b">
                                        {item.Nama_Barang}
                                      </span>
                                    </div>
                                    <div>
                                      <span>Rp.</span>
                                      <span class="harga_terdaftar-box-b">
                                        {item.Harga_Barang}
                                      </span>
                                    </div>
                                  </div>
                                  <div class="btn_box-b">
                                    <div class="btn-edit-box-b">
                                      <button onClick={() => handle(item)}>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="1.5vw"
                                          height="3vh"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                    <div class="btn-hapus-box-b">
                                      <button onClick={() => hapus(item)}>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="1.5vw"
                                          height="3vh"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            fill="currentColor"
                                            d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div class="div-bottom-box-b">
                                  <div class="stok-box-b">
                                    <span>Stok :</span>
                                  </div>
                                  <div class="kurangtambah-box-b">
                                    <span>{item.Stok_Barang}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Beranda() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Cont />
    </div>
  );
}
