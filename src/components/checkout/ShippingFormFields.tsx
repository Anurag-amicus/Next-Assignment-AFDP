import Button from "@/components/common/Button";
import type { ShippingFormData, ShippingFormErrors, ShippingField } from "@/types/shipping";
import type { Country, State } from "@/types/geoData";

const inputClass =
    "w-full h-8 px-2.25 border border-border-input rounded-none outline-none bg-white text-xs text-black placeholder:text-muted focus:border-orange transition-colors box-border disabled:bg-gray-50 disabled:text-muted disabled:cursor-not-allowed disabled:border-border";

const selectClass =
    "w-full h-8 px-2.25 border border-border-input rounded-none outline-none bg-white text-xs text-black focus:border-orange disabled:bg-gray-50 disabled:text-muted disabled:cursor-not-allowed disabled:border-border transition-colors box-border";

export interface ShippingFormFieldsProps {
    formData: ShippingFormData;
    errors: ShippingFormErrors;
    isEditing: boolean;
    isSavingAddress: boolean;
    isSubmitting?: boolean;
    countries: Country[];
    states: State[];
    cities: string[];
    countriesLoading: boolean;
    statesLoading: boolean;
    citiesLoading: boolean;
    countriesError?: string;
    statesError?: string;
    citiesError?: string;
    onChange: (field: ShippingField, value: string | boolean) => void;
    onBlur: (field: ShippingField) => void;
    onCountryChange?: (country: string) => void;
    onStateChange?: (state: string) => void;
    onSaveAddress: () => void;
    onCancelEdit: () => void;
}

