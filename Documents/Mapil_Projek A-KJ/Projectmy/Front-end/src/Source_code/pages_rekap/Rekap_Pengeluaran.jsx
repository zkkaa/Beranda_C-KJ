import "../CSS/pages_rekap/rekap_pengeluaran.css";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import { Printer, Trash } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Rekap_pengeluaran() {
  const [dataPengeluaran, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/Rekap/Rekap_pengeluaran")
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Sidebar />
      <Navbar />
      <div class="cont_rekap_pengeluaran">
        <div class="menu_rekap_pengeluaran">
          <div class="rekap_pemasukan_div">
            <ul>
              <li>
                <Link to={"/Rekap/Rekap_pemasukan"} class="pemasukan_t">
                  <span>Pemasukan</span>
                </Link>
              </li>
            </ul>
          </div>
          <div class="rekap_pengeluaran_div">
            <ul>
              <li>
                <Link
                  to={"/Rekap/Rekap_pengeluaran"}
                  class="pengeluaran_t"
                  id="active11"
                >
                  <span>Pengeluaran</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div class="dropdown_cari_r-pengeluaran">
          <div class="dropdown_r-pengeluaran">
            <div class="div_droptahun_r-pengeluaran">
              <select name="tahun" class="tahun">
                <option value="2024">2024</option>
              </select>
            </div>
            <div class="div_dropbulan_r-pengeluaran">
              <select name="bulan" class="bulan">
                <option value="januari">Januari</option>
                <option value="februari">Februari</option>
                <option value="maret">Maret</option>
                <option value="April">April</option>
                <option value="mei">Mei</option>
                <option value="juni">Juni</option>
                <option value="juli">Juli</option>
                <option value="agustus">Agustus</option>
                <option value="septembet">September</option>
                <option value="oktober">Oktober</option>
                <option value="november">November</option>
                <option value="desember">Desember</option>
              </select>
            </div>
          </div>
          <div class="hapus_print_r-pengeluaran">
            <Link to={"/Rekap/Rekap_pengeluaran/Page_Print_Bulanan"}>
            <button class="btn_print_r-pengeluaran">
              <Printer size={32} className="incon_peng" />
              <span>Print</span>
            </button>
            </Link>
            <button class="btn_hapus_r-pengeluaran">
              <Trash size={32} className="incon_peng" />
              <span>Hapus</span>
            </button>
          </div>
        </div>

        <div class="tbl_data_r_pengeluaran">
          <div class="list_r-pengeluaran">
            <table class="rekap_pengeluaran_tabel">
              <tr class="tj_r-pengeluaran">
                <th class="tanggal_rekap_pengeluaran">tanggal</th>
                <th class="nama_rekap_pengeluaran">Nama</th>
                <th class="barangjasa_rekap_pengeluaran">Barang/Jasa</th>
                <th class="uraian_rekap_pengeluaran">Uraian</th>
                <th class="kuantitas_rekap_pengeluaran">Kuantitas</th>
                <th class="harga_rekap_pengeluaran">Harga</th>
                <th class="detail_rekap_pengeluaran">Detail</th>
              </tr>
              {dataPengeluaran.map((item) => {    
              return <tr key={item.Id_Pengeluaran}>
                <td>{item.Tanggal_Pengeluaran}</td>
                <td>{item.Nama}</td>
                <td>{item.Barang}</td>
                <td>{item.Uraian}</td>
                <td>
                  <span>{item.Kuantitas}</span>
                </td>
                <td>
                  <span>Rp.</span>
                  <span>{item.Nominal_Bayar_Pengeluaran}</span>
                </td>
                <td>
                  <Link to={"/Rekap/Rekap_pengeluaran/Page_Print_Pengeluaran"}>
                  <button className="btn-detail-pengeluaran">
                    <span>Detail</span>
                  </button>
                  </Link>
                </td>
              </tr>
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
