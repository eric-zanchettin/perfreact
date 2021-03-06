import { privateDecrypt } from "crypto";
import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

type Results = {
  totalPrice: number;
  data: any[];
};

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: [],
  });

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    if (!search.trim()) return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const products = data.map(product => {
      return {
        id: product.id,
        price: product.price,
        formattedPrice: formatter.format(product.price),
        title: product.title,
      };
    });
      
    setResults({ totalPrice, data: products });
  };

  const onAddToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults totalPrice={results.totalPrice} results={results.data} onAddToWishlist={onAddToWishlist} />
    </div>
  )
}
