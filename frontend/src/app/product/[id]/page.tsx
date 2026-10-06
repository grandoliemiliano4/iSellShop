import { ProductDetailsUseCase } from '../../../presentation/use-cases/ProductDetailsUseCase';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // En Next.js 15+, los params son una Promesa y deben desenvolverse
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);

  return (
    <div className="flex-1 bg-black">
      <main>
        <ProductDetailsUseCase productId={productId} />
      </main>
    </div>
  );
}
