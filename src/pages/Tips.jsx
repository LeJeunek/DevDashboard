import { Container } from "react-bootstrap";

import TipsWidget from "../components/widgets/TipsWidget.jsx";


export default function Tips() {
  return (
    <div className="tips-page-content">
      <TipsWidget compact/>
    </div>
  );
}
