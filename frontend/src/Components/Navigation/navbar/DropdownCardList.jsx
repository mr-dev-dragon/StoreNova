import React from "react";

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

  const taxRate = 0.0888;
  const tax = subtotal * taxRate;
  const shipping = 9.99;
  const total = subtotal + tax + shipping;

  const discountPercentage =
    previousSubtotal > 0
      ? (((previousSubtotal - subtotal) / previousSubtotal) * 100).toFixed(0)
      : 0;

  return (
    <div className="fixed md:right-50 top-17 z-[9999] w-full max-w-sm bg-white shadow-2xl rounded-xl border border-gray-200 overflow-hidden">
      {/* Scrollable inner container */}
      <div className="max-h-[600px] overflow-y-auto custom-scroll px-4 py-3">
        {/* Items */}
        {items.length > 0 && (
          <div className="space-y-2 pb-3">
            {items.map((item, i) => (
              <div
                key={item.id || i}
                className="flex items-center justify-between gap-2 border border-gray-100 rounded-md p-2 bg-white shadow-sm hover:shadow transition"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-9 h-9 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-gray-800 truncate max-w-[140px]">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-gray-500 truncate max-w-[140px]">
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
            ))}
          </div>
        )}

        {/* Summary */}
        <div className="space-y-1 text-sm border-t pt-3">
          <div className="flex justify-between text-gray-500 text-sm">
            <span>Previous Subtotal</span>
            <span className="line-through">${previousSubtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (8.88%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-1">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-1 text-[11px] text-green-600">
            <span>You saved</span>
            <span>{discountPercentage}%</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex gap-2">
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

      {/* Beautiful Scrollbar Styles */}
      <style jsx>{`
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }

        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 9999px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
