import Accounts from "../accounts/Accounts";
import Header from "../header/Header";
import Tasks from "../tasks/Tasks";
import './home.css'

export default function Home({ setIsAuthenticated }) {
    return (
        <div className="home-page">
            <Header setIsAuthenticated={setIsAuthenticated} />
            <div className="home-content">
                <Accounts />
                <Tasks />
            </div>
        </div>
    );
}