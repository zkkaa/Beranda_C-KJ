import { UserCircle } from "@phosphor-icons/react";
import "./component-css/Navbar.css";
import CurrentDate from "./fitur_tambahan/date.jsx"

export default function Navbar() {
  return (
    <nav className="navigasi">
      <div>
        <div className="tanggal">
          <a href="">
            <span>
              <CurrentDate />
            </span>
          </a>
        </div>
        <div className="user">
          <div>
            <i className="ph-user-circle">
              <UserCircle />
            </i>
          </div>
          <span>Superadmin</span>
        </div>
      </div>
    </nav>
  );
}
