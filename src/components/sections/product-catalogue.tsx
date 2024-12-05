"use client";

import Image from "next/image";

const ProductCatalogue = () => {
  return (
    <section className="px-2 py-16 xl:py-28 bg-light-green">
      <div className="container">
        <h2 className="pb-3 xl:pb-6 text-2xl xl:text-4xl text-black font-bold">
          Produk Lainnya
        </h2>
        <p className="text-grey text-sm xl:text-lg pb-8 xl:pb-16">
          Semua produk kosmetik yang dapat kami produksi.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <div className="flex flex-col gap-10 pb-4 border-b-4">
            <div className="w-100">
              <Image
                className="aspect-square"
                src={"/images/products/product-overview-1.png"}
                alt="product overview 1"
                layout="responsive"
                width={100}
                height={100}
              />
            </div>
            <div>
              <h4 className="text-2xl font-medium text-black pb-3">
                Body Care and Treatment
              </h4>
              <p className="text-sm text-grey">Varian Produk Perawatan Tubuh</p>
            </div>
          </div>
          <div className="flex flex-col gap-10 pb-4 border-b-4">
            <div className="w-100">
              <Image
                className="aspect-square"
                src={"/images/products/product-overview-1.png"}
                alt="product overview 1"
                layout="responsive"
                width={100}
                height={100}
              />
            </div>
            <div>
              <h4 className="text-2xl font-medium text-black pb-3">
                Body Care and Treatment
              </h4>
              <p className="text-sm text-grey">Varian Produk Perawatan Tubuh</p>
            </div>
          </div>
          <div className="flex flex-col gap-10 pb-4 border-b-4">
            <div className="w-100">
              <Image
                className="aspect-square"
                src={"/images/products/product-overview-1.png"}
                alt="product overview 1"
                layout="responsive"
                width={100}
                height={100}
              />
            </div>
            <div>
              <h4 className="text-2xl font-medium text-black pb-3">
                Body Care and Treatment
              </h4>
              <p className="text-sm text-grey">Varian Produk Perawatan Tubuh</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalogue;
