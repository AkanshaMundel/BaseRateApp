import { ServerSateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import fetchSearchData from "../../fetch/service/FetchSearchBar";
import TableView from "@src/screens/Body/TableviewCard";

export default class FetchSearchBarAction extends ServerSateUtils<SearchBar.State>{
    async fetchSearchData(query: string) {
        console.log(query);
        
        console.log("Querying Data",query);
        const res = await this.handleAsync("fetchSearchData", () => fetchSearchData(query))
        if (res) {
            const data = res.data
            console.log("I am Data",data)
            this.mutateState((p) => {
                p.searchedData = data
            })
        }
    }
}