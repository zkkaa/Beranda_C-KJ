import "../../component-css/print/tampilan_rekap/print_pemasukan.css";
import Logo_Upj from "../../../../asset/logo_upj.png";
import React, { useEffect, useState } from "react";

export const MultiPrintPengeluaran = React.forwardRef((props, ref ) => {
  const { DataTransaksi, Total } = props;

  return (
    <div class="tampilan_print_pem" ref={ref}>
      <div class="page_print_pem">
        <div class="judul1_print_pem">
          <div class="logo_print_pem">
            <img src={Logo_Upj} alt="" />
          </div>
          <div class="judul_print_pem">
            <div class="judul_print_smk">
              <span>SMK NEGERI 2 TASIKMALAYA</span>
            </div>
            <div className="judul_print_bidang">
              <span>BIDANG KEAHLIAN TEKNOLOGI INFORMASI</span>
            </div>
            <div class="judul_print_upj">
              <span>UNIT PRODUKSI & JASA</span>
            </div>
            <div class="judul_print_alamat">
              <div className="jalan">
                <span>
                  Jl. Noenoeng Tisnasaputra HP: 089657891005 Kel. Kahuripan Kec.
                  Tawang
                </span>
              </div>
              <div className="ins">
                <span>
                  Instagram: technonet_solution - Email:
                  up-ti@smkn2kotatasik.sch.id
                </span>
              </div>
              <div className="tasik">
                <span>TASIKMALAYA 46115</span>
              </div>
            </div>
          </div>
        </div>
        <div class="judul2_print">
          <div class="judul2_print_left"></div>
          <div class="judul2_print_right">
            <div className="tgl_tasik">
              <span>Tasikmalaya, </span>
            </div>
            <div className="tgl_tgl">
            </div>
          </div>
        </div>
        <div className="detail_pemasukan_ckj">
          <div class="tabel_print_pemasukan">
            <table className="tbl_print_pem">
              <tr className="judul_tbl_print_pem">
                <th>Barang / Jasa</th>
                <th>Kuantitas</th>
                <th>Satuan</th>
                <th>Harga</th>
                <th>Total Harga</th>
              </tr>
      {DataTransaksi.map((item) => (
              <tr className="detail_tbl_print_pem">
                <td>{item.Barang}</td>
                <td>{item.Kuantitas}</td>
                <td>{item.Uraian}</td>
                <td>{item.Harga_Satuan}</td>
                <td>{item.Nominal_Bayar_Pengeluaran}</td>
              </tr>
                ))}
              <tr className="total_tbl_print_pem">
                <th colSpan={4}>Total</th>
                <td>{Total}</td>
              </tr>
            </table>
          </div>
          <div className="ttd_print_pamsukan">
            <div className="ttd_pemasukan_left">
              <div className="span_pemasukan">
                <span>Penerima</span>
              </div>
              <div className="garis_bawah"></div>
            </div>
            <div className="ttd_pemasukan_right">
              <div className="span_pemasukan_upj">
                <div>
                  <span>HORMAT KAMI</span>
                </div>
                <div>
                  <span>Unit Produksi & Jasa TI</span>
                </div>
              </div>
              <div className="garis_bawah"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
})
