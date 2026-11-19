import HeaderClient from "./HeaderClient";

export interface HeaderProps {
    searchTerm?: string;
    onSearchChange?: (value: string) => void;
}

export default function Header(props: HeaderProps = {}) {
    return (
        <HeaderClient
            searchTerm={props.searchTerm}
            onSearchChange={props.onSearchChange}
        />
    );
}
