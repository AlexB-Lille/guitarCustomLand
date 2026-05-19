import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard, Wallet, Bitcoin, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import productsData from '../../data/products.json';
import { guitarImages } from '../utils/imageImports';

export function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [selectedShipping, setSelectedShipping] = useState(productsData.shipping[0].id);
  const [selectedPayment, setSelectedPayment] = useState(productsData.paymentMethods[0].id);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shippingCost = productsData.shipping.find(s => s.id === selectedShipping)?.price || 0;
  const finalTotal = total + shippingCost;

  const paymentIcons = {
    card: CreditCard,
    paypal: Wallet,
    bitcoin: Bitcoin,
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (items.length === 0 && !orderPlaced) {
    navigate('/basket');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-wider">
            Order Confirmed!
          </h1>
          <p className="text-xl text-zinc-400 mb-8">
            Your custom guitar is on its way. Rock on!
          </p>
          <p className="text-sm text-zinc-500">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-black py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-wider">
          <span className="text-red-600">Checkout</span>
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-wider">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-2 text-sm uppercase tracking-wider">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-2 text-sm uppercase tracking-wider">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="Doe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-zinc-400 mb-2 text-sm uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-zinc-400 mb-2 text-sm uppercase tracking-wider">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="123 Rock Street"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-2 text-sm uppercase tracking-wider">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="Los Angeles"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-2 text-sm uppercase tracking-wider">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-black border border-zinc-700 rounded px-4 py-3 text-white focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="90001"
                  />
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-wider">
                Shipping Method
              </h2>
              <div className="space-y-3">
                {productsData.shipping.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedShipping === method.id
                        ? 'border-red-600 bg-red-600/10'
                        : 'border-zinc-700 hover:border-zinc-600'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={selectedShipping === method.id}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="w-5 h-5 accent-red-600"
                      />
                      <div>
                        <div className="text-white font-bold uppercase tracking-wider">
                          {method.name}
                        </div>
                        <div className="text-sm text-zinc-400">{method.duration}</div>
                      </div>
                    </div>
                    <div className="text-xl font-black text-red-600">${method.price}</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-wider">
                Payment Method
              </h2>
              <div className="space-y-3">
                {productsData.paymentMethods.map((method) => {
                  const Icon = paymentIcons[method.id as keyof typeof paymentIcons];
                  return (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? 'border-red-600 bg-red-600/10'
                          : 'border-zinc-700 hover:border-zinc-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-5 h-5 accent-red-600"
                      />
                      <Icon className="w-6 h-6 text-red-600" />
                      <div className="text-white font-bold uppercase tracking-wider">
                        {method.name}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border-2 border-zinc-800 rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-wider">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-zinc-800">
                    <div className="w-16 h-16 bg-black rounded flex items-center justify-center p-2 flex-shrink-0">
                      <img
                        src={guitarImages[item.image]}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold text-sm truncate">{item.name}</div>
                      <div className="text-zinc-500 text-xs uppercase">{item.type}</div>
                    </div>
                    <div className="text-red-600 font-bold">${item.price}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pt-4 border-t border-zinc-800">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-bold">${total}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="font-bold">${shippingCost}</span>
                </div>
                <div className="border-t border-zinc-800 pt-3">
                  <div className="flex justify-between text-white text-xl font-black">
                    <span className="uppercase tracking-wider">Total</span>
                    <span className="text-red-600">${finalTotal}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-4 text-lg font-bold uppercase tracking-wider transition-all shadow-lg shadow-red-900/50"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
