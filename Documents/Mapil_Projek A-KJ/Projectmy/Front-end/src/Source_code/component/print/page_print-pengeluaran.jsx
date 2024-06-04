import PrintPengeluaran from "../print/tampilan_rekap/print_pengeluaran"
import { Link } from "react-router-dom";
import "../component-css/print/page_print_pemasukan.css";

const handlePrint = () => {
  const content = document.getElementById("divcontents");
  const pri = document.getElementById("ifmcontentstoprint").contentWindow;
  pri.document.open();
  pri.document.write(content.innerHTML);
  pri.document.close();
  pri.focus();
  pri.print();
};

export default function PagePrintPengeluaran() {
  return (
    <>
      <div>
        {/* Your component content */}
        <div id="divcontents">
          <PrintPengeluaran />
        </div>

        {/* Hidden iframe for printing */}
        <iframe
          id="ifmcontentstoprint"
          style={{ height: 0, width: 0, position: "absolute" }}
        ></iframe>

        {/* Button to trigger printing */}
        <div className="btn-detail-print">
          <Link to={"/Rekap/Rekap_pengeluaran"}>
            <button className="kembali">Kembali</button>
          </Link>
          <button onClick={window.print} id="print">
            <span>Print</span>
          </button>
        </div>
      </div>
    </>
  );
}
