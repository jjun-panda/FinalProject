import { Link } from "react-router-dom";
import { useUserStore } from '../../../stores';
import { useCookies } from 'react-cookie';
import Button from "../../../components/Button";
import './css/navigation.css';
// import GridHeader from "../../../components/GridHeader";

export default function Navigation() {
  const [cookies, setCookies] = useCookies();
  const { user, removeUser } = useUserStore();

  const logOutHandler = () => {
    setCookies('token', '', {expires: new Date()})
    removeUser();
  }

  return (
    <div className="nav">
        <div className="container">
            <div className="gridHeader header">
                <Link to="/">
                    <div className="logo title24x">
                      <img src="https://jjundesign.gabia.io/components/jjun_logo_f.svg" alt="logo"  width={100}/>
                    </div>
                </Link>
                <ul className="menu">
                {!user ? (
                    <Link to="/signup">
                      <Button size="small">회원가입</Button>
                    </Link>
                  ) : (
                    <Button size="small" onClick={() => logOutHandler()}>로그아웃</Button>
                  ) }
                </ul>
            </div>
        </div>
    </div>
  )
}
