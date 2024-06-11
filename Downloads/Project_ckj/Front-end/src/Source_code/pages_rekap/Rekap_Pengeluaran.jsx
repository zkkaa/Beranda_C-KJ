import "../CSS/pages_rekap/rekap_pengeluaran.css";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import { Printer, Trash } from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { MultiPrintPengeluaran } from "../component/print/tampilan_rekap/MultiPengeluaran";
import PagePrintPengeluaran from "../component/print/page_print-pengeluaran";
import { HapusTransaksiPengeluaran } from "../component/PopUp/hapus";

export default function Rekap_pengeluaran() {
  const [dataPengeluaran, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [DataTransaksi, setDataTransaksi] = useState([]);

  const handlePrint = async (item) => {
    let findProduct = await DataTransaksi.find((i) => {
      return i.id_transaksi === item.id_transaksi;
    });
    if (findProduct) {
      setDataTransaksi([]);
    } else {
      let addProduct = {
        ...item,
      };
      setDataTransaksi([...DataTransaksi, addProduct]);
      setShow(true);
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/Rekap/Rekap_pengeluaran`)
      .then((res) => {
        const responseData = res.data;
        setData(responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [filter, setFilter] = useState("");
  const [filterTahun, setFilterTahun] = useState("");

  function OnChangeTahun(value) {
    setFilterTahun(value);
  }

  function OnChange(value) {
    setFilter(value);
  }

  const [DataPrint, setPrint] = useState([]);

  const AddTransaksiPrint = async (item) => {
    let findTransaksi = await DataPrint.find((i) => {
      return i.Id_Pengeluaran === item.Id_Pengeluaran;
    });
    if (findTransaksi) {
      setPrint([...DataPrint]);
    } else {
      let addPrint = {
        ...item,
      };
      setPrint([...DataPrint, addPrint]);
    }
  };
  console.log(DataPrint);

  function ShowPrint() {
    ReactHandlePrint();
  }

  const componentRef = useRef();
  const ReactHandlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [total, setharga] = useState([]);

  useEffect(() => {
    let x = 0;
    for (let y of DataPrint) {
      x += y.Nominal_Bayar_Pengeluaran;
    }
    setharga(x);
  });

  const [hapusData, setHapus] = useState(false);

  function hapus() {
    setHapus(true);
  }

  return (
    <>
      <div className="divcontents" style={{ display: "none" }}>
        <MultiPrintPengeluaran
          ref={componentRef}
          Total={total}
          DataTransaksi={DataPrint}
        />
      </div>
      {hapusData && <HapusTransaksiPengeluaran Pengeluaran_Data={DataPrint} />}
      {show && <PagePrintPengeluaran DataTransaksi={DataTransaksi} />}
      <Sidebar />
      <Navbar />
      <div
        className={`contain ${hapusData ? "blur" : ""}`}
        style={hapusData ? { overflow: "hidden" } : {}}
      >
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
                <select
                  name="tahun"
                  class="tahun"
                  onChange={(e) => OnChangeTahun(e.target.value)}
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              <div class="div_dropbulan_r-pengeluaran">
                <select
                  name="bulan"
                  class="bulan"
                  onChange={(e) => OnChange(e.target.value)}
                >
                  <option value="January">Januari</option>
                  <option value="february">Februari</option>
                  <option value="March">Maret</option>
                  <option value="April">April</option>
                  <option value="May">Mei</option>
                  <option value="June">Juni</option>
                  <option value="July">Juli</option>
                  <option value="August">Agustus</option>
                  <option value="September">September</option>
                  <option value="October">Oktober</option>
                  <option value="November">November</option>
                  <option value="December">Desember</option>
                </select>
              </div>
            </div>
            <div class="hapus_print_r-pengeluaran">
              <button class="btn_print_r-pengeluaran" onClick={ShowPrint}>
                <Printer size={32} className="icon_peng_print" />
                <span>Print</span>
              </button>
              <button class="btn_hapus_r-pengeluaran" onClick={hapus}>
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
                  <th class="kuantitas_rekap_pengeluaran">Kuantitas</th>
                  <th class="uraian_rekap_pengeluaran">Satuan</th>
                  <th class="harga_rekap_pengeluaran">Total Harga</th>
                  <th class="detail_rekap_pengeluaran">Aksi</th>
                </tr>
                {dataPengeluaran
                  .filter(
                    (item) =>
                      item.Tanggal_Pengeluaran.includes(filter) &&
                      item.Tanggal_Pengeluaran.includes(filterTahun)
                  )
                  .map((item) => (
                    <tr
                      key={item.Id_Pengeluaran}
                      onClick={() => AddTransaksiPrint(item)}
                    >
                      <td>{item.Tanggal_Pengeluaran}</td>
                      <td>{item.Nama}</td>
                      <td>{item.Barang}</td>
                      <td>{item.Kuantitas}</td>
                      <td>{item.Uraian}</td>
                      <td>
                        <span>Rp.</span>
                        <span>{item.Nominal_Bayar_Pengeluaran}</span>
                      </td>
                      <td>
                        <button
                          className="btn-detail-pengeluaran"
                          onClick={() => handlePrint(item)}
                        >
                          <span>Detail</span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
