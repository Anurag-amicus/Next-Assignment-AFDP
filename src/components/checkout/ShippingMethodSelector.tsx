import { SHIPPING_METHODS } from "@/utils/shippingHelpers";
import type { ShippingMethod } from "@/types/shipping";

export interface ShippingMethodSelectorProps {
    selectedMethod?: ShippingMethod;
    onChange: (method: ShippingMethod) => void;
    errorMessage?: string;
    disabled?: boolean;
}

export function ShippingMethodSelector({
    selectedMethod = "standard",
    onChange,
    errorMessage,
    disabled = false,
}: ShippingMethodSelectorProps) {
    return (
        <div className="mx-4.5 mb-4">
            <h3 className="m-0 mb-2.5 font-display text-xs font-bold text-black uppercase tracking-wide">
                Shipping Method
            </h3>
            <div className="flex flex-col gap-2">
                {SHIPPING_METHODS.map((method) => {
                    const isSelected = selectedMethod === method.id;

                    return (
                        <label
                            key={method.id}
                            className={`flex items-center gap-2 min-h-6.75 text-charcoal text-xs leading-tight cursor-pointer hover:text-orange transition-colors ${
                                disabled ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                        >
                            <input
                                type="radio"
                                name="shippingMethodRadio"
                                value={method.id}
                                checked={isSelected}
                                disabled={disabled}
                                onChange={() => onChange(method.id)}
                                className="appearance-none w-3.5 h-3.5 shrink-0 m-0 bg-white border border-border rounded-full cursor-pointer checked:border-orange checked:bg-orange checked:shadow-[inset_0_0_0_3px_white]"
                            />
                            <span className="text-xs leading-tight font-medium">
                                {method.label}
                            </span>
                            <span className="ml-auto text-muted text-xs font-semibold">
                                ₹{method.price.toFixed(2)}
                            </span>
                        </label>
                    );
                })}
            </div>
            {errorMessage && (
                <span className="text-xs text-red-600 leading-tight mt-1.5 block">
                    {errorMessage}
                </span>
            )}
        </div>
    );
}

export default ShippingMethodSelector;
