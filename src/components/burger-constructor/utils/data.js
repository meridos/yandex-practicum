export function createOrder() {
  return Promise.resolve(String(Math.round(Math.random() * 999999)));
}
