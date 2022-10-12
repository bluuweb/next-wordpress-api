import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import Layout from "../../components/Layout";

const Post = ({ post }) => {
    return (
        <Layout>
            <article className="bg-gray-300">
                <h2 className="mb-4 text-5xl">
                    id: {post.id} - {post.title.rendered}
                </h2>
                <div
                    className="mb-4"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.content.rendered),
                    }}
                ></div>
                <Link href="/blog">
                    <a className="inline-block px-4 py-3 text-white transition-all duration-500 bg-pink-700 rounded-md hover:bg-purple-900">
                        Atrás
                    </a>
                </Link>
            </article>
        </Layout>
    );
};

export default Post;

export const getStaticPaths = async () => {
    const res = await fetch("http://localhost/wp-twitch/wp-json/wp/v2/posts");
    const data = await res.json();

    const arrayPaths = data.map((item) => ({ params: { id: `${item.id}` } }));

    return {
        paths: arrayPaths,
        fallback: false, // can also be true or 'blocking'
    };
};

export const getStaticProps = async ({ params }) => {
    const res = await fetch(
        "http://localhost/wp-twitch/wp-json/wp/v2/posts/" + params.id
    );
    const post = await res.json();

    return {
        props: {
            post,
        },
    };
};
