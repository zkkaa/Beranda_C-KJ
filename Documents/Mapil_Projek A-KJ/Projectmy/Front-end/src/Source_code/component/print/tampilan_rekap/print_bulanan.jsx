import "../../component-css/print/tampilan_rekap/print_bulanan.css"
import Logo_Upj from "../../../../asset/logo_upj.png";

export default function PrintBulanan() {
  return (
    <div class="tampilan_print_bulanan">
      <div class="page_print">
        <div class="judul1_print">
          <div class="logo_print">
            <img src={Logo_Upj} alt="" />
          </div>
          <div class="judul_print">
            <div class="judul_print_unit">
              <span>Unit Produksi dan Jasa</span>
            </div>
            <div class="judul_print_upj">
              <span>UPJ TECHNOLOGI INFORMASI</span>
            </div>
            <div class="judul_print_alamat">
              <span>jl. Noenoeng Tisnasaputra Kec. Tawang</span>
            </div>
          </div>
        </div>
        <div class="judul2_print">
          <div class="jenis_laporan_print">
            <span>LAPORAN KEUANGAN</span>
          </div>
          <div class="tanggal_print">
            <span class="tanggal">MEI 2024</span>
          </div>
        </div>
        <div class="tabel_print_bulanan">
          <table class="tbl_bulanan">
            <tr>
              <th class="tgl_print_bulanan">Tanggal</th>
              <th class="jenis_print_bulanan">Jenis Laporan</th>
              <th class="nama_print_bulanan">Nama</th>
              <th class="bj_print_bulanan">Barang/Jasa</th>
              <th class="kuan_print_bulanan">Kuatitas</th>
              <th class="dis_print_bulanan">Diskon</th>
              <th class="pjk_print_bulanan">Pajak</th>
              <th class="total_print_bulanan">Total</th>
            </tr>
            <tr class="tampilkan-data">
              <td>24 mei 2024</td>
              <td>Pengeluaran</td>
              <td>Muhammad Raffi</td>
              <td>Memasang Wifi</td>
              <td>10</td>
              <td>
                <span>Rp. </span>
                <span>5.000</span>
              </td>
              <td>
                <span>Rp. </span>
                <span>5.000</span>
              </td>
              <td>
                <span>Rp. </span>
                <span>5.000.000.000</span>
              </td>
            </tr>
            <tr class="tampilkan-data">
              <td>24 mei 2024</td>
              <td>Pengeluaran</td>
              <td>Muhammad Raffi</td>
              <td>Memasang Wifi</td>
              <td>10</td>
              <td>
                <span>Rp. </span>
                <span>5.000</span>
              </td>
              <td>
                <span>Rp. </span>
                <span>5.000</span>
              </td>
              <td>
                <span>Rp. </span>
                <span>5.000.000.000</span>
              </td>
            </tr>
            <tr class="tampilkan-data">
              <td>24 mei 2024</td>
              <td>Pengeluaran</td>
              <td>Muhammad Raffi</td>
              <td>Memasang Wifi</td>
              <td>10</td>
              <td>
                <span>Rp. </span>
                <span>5.000</span>
              </td>
              <td>
                <span>Rp. </span>
                <span>5.000</span>
              </td>
              <td>
                <span>Rp. </span>
                <span>5.000.000.000</span>
              </td>
            </tr>
            <tr class="tampilkan-data">
              <td>24 mei 2024</td>
              <td>Pengeluaran</td>
              <td>Muhammad Raffi</td>
              <td>Memasang Wifi</td>
              <td>10</td>
              <td>
                <span>Rp. </span>
                <span>5.000</span>
              </td>
              <td>
                <span>Rp. </span>
                <span>5.000</span>
              </td>
              <td>
                <span>Rp. </span>
                <span>5.000.000.000</span>
              </td>
            </tr>
            <tr class="tampilkan-data">
              <td>24 mei 2024</td>
              <td>Pengeluaran</td>
              <td>Muhammad Raffi</td>
              <td>Memasang Wifi</td>
              <td>10</td>
              <td>
                <span>Rp. </span>
                <span>5.000</span>
              </td>
              <td>
                <span>Rp. </span>
                <span>5.000</span>
              </td>
              <td>
                <span>Rp. </span>
                <span>5.000.000.000</span>
              </td>
            </tr>
            <tr class="tr-Total Pemasukan">
              <th class="total_pemasukan" colspan="7">
                Total Pemasukan
              </th>
              <td>1000.000.000</td>
            </tr>
            <tr class="tr-Total Pengeluaran">
              <th class="total_pengeluaran" colspan="7">
                Total Pengeluaran
              </th>
              <td>200.000.000</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
