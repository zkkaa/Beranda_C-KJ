import "../../component-css/print/tampilan_rekap/print_pengeluaran.css"
import Logo_Upj from "../../../../asset/logo_upj.png"

export default function PrintPengeluaran() {
  return (
    <div class="tampilan_print_peng">
      <div class="page_print_peng">
        <div class="judul1_print_peng">
          <div class="logo_print_peng">
            <img src={Logo_Upj} alt="" />
          </div>
          <div class="judul_print_peng">
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
            <span>LAPORAN PENGELUARAN</span>
          </div>
          <div class="tanggal_print_peng">
            <span class="tanggal_peng">24 Mei 2024</span>
          </div>
        </div>
        <div class="keterangan_print">
          <div class="nama_pelanggan_print">
            <span>Muhammad Raffi</span>
          </div>
          <div class="barangjasa_print">
            <span>- </span>
            <span>Memasang Wifi</span>
          </div>
          <div class="div_harga_print">
            <div class="jumlah_barangjasa">
              <div class="tagihan_print">
                <span>Rp. </span>
                <span class="harga_print">2.000.000</span>
              </div>
              <div class="jumlah_barangjasa_print">
                <span>x</span>
                <span class="kuantitas_print">2</span>
              </div>
            </div>
            <div class="total_tagihan_print_peng">
              <span>Rp. </span>
              <span class="total_print_peng">4.000.000</span>
            </div>
          </div>
        </div>
        <div class="total_bayar_print_peng">
          <div class="span_total_tagihan_peng">
            <div class="left">
              <span>Total Tagihan</span>
            </div>
            <div class="right">
              <span>Rp. </span>
              <span className="total_print_peng">4.000.0000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
