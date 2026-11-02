import type { SavedAddressListProps } from "@/types/shipping";
import Card from "@/components/common/Card";

export function SavedAddressList({
    savedAddresses,
    selectedAddressId,
    isLoadingAddresses = false,
    onSelectAddress,
    onEditAddress,
    onAddNewAddress,
}: SavedAddressListProps) {
    return (
        <div className="pt-4 px-4.5 pb-5 border-t border-border bg-surface">
            {/* Top Bar: Title & Add New Address Toggle */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-black">
                    Select from Saved Addresses:
                </span>
                {onAddNewAddress && (
                    <button
                        type="button"
                        onClick={onAddNewAddress}
                        className={`text-xs font-bold px-2.5 py-1 border transition-all cursor-pointer ${
                            selectedAddressId === null
                                ? "border-orange bg-orange text-white"
                                : "border-border bg-white text-orange hover:border-orange"
                        }`}
                    >
                        + Add New Address
                    </button>
                )}
            </div>

            {/* Address Cards Grid or Empty / Loading States */}
            {isLoadingAddresses ? (
                <p className="text-xs text-muted m-0 animate-pulse">
                    Loading saved addresses...
                </p>
            ) : savedAddresses.length > 0 ? (
                <div className="grid grid-cols-2 max-[640px]:grid-cols-1 gap-3">
                    {savedAddresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.addressId;

                        return (
                            <Card
                                key={addr.addressId}
                                variant={isSelected ? "bordered" : "elevated"}
                                className={`min-h-0 h-full p-3.5 font-sans cursor-pointer transition-all ${
                                    isSelected
                                        ? "border-orange bg-orange/5 shadow-xs"
                                        : "border-border bg-white hover:border-gray-400"
                                }`}
                            >
                                <div
                                    onClick={() => onSelectAddress(addr)}
                                    className="flex flex-col h-full justify-between gap-2.5 select-none"
                                >
                                    {/* Card Top: Radio, City & State, Badges */}
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <input
                                                type="radio"
                                                name="savedAddressRadio"
                                                checked={isSelected}
                                                onChange={() => onSelectAddress(addr)}
                                                className="appearance-none w-3.5 h-3.5 shrink-0 bg-white border border-border rounded-full cursor-pointer checked:border-orange checked:bg-orange checked:shadow-[inset_0_0_0_3px_white]"
                                            />
                                            <span className="font-bold text-xs text-charcoal truncate">
                                                {addr.city}, {addr.state}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0">
                                            {isSelected && (
                                                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-orange text-white rounded-xs">
                                                    SELECTED
                                                </span>
                                            )}
                                            {addr.isDefault && (
                                                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-surface text-muted rounded-xs">
                                                    DEFAULT
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card Body: Street address & postal code */}
                                    <div className="text-xs text-charcoal leading-relaxed pl-5.5">
                                        <p className="m-0 truncate font-sans">
                                            {addr.addressLine1}
                                            {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}
                                        </p>
                                        <span className="text-muted text-[10px] block mt-0.5">
                                            {addr.postalCode}, {addr.country}
                                        </span>
                                    </div>

                                    {/* Card Bottom: Edit Option Inside the Card */}
                                    <div className="pt-2 border-t border-border flex items-center justify-between pl-5.5">
                                        {onEditAddress && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onEditAddress(addr);
                                                }}
                                                className="text-xs font-bold text-orange hover:underline cursor-pointer border-0 bg-transparent p-0 flex items-center gap-1"
                                            >
                                                <span>✎ Edit Address</span>
                                            </button>
                                        )}
                                        <span className="text-[10px] text-muted">
                                            {isSelected ? "Active address" : "Click to select"}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <p className="text-[11px] text-muted m-0">
                    No saved addresses found. Enter your address above.
                </p>
            )}
        </div>
    );
}

export default SavedAddressList;
