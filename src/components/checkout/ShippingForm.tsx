"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import toast from "react-hot-toast";
import { addressApiService } from "@/services/addressApiService";
import { getStatesAction, getCitiesAction } from "@/app/actions/geoActions";
import { validateField, validateShippingForm } from "@/lib/validations/shippingSchema";
import { buildAddressPayload, saveAddress, SHIPPING_METHODS } from "@/utils/shippingHelpers";
import SavedAddressList from "./SavedAddressList";
import ShippingFormFields from "./ShippingFormFields";
import ShippingMethodSelector from "./ShippingMethodSelector";
import type { Address } from "@/types/address";
import type { Country, GeoState } from "@/types/geoData";
import type {
    ShippingFormData,
    ShippingFormErrors,
    ShippingField,
    ShippingMethod,
} from "@/types/shipping";

export interface ShippingFormProps {
    initialValues: ShippingFormData;
    initialAddressId?: number | null;
    savedAddresses?: Address[];
    initialCountries?: Country[];
    accessToken?: string;
    onValidityChange: (isValid: boolean) => void;
    onShippingCostChange?: (cost: number) => void;
    onSubmitSuccess?: (data: ShippingFormData, addressId: number | null) => void;
    isSubmitting?: boolean;
}

export function ShippingForm({
    initialValues,
    initialAddressId = null,
    savedAddresses: initialSavedAddresses = [],
    initialCountries = [],
    accessToken,
    onValidityChange,
    onShippingCostChange,
    onSubmitSuccess,
    isSubmitting = false,
}: ShippingFormProps) {
    const [savedAddresses, setSavedAddresses] = useState<Address[]>(initialSavedAddresses);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(initialAddressId);
    const [formData, setFormData] = useState<ShippingFormData>(initialValues);
    const [errors, setErrors] = useState<ShippingFormErrors>({});

    // Decision D: If user arrives with 0 saved addresses, auto-enable editing immediately
    const [isEditing, setIsEditing] = useState<boolean>(
        initialSavedAddresses.length === 0 || initialAddressId === null
    );
    const [isSavingAddress, setIsSavingAddress] = useState<boolean>(false);
    const [, startTransition] = useTransition();

    // Unified geographic state matching user specification
    const [geo, setGeo] = useState<GeoState>({
        countries: initialCountries,
        states: [],
        cities: [],
        loading: { countries: false, states: false, cities: false },
        errors: { countries: "", states: "", cities: "" },
    });

    // Sync shipping cost when method changes
    useEffect(() => {
        const selected = SHIPPING_METHODS.find((m) => m.id === formData.shippingMethod);
        const cost = selected ? selected.price : 100.0;
        onShippingCostChange?.(cost);
    }, [formData.shippingMethod, onShippingCostChange]);

    // Check validity: when using a saved address and not editing, the address is already valid!
    useEffect(() => {
        if (!isEditing && selectedAddressId !== null) {
            onValidityChange(true);
            return;
        }

        const validationErrors = validateShippingForm(formData);
        const isValid = Object.keys(validationErrors).length === 0;
        onValidityChange(isValid);
    }, [formData, isEditing, selectedAddressId, onValidityChange]);

    // Handle field change
    const handleFieldChange = useCallback(
        (field: ShippingField, value: string | boolean) => {
            setFormData((prev) => ({ ...prev, [field]: value }));

            // If error was active, validate and clear if resolved
            if (errors[field]) {
                const err = validateField(field, value);
                setErrors((prev) => ({ ...prev, [field]: err }));
            }
        },
        [errors]
    );

    // Handle field blur (instant inline Zod feedback)
    const handleFieldBlur = useCallback(
        (field: ShippingField) => {
            const err = validateField(field, formData[field]);
            setErrors((prev) => ({ ...prev, [field]: err }));
        },
        [formData]
    );

    // Dynamic country change: resets state and city, fetches states via Server Action
    const handleCountryChange = useCallback((country: string) => {
        setFormData((prev) => ({ ...prev, country, state: "", city: "" }));
        setGeo((prev) => ({
            ...prev,
            states: [],
            cities: [],
            loading: { ...prev.loading, states: Boolean(country) },
            errors: { ...prev.errors, states: "", cities: "" },
        }));

        if (!country) return;

        getStatesAction(country)
            .then((res) => {
                setGeo((prev) => ({
                    ...prev,
                    states: res,
                    loading: { ...prev.loading, states: false },
                }));
            })
            .catch(() => {
                setGeo((prev) => ({
                    ...prev,
                    loading: { ...prev.loading, states: false },
                    errors: { ...prev.errors, states: "Failed to fetch states for selected country." },
                }));
            });
    }, []);

    // Dynamic state change: resets city, fetches cities via Server Action
    const handleStateChange = useCallback(
        (state: string) => {
            setFormData((prev) => ({ ...prev, state, city: "" }));
            setGeo((prev) => ({
                ...prev,
                cities: [],
                loading: { ...prev.loading, cities: Boolean(state && formData.country) },
                errors: { ...prev.errors, cities: "" },
            }));

            if (!formData.country || !state) return;

            getCitiesAction(formData.country, state)
                .then((res) => {
                    setGeo((prev) => ({
                        ...prev,
                        cities: res,
                        loading: { ...prev.loading, cities: false },
                    }));
                })
                .catch(() => {
                    setGeo((prev) => ({
                        ...prev,
                        loading: { ...prev.loading, cities: false },
                        errors: { ...prev.errors, cities: "Failed to fetch cities for selected state." },
                    }));
                });
        },
        [formData.country]
    );

    // Populate form with a selected address
    const populateFormWithAddress = useCallback((addr: Address) => {
        setSelectedAddressId(addr.addressId || null);
        setFormData((prev) => ({
            ...prev,
            streetAddress: addr.addressLine1 || "",
            aptSuite: addr.addressLine2 || "",
            city: addr.city || "",
            state: addr.state || "",
            zip: addr.postalCode || "",
            country: addr.country || "",
            isDefault: !!addr.isDefault,
        }));
        setErrors({});
        setIsEditing(false);
    }, []);

    // Handle editing an existing address: populates form, activates edit mode, and preloads states & cities in parallel
    const handleEditCardAddress = useCallback(
        async (addr: Address) => {
            populateFormWithAddress(addr);
            setIsEditing(true);

            if (!addr.country) {
                setGeo((prev) => ({
                    ...prev,
                    states: [],
                    cities: [],
                    errors: { ...prev.errors, states: "", cities: "" },
                }));
                return;
            }

            setGeo((prev) => ({
                ...prev,
                loading: {
                    ...prev.loading,
                    states: true,
                    cities: Boolean(addr.state),
                },
                errors: { ...prev.errors, states: "", cities: "" },
            }));

            try {
                const statesPromise = getStatesAction(addr.country);
                const citiesPromise = addr.state
                    ? getCitiesAction(addr.country, addr.state)
                    : Promise.resolve([]);

                const [fetchedStates, fetchedCities] = await Promise.all([
                    statesPromise,
                    citiesPromise,
                ]);

                setGeo((prev) => ({
                    ...prev,
                    states: fetchedStates,
                    cities: fetchedCities,
                    loading: { ...prev.loading, states: false, cities: false },
                }));
            } catch {
                setGeo((prev) => ({
                    ...prev,
                    loading: { ...prev.loading, states: false, cities: false },
                    errors: { ...prev.errors, states: "Failed to fetch geographic options." },
                }));
            }
        },
        [populateFormWithAddress]
    );

    // Decision D: Click "+ Add New Address"
    const handleAddNewAddress = useCallback(() => {
        setSelectedAddressId(null);
        setIsEditing(true);
        setFormData((prev) => ({
            ...prev,
            streetAddress: "",
            aptSuite: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            isDefault: false,
        }));
        setGeo((prev) => ({
            ...prev,
            states: [],
            cities: [],
            loading: { ...prev.loading, states: false, cities: false },
            errors: { ...prev.errors, states: "", cities: "" },
        }));
        setErrors({});
    }, []);

    // Decision D: Click "Cancel" edit
    const handleCancelEdit = useCallback(() => {
        if (selectedAddressId !== null) {
            const existing = savedAddresses.find((a) => a.addressId === selectedAddressId);
            if (existing) {
                populateFormWithAddress(existing);
                return;
            }
        }

        if (savedAddresses.length > 0) {
            const fallback = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];
            populateFormWithAddress(fallback);
        } else {
            setIsEditing(true);
        }
    }, [selectedAddressId, savedAddresses, populateFormWithAddress]);

    // Save Address action
    const handleSaveAddress = () => {
        const validationErrors = validateShippingForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Please fill in all required shipping address fields.");
            return;
        }

        setIsSavingAddress(true);
        startTransition(async () => {
            try {
                const payload = buildAddressPayload(formData);
                if (!accessToken) {
                    setIsEditing(false);
                    toast.success("Shipping address configured!");
                    setIsSavingAddress(false);
                    return;
                }

                const res = await saveAddress(selectedAddressId, payload, accessToken);
                if (res.success) {
                    setSelectedAddressId(res.addressId);
                    setIsEditing(false);
                    toast.success("Address saved successfully!");

                    // Refresh saved address list
                    const freshList = await addressApiService.getAddresses(accessToken);
                    if (freshList.success && freshList.data) {
                        setSavedAddresses(freshList.data);
                    }
                } else {
                    toast.error(res.error || "Failed to save address.");
                }
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Failed to save address.");
            } finally {
                setIsSavingAddress(false);
            }
        });
    };

    // Form submission triggered by Order Summary or explicit submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isSavedAddressSelected = !isEditing && selectedAddressId !== null;

        if (!isSavedAddressSelected) {
            const validationErrors = validateShippingForm(formData);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                toast.error("Please correct the errors in the shipping form.");
                return;
            }
        }

        onSubmitSuccess?.(formData, selectedAddressId);
    };

    const activeGeoError = geo.errors.countries || geo.errors.states || geo.errors.cities;

    return (
        <section className="w-full border border-border bg-white">
            {/* Unified Top Banner */}
            <div className="flex items-center justify-between py-2.75 px-4.5 bg-dark text-white">
                <h2 className="m-0 font-display text-sm font-bold tracking-wider leading-tight uppercase">
                    SHIPPING INFORMATION
                </h2>
                {isEditing && (
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-orange text-white rounded-xs">
                        Editing Mode
                    </span>
                )}
            </div>

            {activeGeoError && (
                <div className="mx-4.5 mt-3 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs">
                    {activeGeoError}
                </div>
            )}

            <form id="checkout-form-rhf" onSubmit={handleSubmit} noValidate>
                {/* ─── Address Form Grid ─── */}
                <ShippingFormFields
                    formData={formData}
                    errors={errors}
                    isEditing={isEditing}
                    isSavingAddress={isSavingAddress}
                    isSubmitting={isSubmitting}
                    countries={geo.countries}
                    states={geo.states}
                    cities={geo.cities}
                    countriesLoading={geo.loading.countries}
                    statesLoading={geo.loading.states}
                    citiesLoading={geo.loading.cities}
                    countriesError={geo.errors.countries}
                    statesError={geo.errors.states}
                    citiesError={geo.errors.cities}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    onCountryChange={handleCountryChange}
                    onStateChange={handleStateChange}
                    onSaveAddress={handleSaveAddress}
                    onCancelEdit={handleCancelEdit}
                />

                {/* Subtle Divider */}
                <hr className="mx-4.5 my-3.5 border-0 border-t border-border" />

                {/* ─── Shipping Method Selection ─── */}
                <ShippingMethodSelector
                    selectedMethod={formData.shippingMethod}
                    onChange={(method: ShippingMethod) => handleFieldChange("shippingMethod", method)}
                    errorMessage={errors.shippingMethod}
                    disabled={isSubmitting}
                />

                {/* ─── Saved Addresses Responsive Card Grid ─── */}
                {savedAddresses.length > 0 && (
                    <SavedAddressList
                        savedAddresses={savedAddresses}
                        selectedAddressId={selectedAddressId}
                        isLoadingAddresses={false}
                        onSelectAddress={populateFormWithAddress}
                        onEditAddress={handleEditCardAddress}
                        onAddNewAddress={handleAddNewAddress}
                    />
                )}
            </form>
        </section>
    );
}

export default ShippingForm;
