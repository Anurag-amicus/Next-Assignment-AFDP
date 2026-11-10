import { getSession } from "@/lib/session";
import { getCartCountAction } from "@/app/actions/cartActions";
import HeaderClient from "./HeaderClient";
import { defaultUser } from "@/types/auth";
import type { User } from "@/types/auth";

export interface HeaderProps {
    searchTerm?: string;
    onSearchChange?: (value: string) => void;
}

export default async function Header(props: HeaderProps = {}) {
    const session = await getSession();
    let User: User | null =  null;
    if(session.accessToken){
    User = defaultUser;
    }
    const cartCount = await getCartCountAction();

    return (
        <HeaderClient
            initialUser={User}
            initialCartCount={cartCount}
            searchTerm={props.searchTerm}
            onSearchChange={props.onSearchChange}
        />
    );
}
