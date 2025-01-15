import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseInt(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray border-2 rounded-md focus:outline-none focus:border-blue-500";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Adicionar Novo Produto" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/*NOME DO PRODUTO */}
          <label htmlFor="productName" className={labelCssStyles}>
            Nome do Produto
          </label>
          <input
            type="text"
            name="name"
            id=""
            placeholder="Nome"
            onChange={handleChange}
            value={formData.name}
            className={inputCssStyles}
            required
          />

          {/*NOME DO PREÇO */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Preço do Produto
          </label>
          <input
            type="number"
            name="price"
            placeholder="Preço"
            onChange={handleChange}
            value={formData.price}
            className={inputCssStyles}
            required
          />

          {/*QAUNTIDADE EM ESTOQUE */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Quantidade em Estoque
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Quantidade em Estoque"
            onChange={handleChange}
            value={formData.stockQuantity}
            className={inputCssStyles}
            required
          />

          {/* AVALIAÇÃO*/}
          <label htmlFor="rating" className={labelCssStyles}>
            Avaliação
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Avaliação"
            onChange={handleChange}
            value={formData.rating}
            className={inputCssStyles}
            required
          />

          {/** AÇÃO DE CRIAR */}
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 hover:transition-all duration-300">
            Criar
          </button>
          <button onClick={onClose} type="button" className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 hover:transition-all duration-300">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
