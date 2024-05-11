namespace Login {
    type Tabs = 'login'
    interface State {
        selectedTab: Tabs;
        email: FieldDataClass;
        password: FieldDataClass;
        showPassword: boolean;
        loading: Record<string, AsyncState>
    }
}