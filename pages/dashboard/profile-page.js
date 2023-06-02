import Profile from "/components/profile";
import Navbar from "/components/navbar";

export default function Profilepage() {
  return (
    <div>
        <Navbar />
        <Profile theme="primary" />
    </div>
  );
}