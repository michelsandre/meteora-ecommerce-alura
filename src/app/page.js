import styles from "./page.module.css";
import { Categorias } from "./components/Categorias";
import { Produtos } from "./components/Produtos";

async function fetchProdutosApi() {
  const res = await fetch("http://localhost:8080/produtos");

  if (!res.ok) throw new Error("Não foi possível obter os dados");
  const produtos = await res.json();
  return produtos;
}

async function fetchCategoriasApi() {
  const res = await fetch("http://localhost:8080/categorias");
  if (!res.ok) throw new Error("Não foi posssível obter os dados");
  const categorias = await res.json();
  return categorias;
}

async function fetchDadosApi() {
  const produtosPromise = fetchProdutosApi();
  const categoriasPromise = fetchCategoriasApi();
  const [produtos, categorias] = await Promise.all([
    produtosPromise,
    categoriasPromise,
  ]);

  return { produtos, categorias };
}
export default async function Home() {
  const { produtos, categorias } = await fetchDadosApi();

  return (
    <>
      <main className={styles.main}>
        <Categorias categorias={categorias} />
        <Produtos produtos={produtos} />
      </main>
    </>
  );
}
