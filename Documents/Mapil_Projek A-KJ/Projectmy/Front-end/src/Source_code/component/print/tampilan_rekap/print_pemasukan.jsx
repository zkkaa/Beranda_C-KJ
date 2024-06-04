import "../../component-css/print/tampilan_rekap/print_pemasukan.css";
import Logo_Upj from "../../../../asset/logo_upj.png";

export default function PrintPemasukan() {
  return (
    <div class="tampilan_print_pem">
      <div class="page_print_pem">
        <div class="judul1_print_pem">
          <div class="logo_print_pem">
            <img src={Logo_Upj} alt="" />
          </div>
          <div class="judul_print_pem">
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
            <span>LAPORAN PEMASUKAN</span>
          </div>
          <div class="tanggal_print">
            <span class="tanggal_print_pem">24 Mei 2024</span>
          </div>
        </div>
        <div class="keterangan_print">
          <div class="nama_pelanggan_print">
            <span className="pelanggan_print_pem">Muhammad Raffi</span>
          </div>
          <div class="barangjasa_print">
            <span>- </span>
            <span className="barangjasa_print_pem">Memasang Wifi</span>
          </div>
          <div class="div_harga_print">
            <div class="jumlah_barangjasa">
              <div class="tagihan_print">
                <span>Rp. </span>
                <span class="harga_print_pem">2.000.000</span>
              </div>
              <div class="jumlah_barangjasa_print">
                <span>x</span>
                <span class="kuantitas_print_pem">2</span>
              </div>
            </div>
            <div class="total_tagihan_print">
              <span>Rp. </span>
              <span class="total_harga_print_pem">4.000.000</span>
            </div>
          </div>
        </div>
        <div class="total_bayar_print">
          <div class="span_total_tagihan">
            <div class="left">
              <span>Total Tagihan</span>
            </div>
            <div class="right">
              <span>Rp. </span>
              <span className="total_harga_print_pem">4.000.0000</span>
            </div>
          </div>
          <div class="span_diskon">
            <div class="left">
              <span>Diskon</span>
            </div>
            <div class="right">
              <span>Rp. </span>
              <span className="diskon_print_pem">20.000</span>
            </div>
          </div>
          <div class="span_pajak">
            <div class="left">
              <span>Pajak</span>
            </div>
            <div class="right">
              <span>Rp. </span>
              <span className="pajak_print_pem">10.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
