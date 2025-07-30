import React from "react";
import Card from "../../Shared/Card";

export default function Receipt({ items = [], onCheckout, onRemoveAll }) {
  const parsePrice = (value) =>
    typeof value === "string"
      ? parseFloat(value.replace(/[^0-9.-]+/g, "")) || 0
      : value || 0;

  const subtotal = items.reduce(
    (acc, item) => acc + parsePrice(item.newPrice),
    0
  );
  const previousSubtotal = items.reduce(
    (acc, item) => acc + parsePrice(item.prevPrice),
    0
  );

  const tax = 9.88;
  const shipping = 9.99;
  const total = subtotal + tax + shipping;

  const discountPercentage =
    previousSubtotal > 0
      ? (((previousSubtotal - subtotal) / previousSubtotal) * 100).toFixed(0)
      : 0;

  return (
    <div className="border-t pt-3 space-y-1 w-full max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      {/* Items List - no fixed height, natural height, container scrolls */}
      <div className="flex flex-col gap-2 mb-4 px-1">
        {items.map((item, i) => (
          <div key={item.id || i}>
            {/* Assuming Card component is used here */}
            {/* Replace with your Card component */}
            <div className="flex items-center justify-between p-2 rounded border border-gray-200 bg-white shadow-sm hover:shadow transition-all gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 flex-shrink-0 rounded overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-gray-800 truncate max-w-[120px]">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-gray-400 truncate max-w-[120px]">
                    ${parsePrice(item.newPrice).toFixed(2)}
                    {item.prevPrice && (
                      <span className="ml-1 line-through text-gray-300">
                        ${parsePrice(item.prevPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Receipt Summary */}
      <div className="border-t pt-3 space-y-1 w-full px-1 text-sm">
        <div className="flex justify-between">
          <span>Previous Subtotal</span>
          <span className="line-through text-gray-400">
            ${previousSubtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-semibold pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between pt-1 text-[11px] text-green-600">
          <span>You saved</span>
          <span>{discountPercentage}%</span>
        </div>

        {/* Buttons */}
        <div className="pt-3 flex gap-2">
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
            onClick={onCheckout}
          >
            Checkout
          </button>

          <button
            className="w-full border border-gray-300 hover:bg-gray-100 py-2 rounded-lg transition"
            onClick={onRemoveAll}
          >
            Remove All
          </button>
        </div>
      </div>

      {/* Custom scrollbar styles (requires Tailwind scrollbar plugin or custom CSS) */}
      <style jsx>{`
        /* Thin scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #cbd5e1; /* Tailwind slate-300 */
          border-radius: 9999px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: #f1f5f9; /* Tailwind slate-100 */
        }
      `}</style>
    </div>
  );
}
