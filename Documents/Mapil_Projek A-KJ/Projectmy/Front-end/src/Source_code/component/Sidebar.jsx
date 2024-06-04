import Logo from "../../asset/remove_logo.png";
import "./component-css/Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  House,
  FolderSimplePlus,
  CurrencyCircleDollar,
  File,
  SignOut,
} from "@phosphor-icons/react";

export default function Sidebar() {

  return (
    <nav>
      <div className="logo-apk">
        <div className="logo-image">
          <img src={Logo} alt="Logo" />
        </div>
        <span className="nama-apk">C - KJ</span>
      </div>

      <div className="menu-items">
        <ul className="nav-links">
          <li>
            <NavLink to={"/Beranda"}>
              <i className="ph ph-house">
                <House />
              </i>
              <span className="ket">Beranda</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/Data"}>
              <i className="ph ph-folder-simple-plus">
                <FolderSimplePlus />
              </i>
              <span className="ket">Data</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/Transaksi"}>
              <i className="ph ph-currency-circle-dollar">
                <CurrencyCircleDollar />
              </i>
              <span className="ket">Transaksi</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/Rekap"}>
              <i className="ph ph-file">
                <File />
              </i>
              <span className="ket">Rekap</span>
            </NavLink>
          </li>
        </ul>

        <ul className="keluar">
          <li>
            <NavLink>
              <i className="ph ph-sign-out">
                <SignOut />
              </i>
              <span className="ket">keluar</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
