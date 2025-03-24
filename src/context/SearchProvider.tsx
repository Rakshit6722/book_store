import { createContext, useState } from "react";

export const SearchContext = createContext({})

type searchContextProps = {
    children: React.ReactNode
}

const SearchProvider = ({children}:searchContextProps) => {

    const [searchQuery, setSearchQuery] = useState("")

    const value = {
        searchQuery,
        setSearchQuery
    }

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchProvider

