import "../CSS/pages_rekap/rekap_pemasukan.css";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import { Printer, Trash } from "@phosphor-icons/react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Rekap_pemasukan() {
  const [dataPemasukan, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/Rekap/Rekap_pemasukan")
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
      <div class="cont_rekap_pemasukan">
        <div class="menu_rekap_pemasukan">
          <div class="rekap_pemasukan_div">
            <ul>
              <li>
                <Link
                  to={"/Rekap/Rekap_pemasukan"}
                  class="pemasukan_t"
                  id="active10"
                >
                  <span>Pemasukan</span>
                </Link>
              </li>
            </ul>
          </div>
          <div class="rekap_pengeluaran_div">
            <ul>
              <li>
                <Link to={"/Rekap/Rekap_pengeluaran"} class="pengeluaran_t">
                  <span>Pengeluaran</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div class="dropdown_cari_r-pemasukan">
          <div class="dropdown_r">
            <div class="div_droptahun_r-pemasukan">
              <select name="tahun" class="tahun">
                <option value="2024">2024</option>
              </select>
            </div>
            <div class="div_dropbulan_r-pemasukan">
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
          <div class="hapus_print_r-pemasukan">
            <Link to={"/Rekap/Rekap_pengeluaran/Page_Print_Bulanan"}>
            <button class="btn_print_r-pemasukan">
              <Printer size={32} className="icon_rpem" />
              <span>Print</span>
            </button>
            </Link>
            <button class="btn_hapus_r-pemasukan">
              <Trash size={32} className="icon_rpem" />
              <span>Hapus</span>
            </button>
          </div>
        </div>

        <div class="tbl_data_r_pemasukan">
          <div class="list_r-pemasukan">
            <table class="rekap_pemasukan_tabel">
              <tr class="tj_r-pemasukan">
                <th class="tanggal__rekap_pemasukan">Tanggal</th>
                <th class="nama__rekap_pemasukan">Nama</th>
                <th class="barangjasa__rekap_pemasukan">Barang/Jasa</th>
                <th class="kuantitas__rekap_pemasukan">Kuantitas</th>
                <th class="diskon__rekap_pemasukan">Diskon</th>
                <th class="pajak__rekap_pemasukan">Pajak</th>
                <th class="harga_rekap_pemasukan">Total Harga</th>
                <th class="detail__rekap_pemasukan">Detail</th>
              </tr>
              {dataPemasukan.map((item) =>(

              <tr key={item.id_pemasukan}>
                <td>{item.Tanggal_Pemasukan}</td>
                <td>{item.Nama_Pelanggan}</td>
                <td>{item.Barang}</td>
                <td>{item.kuantitas}</td>
                <td>
                  <span>Rp. </span>
                  <span>{item.Diskon}</span>
                </td>
                <td>{item.Pajak}</td>
                <td>{item.Total_Pemasukan}</td>
                <td>
                  <Link to={"/Rekap/Rekap_pengeluaran/Page_Print_Pemasukan"}>
                    <button className="btn-detail-pemasukan">
                      <span>Detail</span>
                    </button>
                  </Link>
                </td>
              </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}