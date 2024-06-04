import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { NavLink, Link } from "react-router-dom";
import "../CSS/Pages_Data/Data_layanan.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DataLayanan() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="cont_data-page-layanan">
        <div className="menu_page_layanan">
          <div className="menu_barang">
            <ul>
              <li>
                <Link to={"/Data/data_barang"} id="barang">
                  <span>Barang</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="menu_layanan">
            <ul>
              <li>
                <Link
                  to={"/Data/data_layanan"}
                  id="layanan"
                  className="active2"
                >
                  <span>Layanan</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="menu_pelanggan">
            <ul>
              <li>
                <Link to={"/Data/data_pelanggan"}>
                  <span>Pelanggan</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="btn_tambah_barang">
          <div className="btn_tambah">
            <Link to={"/Data/data_layanan/input_data_layanan"}>
              <span>+ Tambah Layanan</span>
            </Link>
          </div>
        </div>
        <div className="inp_cari">
          <div className="inp">
            <button>
              <i className="ph-magnifying-glass">
                {" "}
                <MagnifyingGlass />{" "}
              </i>
            </button>
            <input type="search" placeholder="Masukan nama layanan.." onChange={(e) => setSearch(e.target.value)}/>
          </div>
        </div>
        <div className="tbl_data_page-layanan">
         <TampilanLayanan search={search}/>
        </div>
      </div>
    </div>
  );
}


export function TampilanLayanan({search}){
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/Data/data_layanan")
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return(
    <>
    {data.filter((item) => item.Nama_Layanan.toLowerCase().includes(search)).map((item) => (
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
          ))}
    </>
  )
}
