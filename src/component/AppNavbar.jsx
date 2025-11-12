import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AppNavbar({ tab, setTab, products, carts, setToken }) {
    return (
        <div className="d-flex justify-content-center gap-2">
            <Link to={'home'}>
                <Button variant="outline-primary">Home</Button>
            </Link>
            <Link to={'calculator'}>
                <Button variant="outline-primary">Calculator</Button>
            </Link>
            <Link to={'animation'}>
                <Button variant="outline-primary">Animation</Button>
            </Link>
            <Link to={'components'}>
                <Button variant="outline-primary">Components</Button>
            </Link>
            <Link to={'todos'}>
                <Button variant="outline-primary">Todos</Button>
            </Link>
            <Link to={'products'}>
                <Button variant="outline-primary">Products ({products.length})</Button>
            </Link>

            <Link to={'carts'}>
                <div className="position-relative d-inline-block">
                    <Button variant="outline-primary">Cart</Button>
                    {carts.length > 0 && (
                        <span
                            style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-8px",
                                backgroundColor: "red",
                                color: "white",
                                borderRadius: "50%",
                                padding: "0.25rem 0.5rem",
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                            }}
                        >
                            {carts.length}
                        </span>
                    )}
                </div>
            </Link>
            <Link to={'logout'}>
                <Button variant="outline-danger" className="ms-3" onClick={() => { setToken('') }}>Logout</Button>
            </Link>
        </div>
    );
}

export default AppNavbar;
