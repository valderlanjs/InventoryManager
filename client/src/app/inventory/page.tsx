"use client";

import Header from "@/app/(components)/Header";
import { useGetProductsQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Nome do Produto", width: 200 },
  {
    field: "price",
    headerName: "Preço",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `${row.price}`,
  },
  {
    field: "rating",
    headerName: "Avaliação",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Quantidade em Estoque",
    width: 150,
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div className="py-4">Carregando...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Falha ao buscar produtos.
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <Header name="Inventário" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventory;
