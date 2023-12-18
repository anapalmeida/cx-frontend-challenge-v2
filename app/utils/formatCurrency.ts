export default function formatCurrencyARS(price: Number | string) {
  return price?.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });
}
