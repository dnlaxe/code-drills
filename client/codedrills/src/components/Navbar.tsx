import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex flex-col border-r w-40">
      <Link to="/">Home</Link>
      <Link to="/practice">Practice</Link>
    </nav>
  );
}
