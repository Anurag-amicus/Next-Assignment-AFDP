import type { User } from "@/types/auth";
import type { Address } from "@/types/address";
import { addressApiService } from "@/services/addressApiService";

interface AccountSummarySectionProps {
    user: User;
}

export default async function AccountSummarySection({ user }: AccountSummarySectionProps) {
    let addresses: Address[] = [];
    let addressError: string | null = null;

    try {
        const result = await addressApiService.getAddresses(token);
        if (result.success && Array.isArray(result.data)) {
            addresses = result.data;
        } else if (!result.success) {
            addressError = result.error || "Unable to load addresses";
        }
        } catch {
            addressError = "Failed to connect to address service";
        }


    const defaultAddress =
        addresses.find((addr) => addr.isDefault) || (addresses.length > 0 ? addresses[0] : null);

    return (
        <section className="w-full mb-8" aria-labelledby="account-summary-heading">
            <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                <h2 id="account-summary-heading" className="font-display text-lg font-bold text-charcoal">
                    Account &amp; Address Summary
                </h2>
                <span className="text-xs text-muted">Personal Overview</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Information Card */}
                <div className="bg-white border border-border rounded-xs p-4 sm:p-6 shadow-xs flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border gap-2 flex-wrap">
                            <h3 className="font-display text-base font-bold text-charcoal">
                                Profile Details
                            </h3>
                            <span className="text-xs font-semibold text-muted">Account Info</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
                            <div className="p-3 bg-neutral-50 rounded-xs border border-border min-w-0">
                                <span className="text-[11px] text-muted block uppercase tracking-wider font-semibold">
                                    Full Name
                                </span>
                                <span className="font-bold text-charcoal truncate block" title={user.name}>
                                    {user.name || "N/A"}
                                </span>
                            </div>

                            <div className="p-3 bg-neutral-50 rounded-xs border border-border min-w-0">
                                <span className="text-[11px] text-muted block uppercase tracking-wider font-semibold">
                                    Email Address
                                </span>
                                <span className="font-bold text-charcoal truncate block" title={user.email}>
                                    {user.email || "N/A"}
                                </span>
                            </div>

                            <div className="p-3 bg-neutral-50 rounded-xs border border-border min-w-0">
                                <span className="text-[11px] text-muted block uppercase tracking-wider font-semibold">
                                    Account Role
                                </span>
                                <span className="font-bold text-charcoal truncate block">
                                    {user.role || "Customer"}
                                </span>
                            </div>

                            <div className="p-3 bg-neutral-50 rounded-xs border border-border min-w-0">
                                <span className="text-[11px] text-muted block uppercase tracking-wider font-semibold">
                                    Customer ID
                                </span>
                                <span className="font-bold text-charcoal truncate block" title={String(user.customerId)}>
                                    {user.customerId || "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Default Address Card */}
                <div className="bg-white border border-border rounded-xs p-4 sm:p-6 shadow-xs flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border gap-2 flex-wrap">
                            <h3 className="font-display text-base font-bold text-charcoal">
                                Default Shipping Address
                            </h3>
                            {defaultAddress && (
                                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-orange/10 text-orange border border-orange/20">
                                    Primary
                                </span>
                            )}
                        </div>

                        {addressError ? (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xs text-xs text-red-700">
                                <p className="font-semibold m-0">Notice</p>
                                <p className="m-0 mt-1 break-words">{addressError}</p>
                            </div>
                        ) : defaultAddress ? (
                            <div className="p-4 bg-neutral-50 rounded-xs border border-border text-sm flex flex-col gap-1.5 min-w-0">
                                <p className="font-bold text-charcoal m-0 break-words">
                                    {defaultAddress.addressLine1}
                                </p>
                                {defaultAddress.addressLine2 && (
                                    <p className="text-muted m-0 break-words">{defaultAddress.addressLine2}</p>
                                )}
                                <p className="text-muted m-0 break-words">
                                    {defaultAddress.city}, {defaultAddress.state}{" "}
                                    {defaultAddress.postalCode}
                                </p>
                                <p className="text-muted text-xs uppercase tracking-wider m-0 font-medium">
                                    {defaultAddress.country}
                                </p>
                            </div>
                        ) : (
                            <div className="p-5 bg-neutral-50 rounded-xs border border-dashed border-border text-center">
                                <p className="font-semibold text-charcoal text-sm m-0">
                                    No address added yet.
                                </p>
                                <p className="text-xs text-muted m-0 mt-1">
                                    A default delivery address will appear here once configured.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
