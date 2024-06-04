import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import "./CSS/Beranda.css";
import {Tampilan_Data} from "../Source_code/pages_data/Page_data_barang"
import {TampilanLayanan} from "../Source_code/pages_data/Page_data_layanan"

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
  // const [dataBarang, setDataBarang] = useState([]);
  // const [dataLayanan, setDataLayanan] = useState([]);
  const [dana, setDana] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/Data/data_barang")
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/Info")
      .then((res) => {
        const responseDana = res.data;
        setDana(responseDana);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  useEffect(() => {
    axios
      .get("http://localhost:3000/Data/data_layanan")
      .then((res) => {
        const responseData = res.data;
        setDataLayanan(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  const selectOption = {
    StokTerbanyak : "Stok Terbanyak",
    StokTerkecil : "Stok Terkecil",
  }

  const [search, setSearch] = useState("");
  // const [sorting, setSort] = useState([]);

  // console.log(data)
  function OnChange(value){
    if(value == 'volvo'){
      const terbanyak = [...data].sort((a, b) => a.Stok_Barang < b.Stok_Barang ? 1 : -1 )
      setData(terbanyak);
    }else if(value =="saab"){
      const terkecil = [...data].sort((a, b) => a.Stok_Barang > b.Stok_Barang ? 1 : -1 )
      setData(terkecil);
    }
  }
  
console.log(data)
  return (
    <>
    <div className="Cont_Beranda">
      <div className="Cont_Atas">
    <ul>
    {dana.map((item) => (
   <li key={item.id_dana}>
        <span className="title">Data Keuangan</span>
        <div className="tabel">
          <div className="tbl_pemasukan">
            <div className="top1"></div>
            <div>
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
              <div className="B_harga_pemasukan">
                <span>Rp.</span>
                <span>{item.Pemasukan}</span>
              </div>
            </div>
          </div>
          <div className="tbl_pengeluaran">
            <div className="top2"></div>
            <div>
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
              <div className="B_harga_pengeluaran">
                <span>Rp.</span>
                <span>{item.Pengeluaran}</span>
              </div>
            </div>
          </div>
          <div className="tbl_saldo">
            <div className="top3"></div>
            <div>
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
                <div className="B_harga_saldo">
                  <span>Rp.</span>
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
                <i><Funnel size={32} /></i>
              </button>
              {/* {data.map((item) => */}
              <select name="cabanyakdikitrs" onChange={(e)=>OnChange(e.target.value)} id="banyakdikit" className="in-filter">
                <option value="volvo" >{selectOption.StokTerbanyak}</option>
                <option value="saab">{selectOption.StokTerkecil}</option>
              </select>
               {/* )} */}
            </div>
            <div className="cari">
              <button className="btn-cari">
                <i><MagnifyingGlass size={32} /></i>
              </button>
              
              <input type="search" placeholder="Telusuri barang.." onChange={(e) => setSearch(e.target.value)}/>
            </div>
          </div>
          <div class="tbl_data_barang-beranda">
          {data.filter((item) => item.Nama_Barang.toLowerCase().includes(search)).map((item) => (
        <ul class="produk-terdaftar-p-barang">
          <li class="li-produk-p-barang" key={item.Id_Barang}>
            <div class="box_barang">
              <div class="gambar_terdaftar-box">
                <img
                  src={`http://localhost:3000/public/${item.Poto_Barang}`}
                  alt=""
                />
              </div>
              <div class="keterangan_terdaftar-box-b">
                <div class="div-top-box-b">
                  <div class="nama_terdaftar-box">
                    <div>
                      <span class="produk-box-b">{item.Nama_Barang}</span>
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
                      <button>
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
                      <button>
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
                    <div class="kurangi-stok-box-b">
                      <button class="btn-min-stok">
                        <span>-</span>
                      </button>
                      <span>{item.Stok_Barang}</span>
                      <button class="btn-plus-stok">
                        <span>+</span>
                      </button>
                    </div>
                    <div class="div-perbarui-box-b">
                      <button class="perbarui-box-b">
                        <span>Perbarui</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      ))}
             {/* {data.filter((item) => item.Nama_Layanan.toLowerCase().includes(search)).map((item) => (
     <ul className="produk-terdaftar-page-layanan">
            <li className="li-produk-page-layanan" key={item.Id_Layanan}>
              <div className="div_terdaftar-page-layanan">
                <div className="gambar_terdaftar-page-layanan">
                  <img src={`http://localhost:3000/public/${item.Poto_Layanan}`} alt="" />
                </div>
                <div className="keterangan_terdaftar-page-layanan">
                  <div className="div-top-page-layanan">
                    <div className="nama_terdaftar-page-layanan">
                      <div>
                        <span className="produk-pl">{item.Nama_Layanan}</span>
                      </div>
                      <div>
                        <span>Rp.</span>
                        <span className="harga_terdaftar-pl">{item.Harga_Layanan}</span>
                      </div>
                    </div>
                    <div className="btn_terdaftar-pl">
                      <div className="btn-edit-pl">
                        <button>
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
                      <div className="btn-hapus-pl">
                        <button>
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
                  <div className="div-bottom-pl">
                    <div className="stok-pl">
                      <span>Stok :</span>
                    </div>
                    <div className="kurangtambah-pl">
                      <div className="kurangi-stok-pl">
                        <button className="btn-min-pl">
                          <span>-</span>
                        </button>
                        <span>{item.Stok_Layanan}</span>
                        <button className="btn-plus-pl">
                          <span>+</span>
                        </button>
                      </div>
                      <div className="div-perbarui-pl">
                        <button className="perbarui-pl">
                          <span>Perbarui</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          ))} */}
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

