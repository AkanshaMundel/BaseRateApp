namespace SearchBar {

    interface SearchBarData {
        data: SearchAssists[];
    }

    interface SearchAssists {
        _id: string;
        name: string;
        type: 'company';
    }

    interface State {
        searchedData: any,
        loading: { [key: string]: AsyncState }
    }
}