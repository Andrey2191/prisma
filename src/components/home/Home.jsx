import Header from "../header/Header";

export default function Home({ setIsAuthenticated }) {
    return (
        <div className="home-page">
            <Header setIsAuthenticated={setIsAuthenticated} />
            <h2>Домашняя страница</h2>

        </div>
    );
}