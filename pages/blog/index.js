import Layout from "../../components/Layout";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

const Blog = ({ posts }) => {
    return (
        <Layout
            title="Blog con Wordpress API"
            descripcion="Lista de artículos sobre programación web"
        >
            <h1 className="my-8 text-8xl">Hola Blog</h1>
            <main className="grid gap-8">
                {posts.map((post) => (
                    <article className="bg-gray-300" key={post.id}>
                        <h2 className="mb-4 text-5xl">{post.title.rendered}</h2>
                        {post._embedded?.["wp:featuredmedia"]?.[0]
                            .source_url && (
                            <img
                                src={
                                    post._embedded?.["wp:featuredmedia"]?.[0]
                                        .source_url
                                }
                                alt=""
                            />
                        )}
                        <div
                            className="mb-4"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    post.excerpt.rendered
                                ),
                            }}
                        ></div>
                        <Link href={`/blog/${post.slug}`}>
                            <a className="inline-block px-4 py-3 text-white transition-all duration-500 bg-pink-700 rounded-md hover:bg-purple-900">
                                Leer más
                            </a>
                        </Link>
                    </article>
                ))}
            </main>
        </Layout>
    );
};

export default Blog;

export const getStaticProps = async (context) => {
    try {
        const res = await fetch(
            "https://ignaciogutierrez.cl/api/wp-json/wp/v2/posts?_embed"
        );
        const posts = await res.json();

        return {
            props: {
                posts,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                posts: [],
            },
            revalidate: 10,
        };
    }
};
