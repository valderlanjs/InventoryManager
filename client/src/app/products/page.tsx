"use client";
import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";


const randomImageNumber = Math.floor(Math.random() * 3) + 1; // Gera números de 1 a 3
const imageUrl = `https://s3-managenet.s3.sa-east-1.amazonaws.com/product${randomImageNumber}.png`;

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  if (isLoading) {
    return <div className="py-">Carregando...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Falha ao buscar produtos
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/** SEARCH BAR */}
      <div className="mb-6">
        <div className="flex item-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            type="text"
            className="w-full py-2 px-4 rounded bg-white focus:outline-none"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Produtos" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 hover:transition-all duration-300 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Adicionar
          Produto
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 justify-between">
        {isLoading ? (
          <div>Carregando...</div>
        ) : (
          products.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                <Image
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl w-36 h-36"
                  alt={product.name}
                  src={imageUrl}
                />
                <h3 className="text-lg text-gray-900 font-semibold ">
                  {product.name}
                </h3>
                <p className="text-gray-800">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
                <div className="text-sm text-gray-600 mt-1">
                  Estoque: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex item-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
