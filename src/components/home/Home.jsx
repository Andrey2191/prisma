import Accounts from "../accounts/Accounts";
import Header from "../header/Header";
import './home.css'

export default function Home({ setIsAuthenticated }) {
    return (
        <div className="home-page">
            <Header setIsAuthenticated={setIsAuthenticated} />
            <Accounts/>

        </div>
    );
}