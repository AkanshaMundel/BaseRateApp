enum RoleIndex{
    CUSTOMER = "CUSTOMER",
	ADMIN = "ADMIN",
	PURCHASER = "PURCHASER",
	SALES = "SALES",
	UNKNOWN = "UNKNOWN",
}
export default RoleIndex;
export type Roles=keyof typeof RoleIndex