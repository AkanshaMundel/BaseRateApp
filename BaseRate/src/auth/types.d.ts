namespace Auth {
    enum RoleIndex {
        CUSTOMER = "CUSTOMER",
        ADMIN = "ADMIN",
        PURCHASER = "PURCHASER",
        SALES = "SALES",
        UNKNOWN = "UNKNOWN",
    }
    interface LoginData {
        token: string;

        loginData: {
            success: boolean;
            userId: string;
            createdAt: number;
            maxAge: number;
            role: RoleIndex;
            name: string;
            email: string;
            phoneNumber: string;
            image: string;
        };
    }
}
