import Head from "next/head";

const Layout = ({
    children,
    title = "Next PAGE",
    descripcion = "Descripción del sitio web",
}) => {
    return (
        <div className="container px-4 mx-auto">
            <Head>
                <title>{title}</title>
                <meta name="description" content={descripcion} />
            </Head>
            <nav>Navbar</nav>

            {children}

            <footer>footer</footer>
        </div>
    );
};

export default Layout;
