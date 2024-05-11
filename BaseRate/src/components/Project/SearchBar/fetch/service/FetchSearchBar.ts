import { api } from "../api";
import { SearchBarInstance } from "../instance";

interface SearchBarData {
    item: SearchAssists[]
}

interface SearchAssists {
    companyId: string;
    name: string;
    type: 'company';
}

export default async function fetchSearchData(query: string) {
    console.log(query);
    return await SearchBarInstance.get<SearchBarData>(api.searchBarData(query));
}