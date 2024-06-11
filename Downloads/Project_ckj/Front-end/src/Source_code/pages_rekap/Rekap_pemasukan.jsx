import "../CSS/pages_rekap/rekap_pemasukan.css";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import { Blueprint, Printer, Trash } from "@phosphor-icons/react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useState, useEffect, useRef } from "react";
import PagePrintPemasukan from "../component/print/page_print-pemasukan";
import { MultiPrint } from "../component/print/tampilan_rekap/MultiPrint";
import { HapusTransaksiPemasukan } from "../component/PopUp/hapus";

export default function Rekap_pemasukan() {
  const [dataPemasukan, setData] = useState([]);
  const [DataTransaksi, setDataTransaksi] = useState([]);
  const [show, setShow] = useState(false);
  const [pupUp, setPopUp] = useState(false);

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
      .get(`${import.meta.env.VITE_API_URL}/Rekap/Rekap_pemasukan`)
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
      return i.id_pemasukan === item.id_pemasukan;
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
      x += y.Total_Pemasukan;
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
        <MultiPrint
          ref={componentRef}
          Total={total}
          DataTransaksi={DataPrint}
        />
      </div>
      {hapusData && <HapusTransaksiPemasukan Pemasukan_Data={DataPrint} />}
      {show && <PagePrintPemasukan DataTransaksi={DataTransaksi} />}
      <Sidebar />
      <Navbar />
      <div
        className={`contain ${hapusData ? "blur" : ""}`}
        style={hapusData ? { overflow: "hidden" } : {}}
      >
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
                <select
                  name="tahun"
                  class="tahun"
                  onChange={(e) => OnChangeTahun(e.target.value)}
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              <div class="div_dropbulan_r-pemasukan">
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
            <div class="hapus_print_r-pemasukan">
              <button class="btn_print_r-pemasukan" onClick={ShowPrint}>
                <Printer size={32} className="icon_pem_print" />
                <span>Print</span>
              </button>
              <button class="btn_hapus_r-pemasukan" onClick={hapus}>
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
                  <th class="satuan__rekap_pemasukan">Satuan</th>
                  <th class="diskon__rekap_pemasukan">Diskon</th>
                  <th class="pajak__rekap_pemasukan">Pajak</th>
                  <th class="harga_rekap_pemasukan">Total Harga</th>
                  <th class="detail__rekap_pemasukan">Aksi</th>
                </tr>
                {dataPemasukan
                  .filter(
                    (item) =>
                      item.Tanggal_Pemasukan.includes(filter) &&
                      item.Tanggal_Pemasukan.includes(filterTahun)
                  )
                  .map((item) => (
                    <tr
                      key={item.id_pemasukan}
                      onClick={() => AddTransaksiPrint(item)}
                    >
                      <td>{item.Tanggal_Pemasukan}</td>
                      <td>{item.Nama_Pelanggan}</td>
                      <td>{item.Barang}</td>
                      <td>{item.kuantitas}</td>
                      <td>{item.Satuan}</td>
                      <td>
                        <span>Rp. </span>
                        <span>{item.Diskon}</span>
                      </td>
                      <td>
                        <span>Rp. </span>
                        <span>{item.Pajak}</span>
                      </td>
                      <td>
                        <span>Rp. </span>
                        <span>{item.Total_Pemasukan}</span>
                      </td>
                      <td>
                        <button
                          className="btn-detail-pemasukan"
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
