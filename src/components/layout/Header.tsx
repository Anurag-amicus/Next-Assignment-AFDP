import { getSession } from "@/lib/session";
import { getCartCountAction } from "@/app/actions/cartActions";
import HeaderClient from "./HeaderClient";

export interface HeaderProps {
    searchTerm?: string;
    onSearchChange?: (value: string) => void;
}

export default async function Header(props: HeaderProps = {}) {
    const session = await getSession();
    const cartCount = await getCartCountAction();

    return (
        <HeaderClient
            initialUser={session.user}
            initialCartCount={cartCount}
            searchTerm={props.searchTerm}
            onSearchChange={props.onSearchChange}
        />
    );
}
