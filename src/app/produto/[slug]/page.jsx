import styles from "./page.module.css";
import Produto from "@/app/components/Produto";

async function fetchProdutoApi(slug) {
  const res = await fetch(`http://localhost:8080/produtos/${slug}`);

  if (!res.ok) throw new Error("Não foi possível obter os dados");
  const produto = await res.json();

  return produto;
}

export default async function ProdutoPage({ params }) {
  const produto = await fetchProdutoApi(params.slug);

  return (
    <main className={styles.main}>
      <Produto produto={produto} />
    </main>
  );
}

export async function generateStaticParams() {
  const res = await fetch(`http://localhost:8080/produtos/`);
  const produtos = await res.json();

  const result = produtos.map((produto) => ({
    slug: produto.id.toString(),
  }));

  return result;
}