export function ShippingFormFields({
    formData,
    errors,
    isEditing,
    isSavingAddress,
    isSubmitting = false,
    countries,
    states,
    cities,
    countriesLoading,
    statesLoading,
    citiesLoading,
    countriesError,
    statesError,
    citiesError,
    onChange,
    onBlur,
    onCountryChange,
    onStateChange,
    onSaveAddress,
    onCancelEdit,
}: ShippingFormFieldsProps) {
    return (
        <div className="grid grid-cols-2 max-[768px]:grid-cols-1 gap-x-5 gap-y-4 pt-4 px-4.5 pb-2">
            {/* Full Name */}
            <div className="flex flex-col gap-1 min-w-0">
                <label htmlFor="fullName" className="text-xs font-medium text-charcoal leading-tight">
                    Full Name *
                </label>
                <input
                    id="fullName"
                    type="text"
                    disabled={!isEditing || isSubmitting}
                    className={inputClass}
                    value={formData.fullName}
                    onChange={(e) => onChange("fullName", e.target.value)}
                    onBlur={() => onBlur("fullName")}
                    placeholder="Enter full name"
                />
                {errors.fullName && (
                    <span className="text-xs text-red-600 leading-tight">
                        {errors.fullName}
                    </span>
                )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1 min-w-0">
                <label htmlFor="email" className="text-xs font-medium text-charcoal leading-tight">
                    Email Address *
                </label>
                <input
                    id="email"
                    type="email"
                    disabled={!isEditing || isSubmitting}
                    className={inputClass}
                    value={formData.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    onBlur={() => onBlur("email")}
                    placeholder="name@example.com"
                />
                {errors.email && (
                    <span className="text-xs text-red-600 leading-tight">
                        {errors.email}
                    </span>
                )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1 min-w-0">
                <label htmlFor="phone" className="text-xs font-medium text-charcoal leading-tight">
                    Phone Number *
                </label>
                <input
                    id="phone"
                    type="tel"
                    disabled={!isEditing || isSubmitting}
                    className={inputClass}
                    value={formData.phone}
                    onChange={(e) => onChange("phone", e.target.value)}
                    onBlur={() => onBlur("phone")}
                    placeholder="10-digit mobile number"
                />
                {errors.phone && (
                    <span className="text-xs text-red-600 leading-tight">
                        {errors.phone}
                    </span>
                )}
            </div>

            {/* Street Address */}
            <div className="flex flex-col gap-1 min-w-0">
                <label htmlFor="streetAddress" className="text-xs font-medium text-charcoal leading-tight">
                    Street Address *
                </label>
                <input
                    id="streetAddress"
                    type="text"
                    disabled={!isEditing || isSubmitting}
                    className={inputClass}
                    value={formData.streetAddress}
                    onChange={(e) => onChange("streetAddress", e.target.value)}
                    onBlur={() => onBlur("streetAddress")}
                    placeholder="House number and street name"
                />
                {errors.streetAddress && (
                    <span className="text-xs text-red-600 leading-tight">
                        {errors.streetAddress}
                    </span>
                )}
            </div>

            {/* Apt / Suite */}
            <div className="flex flex-col gap-1 min-w-0">
                <label htmlFor="aptSuite" className="text-xs font-medium text-charcoal leading-tight">
                    Apartment / Suite (Optional)
                </label>
                <input
                    id="aptSuite"
                    type="text"
                    disabled={!isEditing || isSubmitting}
                    className={inputClass}
                    value={formData.aptSuite}
                    onChange={(e) => onChange("aptSuite", e.target.value)}
                    onBlur={() => onBlur("aptSuite")}
                    placeholder="Apartment, suite, unit, etc."
                />
            </div>

            {/* Country (Pure select with fallback option) */}
            <div className="flex flex-col gap-1 min-w-0">
                <label htmlFor="country" className="text-xs font-medium text-charcoal leading-tight">
                    Country *
                </label>
                <select
                    id="country"
                    disabled={!isEditing || countriesLoading || isSubmitting}
                    className={selectClass}
                    value={formData.country}
                    onChange={(e) => {
                        const val = e.target.value;
                        onChange("country", val);
                        onCountryChange?.(val);
                    }}
                    onBlur={() => onBlur("country")}
                >
                    <option value="">
                        {countriesLoading ? "Loading countries..." : "Select Country"}
                    </option>
                    {formData.country && !countries.some((c) => c.country === formData.country) && (
                        <option value={formData.country}>{formData.country}</option>
                    )}
                    {countries.map((c) => (
                        <option key={c.country} value={c.country}>
                            {c.country}
                        </option>
                    ))}
                </select>
                {errors.country && (
                    <span className="text-xs text-red-600 leading-tight">
                        {errors.country}
                    </span>
                )}
            </div>

            {/* State (Pure select with fallback option) */}
            <div className="flex flex-col gap-1 min-w-0">
                <label htmlFor="state" className="text-xs font-medium text-charcoal leading-tight">
                    State / Province *
                </label>
                <select
                    id="state"
                    disabled={!isEditing || !formData.country || statesLoading || isSubmitting}
                    className={selectClass}
                    value={formData.state}
                    onChange={(e) => {
                        const val = e.target.value;
                        onChange("state", val);
                        onStateChange?.(val);
                    }}
                    onBlur={() => onBlur("state")}
                >
                    <option value="">
                        {!formData.country
                            ? "Select Country First"
                            : statesLoading
                            ? "Loading states..."
                            : "Select State"}
                    </option>
                    {formData.state && !states.some((s) => s.name === formData.state) && (
                        <option value={formData.state}>{formData.state}</option>
                    )}
                    {states.map((s) => (
                        <option key={s.name} value={s.name}>
                            {s.name}
                        </option>
                    ))}
                </select>
                {errors.state && (
                    <span className="text-xs text-red-600 leading-tight">
                        {errors.state}
                    </span>
                )}
            </div>

            {/* City (Pure select with fallback option) */}
            <div className="flex flex-col gap-1 min-w-0">
                <label htmlFor="city" className="text-xs font-medium text-charcoal leading-tight">
                    City *
                </label>
                <select
                    id="city"
                    disabled={!isEditing || !formData.country || !formData.state || citiesLoading || isSubmitting}
                    className={selectClass}
                    value={formData.city}
                    onChange={(e) => onChange("city", e.target.value)}
                    onBlur={() => onBlur("city")}
                >
                    <option value="">
                        {!formData.country
                            ? "Select Country First"
                            : !formData.state
                            ? "Select State First"
                            : citiesLoading
                            ? "Loading cities..."
                            : "Select City"}
                    </option>
                    {formData.city && !cities.includes(formData.city) && (
                        <option value={formData.city}>{formData.city}</option>
                    )}
                    {cities.map((ct) => (
                        <option key={ct} value={ct}>
                            {ct}
                        </option>
                    ))}
                </select>
                {errors.city && (
                    <span className="text-xs text-red-600 leading-tight">
                        {errors.city}
                    </span>
                )}
            </div>

            {/* ZIP / Postal Code */}
            <div className="flex flex-col gap-1 min-w-0">
                <label htmlFor="zip" className="text-xs font-medium text-charcoal leading-tight">
                    ZIP / Postal Code *
                </label>
                <input
                    id="zip"
                    type="text"
                    disabled={!isEditing || isSubmitting}
                    className={inputClass}
                    value={formData.zip}
                    onChange={(e) => onChange("zip", e.target.value)}
                    onBlur={() => onBlur("zip")}
                    placeholder="5-6 digits (e.g. 560001)"
                />
                {errors.zip && (
                    <span className="text-xs text-red-600 leading-tight">
                        {errors.zip}
                    </span>
                )}
            </div>

            {/* Save as default address checkbox */}
            {isEditing && (
                <div className="col-span-2 max-[768px]:col-span-1 flex items-center gap-2 mt-1">
                    <input
                        id="isDefault"
                        type="checkbox"
                        checked={!!formData.isDefault}
                        disabled={isSubmitting}
                        onChange={(e) => onChange("isDefault", e.target.checked)}
                        className="w-4 h-4 text-orange border-border-input rounded-xs cursor-pointer focus:ring-orange"
                    />
                    <label htmlFor="isDefault" className="text-xs text-charcoal cursor-pointer select-none">
                        Save this as my default shipping address
                    </label>
                </div>
            )}

            {/* Action Buttons when editing */}
            {isEditing && (
                <div className="col-span-2 max-[768px]:col-span-1 flex items-center gap-3 pt-2">
                    <Button
                        type="button"
                        variant="primary"
                        onClick={onSaveAddress}
                        disabled={isSavingAddress || isSubmitting}
                        className="h-8.5 px-4 text-xs font-bold uppercase tracking-wider"
                    >
                        {isSavingAddress ? "Saving Address..." : "Save Address"}
                    </Button>
                    <Button
                        type="button"
                        variant="generic"
                        onClick={onCancelEdit}
                        disabled={isSavingAddress || isSubmitting}
                        className="h-8.5 px-4 bg-gray-200 text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gray-300"
                    >
                        Cancel
                    </Button>
                </div>
            )}

            {/* Decision C: Dedicated Geo API Error Display Below Form Action Buttons */}
            {(countriesError || statesError || citiesError) && (
                <div className="col-span-2 max-[768px]:col-span-1 p-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs mt-1 rounded-xs flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{countriesError || statesError || citiesError}</span>
                </div>
            )}
        </div>
    );
}

export default ShippingFormFields;
